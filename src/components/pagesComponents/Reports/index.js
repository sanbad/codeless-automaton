import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ReportSection,MainContainer,TableCardLayout,LoaderLayout,
    TableCard,SearchLayout,CustomContainerEmptyLayout,
    StatusSpan,ExecIdInput,ClearSearchText,
    EmptyCard,CustomText, StatusSpanRunning} from './reports.style';
import {CustomContainer,CardHeadingLayout,FieldSet,
    CardHeading,Table,    TableAnchor,ArrowUpIcon,ArrowDownIcon,
    FlexLayout,CustomRow,CustomCol,ErrorSpan, PageCountSpan, FlexLayoutCenterJustified} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import {getUTCDateTimeFromLocal,getLocalStorageVariables,isEmptyVariable,sortTable,getLocalDateFromUTC, ifEmptyReturnStr} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {InfoCircle} from '@styled-icons/fa-solid/InfoCircle';
import {File} from '@styled-icons/boxicons-regular/File';
import {StopCircle} from '@styled-icons/boxicons-regular/StopCircle';
import {BarChartSquare} from '@styled-icons/boxicons-solid/BarChartSquare';
import {Modal,Button} from 'react-bootstrap';
import {Refresh} from '@styled-icons/boxicons-regular/Refresh';
import Pagination from '../../commonComponents/pagination';
import DropDownRegular from '../../commonComponents/DropDownRegularV2';
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import {Delete} from '@styled-icons/material/Delete';
import AlertDialog from '../../commonComponents/AlertDialog';
import LiveLogsBrowserListDialog from './liveLogsBrowserList';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SpinnerLoader from 'react-loader-spinner';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

const userDetails  = getLocalStorageVariables();
const sortId  = "executionNumber";
const sortDate = "executionDate";
const sortUser = "firstName";
const sortDuration = "duration";
const sortPassed = "passedScenariosCount";
const sortFailed = "failedScenariosCount";
const sortResult = "executionResult";
const sortStatus= "execution_status";

const actionInitiatedArr = [
    {
        label:"Live Logs",
        onClick:"",
        icon:<File/>
    },
    {
        label:"Abort",
        onClick:"",
        icon:<StopCircle/>
    }
];

const actionCompletedArr = [
    {
        label:"Details",
        onClick:"",
        icon:<InfoCircle/>
    },
    {
        label:"Delete",
        onClick:"",
        icon:<Delete/>
    },
    {
        label:"Live Logs",
        onClick:"",
        icon:<File/>
    },
];
const actionFailedArr = [
    {
        label:"Delete",
        onClick:"",
        icon:<Delete/>
    }
];
const actionAbortedArr = [
    {
        label:"Delete",
        onClick:"",
        icon:<Delete/>
    }
];

class Reports extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            projectId:this.props.match.params.id,
            projectDetails:{},
            showLoader:false,
            reportList:"",
            totalCount:0,
            projectUsers:"",
            componentDidMountFlag:false,
            apiSearchKey1:"",
            apiSearchKey2:"",
            apiSearchKey3:"",
            apiSearchKey4:"",
            apiSearchKey5:"",
            searchFilterErrorMsg:"",
            searchFilterExecutionNumber:"",
            searchFilterFromDate:"",
            searchFilterToDate:"",
            searchFilterStatus:"",
            searchFilterInitiatedBy:"",
            statusPlaceHolder:Constants.REPORTS_STATUS_ALL,
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            sort: "",
			sortDir: "",

            statusArray:[
                {
                    "label":Constants.REPORTS_STATUS_ALL
                },{
                    "label":Constants.REPORTS_STATUS_INITIATED
                },
                {
                    "label":Constants.REPORTS_STATUS_COMPLETED
                },
                // {
                //     "label":Constants.REPORTS_STATUS_STOPPED
                // },
                {
                    "label":Constants.REPORTS_STATUS_FAILED
                },
                {
                    "label":Constants.REPORTS_STATUS_ABORTED
                }
            ],
            initiatedPlaceHolder:"Initiated By",

            executionMasterId:"",
            showAlertDialog:false,
            alertDialogMessage:"",

            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",

            showBrowserDialog:false,
            browserArr:[],

            autoRefreshFlag:false,
        }
    }

    componentDidMount(){
        this.setState({
            showLoader:true,
        });
        this.initData();
    }

    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});

    handleSearchFromDate = (e) => {
        this.setState({ searchFilterFromDate: e,currentPageNo:1 },()=>{
            this.getReportList();
        });
    }

    handleSearchToDate = (e) => {
        this.setState({ searchFilterToDate: e ,currentPageNo:1 },()=>{
            this.getReportList();
        });
    }

    handleSearchFilter = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    statusDropDownClick = (item,id,e) =>{
        // alert(item.label);
        let searchFilterStatus = item.label;
        if(item.label === Constants.REPORTS_STATUS_ALL){
            searchFilterStatus="";
        }
        this.setState(
            {
                searchFilterStatus:searchFilterStatus,
                statusPlaceHolder:item.label,
                currentPageNo:1 
            },()=>{
                    this.getReportList();
            });
    }

    initiatedDropDownClick = (item,id,e) =>{
        // alert(item.userId);
        this.setState(
            {
                searchFilterInitiatedBy:item.userId,
                initiatedPlaceHolder:item.label,
                currentPageNo:1 
            },()=>{
                    this.getReportList();
            });
    }

    handleSearch = () =>{
        if(
                isEmptyVariable(this.state.searchFilterExecutionNumber) &&
                isEmptyVariable(this.state.searchFilterFromDate) &&
                isEmptyVariable(this.state.searchFilterToDate) &&
                isEmptyVariable(this.state.searchFilterStatus) &&
                isEmptyVariable(this.state.searchFilterInitiatedBy)
            )
            {
                this.setState({searchFilterErrorMsg:Constants.REPORTS_SEARCH_FILTER_MSG},()=>{
                    setTimeout(function(){
                        this.setState({searchFilterErrorMsg:""});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                });
            }
            else
            {
                this.setState({currentPageNo:1,searchFilterErrorMsg:""},()=>{
                    this.getReportList();
                });
            }
    }

    onEnterBtnPress = (e) => {
        let code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.searchFilterExecutionNumber)){
                this.setState({currentPageNo:1},()=>{
                    this.getReportList();
                });
            }else{
                this.setState({
                    searchFilterErrorMsg:Constants.REPORTS_SEARCH_EXECUTION_MSG
                },()=>{
                    setTimeout(function(){
                        this.setState({searchFilterErrorMsg:""});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                });
            }
        }

    }

    handleSearchReset = (e) =>{
        this.setState({
            currentPageNo:1,
            searchFilterExecutionNumber:"",
            searchFilterFromDate:"",
            searchFilterToDate:"",
            searchFilterStatus:"",
            searchFilterInitiatedBy:"",
            statusPlaceHolder:Constants.REPORTS_STATUS_ALL,
            initiatedPlaceHolder:"Initiated By",
            searchFilterErrorMsg:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,

        },()=>{
            this.getReportList();
        });
    }

    sortTableLocal = (sortColumn) => {
        let sortObj = sortTable(sortColumn, this.state.sort, this.state.sortDir);

        this.setState(
            {
                sort: sortObj.sortTemp,
                sortDir: sortObj.sortDirTemp,
            },
            () => {
                this.getReportList();
            }
        );
    };

    resultSizeDropdownClick = (item, selectedIndex) => {
		this.setState(
			{
                currentPageNo:1,
				resultSize: item.label,
				resultSizePlaceholder: item.label,
			},
			() => {
				this.getReportList();
			}
		);
	};

    formatDate(date) { 
        if(date!=="")
        {
            let date_new =  new Date(date);
            var day = date_new.getDate(); 
            if (day < 10) { 
                day = "0" + day; 
            } 
            var month = date_new.getMonth() + 1; 
            if (month < 10) { 
                month = "0" + month; 
            } 
            var year = date_new.getFullYear(); 
            return day + "-" + month + "-" + year; 
        }
        else
        return "";
    } 

    onClickActionItem = (label,item) =>{
        if(label === "Details"){
            window.location=Constants.REPORT_DETAILS_PATH+"/"+item.executionMasterId
        }else if(label === "Delete"){
            this.openDeleteDialog(item.executionMasterId);
        }else if(label === "Live Logs"){
            this.openLiveLogs(item);
        }
    }

    openLiveLogs = (item) => {
        let browserArr = [];
        try{
            browserArr = JSON.parse(item.masterBrowserIds)
        }catch(e){
            browserArr = [];
        }

        if(browserArr.length === 0){
            //show error alert
        }else if(browserArr.length === 1){
            //show new tab with live logs
            const win = window.open("/projects/livelogs/"+item.executionMasterId+"-"+browserArr[0].masterBrowserId, '_blank');
            if (win != null) {
                win.focus();
            }
        }else{
            this.handleLiveLogsBrowserDialogOpen(browserArr,item.executionMasterId);
        }
    }

    handleLiveLogsBrowserDialogOpen = (browserArr,executionMasterId) => {
        this.setState({
            executionMasterId:executionMasterId,
            browserArr:browserArr,
            showBrowserDialog:true
        })
    }

    handleLiveLogsBrowserDialogClose = () => {
        this.setState({
            executionMasterId:"",
            browserArr:[],
            showBrowserDialog:false
        })
    }

    openDeleteDialog =(executionMasterId)=>{
        this.setState(
        {
            executionMasterId:executionMasterId,
            showAlertDialog:true,
            alertDialogMessage:Constants.REPORTS_DELETE_WARNING
        });
    }

    handleAlertDialogClose = () =>{
        this.setState(
        {
            executionMasterId:"",
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }

    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    /***********************API CALLS************************/
    initData = () => {
        Promise.all([fetch(Constants.ReportList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    pageNo:this.state.currentPageNo,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
                    sortDir: this.state.sortDir,

                    executionNo:this.state.searchFilterExecutionNumber,
                    status:this.state.searchFilterStatus,
                    initiatedBy:this.state.searchFilterInitiatedBy,
                    searchFilterFromDate:getUTCDateTimeFromLocal(this.state.searchFilterFromDate),
                    searchFilterToDate:getUTCDateTimeFromLocal(this.state.searchFilterToDate,true),
                })
            }),
    
            fetch(Constants.ListProjectUsers,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    resultsize:100,
                })
            })
        ])
    
        .then(([res1,res2]) => { 
            return Promise.all([res1.json(),res2.json()]) 
        })
        .then(([res1,res2]) => {
    
            let initiatedArray = [];
            let reportList = [];

            if(!isEmptyVariable(res2.data.result) && res2.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                res2.data.result.forEach(function(cust) {
                    let obj = {
                        "label":cust.firstName+"("+cust.email+")",
                        "userId":cust.userId
                    };
                    initiatedArray.push(obj);
                });
            }
            
            if(res1.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else if(res1.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                let refreshFlag=false;
                reportList = res1.data.result;
                
                //Set flag true if any status is INITIATED
                refreshFlag= reportList.some((item) => item.execution_status===Constants.REPORTS_STATUS_INITIATED);
                
                this.setState({
                    totalCount:res1.data.count,
                    reportList:reportList,
                    projectUsers:initiatedArray,
                    showLoader:false,
                    componentDidMountFlag:true,
                    projectDetails:res1.data.projectDetails,
                    apiSearchKey1:this.state.searchFilterExecutionNumber,
                    apiSearchKey2:this.state.searchFilterFromDate,
                    apiSearchKey3:this.state.searchFilterToDate,
                    apiSearchKey4:this.state.searchFilterStatus,
                    apiSearchKey5:this.state.searchFilterInitiatedBy,

                    refreshFlag:refreshFlag,
                },()=>{
                    if(refreshFlag){
                        setTimeout(() => {
                            this.getReportList();
                        },Constants.REFRESH_REPORT_TIMEOUT);
                    }
                })
            }else{
                this.setState({
                    totalCount:0,
                    reportList:"",
                    projectUsers:[],
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey1:this.state.searchFilterExecutionNumber,
                    apiSearchKey2:this.state.searchFilterFromDate,
                    apiSearchKey3:this.state.searchFilterToDate,
                    apiSearchKey4:this.state.searchFilterStatus,
                    apiSearchKey5:this.state.searchFilterInitiatedBy,
                })
            }
        });
    }

    onChangePage = (page) => {
        // update state with new page of items
        if(page != this.state.currentPageNo){
            this.setState({
                showLoader:true,
            });
            fetch(Constants.ReportList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    pageNo:page,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
                    sortDir: this.state.sortDir,

                    executionNo:this.state.searchFilterExecutionNumber,
                    status:this.state.searchFilterStatus,
                    initiatedBy:this.state.searchFilterInitiatedBy,
                    searchFilterFromDate:getUTCDateTimeFromLocal(this.state.searchFilterFromDate),
                    searchFilterToDate:getUTCDateTimeFromLocal(this.state.searchFilterToDate,true),
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
                {
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }
                else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
                {
                    this.setState({
                        showLoader:false,
                        currentPageNo:page,
                        reportList:data.data.result,
                        totalCount:data.data.count,
                        apiSearchKey1:this.state.searchFilterExecutionNumber,
                        apiSearchKey2:this.state.searchFilterFromDate,
                        apiSearchKey3:this.state.searchFilterToDate,
                        apiSearchKey4:this.state.searchFilterStatus,
                        apiSearchKey5:this.state.searchFilterInitiatedBy,
                    });
                }else
                {
                    this.setState({
                        showLoader:false,
                        reportList:"",
                        totalCount:0,
                        apiSearchKey1:this.state.searchFilterExecutionNumber,
                        apiSearchKey2:this.state.searchFilterFromDate,
                        apiSearchKey3:this.state.searchFilterToDate,
                        apiSearchKey4:this.state.searchFilterStatus,
                        apiSearchKey5:this.state.searchFilterInitiatedBy,
                    });
                }
            });
        }
    }

    getReportList(){
        this.setState({
            showLoader:true,
        });
        
        fetch(Constants.ReportList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    executionNo:this.state.searchFilterExecutionNumber,
                    status:this.state.searchFilterStatus,
                    initiatedBy:this.state.searchFilterInitiatedBy,
                    searchFilterFromDate:getUTCDateTimeFromLocal(this.state.searchFilterFromDate),
                    searchFilterToDate:getUTCDateTimeFromLocal(this.state.searchFilterToDate,true),
                    pageNo:this.state.currentPageNo,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
                    sortDir: this.state.sortDir,
                })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                let reportList=[];
                let refreshFlag=this.state.refreshFlag;
                reportList = data.data.result;
                
                //Set flag true if any status is INITIATED
                refreshFlag= reportList.some((item) => item.execution_status===Constants.REPORTS_STATUS_INITIATED);
                
                this.setState({
                    showLoader:false,
                    reportList:data.data.result,
                    totalCount:data.data.count,
                    apiSearchKey1:this.state.searchFilterExecutionNumber,
                    apiSearchKey2:this.state.searchFilterFromDate,
                    apiSearchKey3:this.state.searchFilterToDate,
                    apiSearchKey4:this.state.searchFilterStatus,
                    apiSearchKey5:this.state.searchFilterInitiatedBy,

                    refreshFlag:refreshFlag,
                },()=>{
                    if(refreshFlag){
                        setTimeout(() => {
                            this.getReportList();
                        },Constants.REFRESH_REPORT_TIMEOUT);
                    }
                });
            }
            else
            {
                this.setState({
                    showLoader:false,
                    reportList:"",
                    totalCount:0,
                    apiSearchKey1:this.state.searchFilterExecutionNumber,
                    apiSearchKey2:this.state.searchFilterFromDate,
                    apiSearchKey3:this.state.searchFilterToDate,
                    apiSearchKey4:this.state.searchFilterStatus,
                    apiSearchKey5:this.state.searchFilterInitiatedBy,
                });
            }
            
        });
    }

    deleteReport = () =>{
        let url = Constants.DeleteReport;

        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    executionMasterId:this.state.executionMasterId
                })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            } else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    executionMasterId:"",
                    showAlertDialog:false,
                    alertDialogMessage:""
                },()=>{
                    this.getReportList();
                });
            }else
            {
                this.setState(
                {
                    executionMasterId:"",
                    showAlertDialog:false,
                    alertDialogMessage:"",
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage
                });
            }
        });
    }


    render(){
        const actionArr = [
            {
                label:"Details",
                onClick:"",
                icon:<InfoCircle/>
            },
            {
                label:"Delete",
                onClick:"",
                icon:<Delete/>
            }
        ];

        let start = this.state.resultSize*(this.state.currentPageNo - 1);

        let end = this.state.resultSize+start;

        if(end > this.state.totalCount){
            end = this.state.totalCount;
        }

        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <ReportSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                showLeftMenu={true}
                                title={this.state.projectDetails.title}
                                projectNo = {this.state.projectId}
                                projectDetails={this.state.projectDetails}
                            />
                            {
                                this.state.showLoader &&
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }
                            {
                                // Need to check component did mount flag, other wise until api is called,
                                // it shows no items found flag
                                this.state.componentDidMountFlag &&
                                !(isEmptyVariable(this.state.reportList) &&
                                (
                                    isEmptyVariable(this.state.apiSearchKey1) &&
                                    isEmptyVariable(this.state.apiSearchKey2) &&
                                    isEmptyVariable(this.state.apiSearchKey3) &&
                                    isEmptyVariable(this.state.apiSearchKey4) &&
                                    isEmptyVariable(this.state.apiSearchKey5)
                                )) &&
                                <CustomContainer>
                                    {
                                        // dont display when action and search key both are empty
                                        !(isEmptyVariable(this.state.reportList) &&
                                        (
                                            isEmptyVariable(this.state.apiSearchKey1) &&
                                            isEmptyVariable(this.state.apiSearchKey2) &&
                                            isEmptyVariable(this.state.apiSearchKey3) &&
                                            isEmptyVariable(this.state.apiSearchKey4) &&
                                            isEmptyVariable(this.state.apiSearchKey5)
                                        )) &&
                                        <SearchLayout>
                                            <FlexLayout>
                                                <FieldSet>
                                                    <ResultsizeDropDown
                                                        itemsArr={this.state.resultSizeArr}
                                                        placeholder={this.state.resultSizePlaceholder}
                                                        name={"label"}
                                                        onDropDownItemClick={this.resultSizeDropdownClick}
                                                        disableShadowAddBorder={true}
                                                    />
                                                </FieldSet>
                                                <CustomRow>
                                                    <CustomCol md={3}>
                                                        <FieldSet>
                                                            <ExecIdInput 
                                                                placeholder="Execution ID"
                                                                name="searchFilterExecutionNumber"
                                                                onChange={this.handleSearchFilter}
                                                                value={this.state.searchFilterExecutionNumber}
                                                                onKeyPress={this.onEnterBtnPress}
                                                            />
                                                        </FieldSet> 
                                                    </CustomCol>

                                                    <CustomCol md={3}>
                                                        <FieldSet>
                                                            <DatePicker
                                                                autoComplete={"off"}
                                                                name="searchFromDate"
                                                                selected={this.state.searchFilterFromDate}
                                                                onChange={this.handleSearchFromDate}
                                                                dateFormat="dd-MM-yyyy"
                                                                placeholderText="From Date"
                                                            />
                                                        </FieldSet>
                                                    </CustomCol>
                                                    <CustomCol md={3}>
                                                        <FieldSet>
                                                            <DatePicker
                                                                autoComplete={"off"}
                                                                name="searchToDate"
                                                                selected={this.state.searchFilterToDate}
                                                                onChange={this.handleSearchToDate}
                                                                dateFormat="dd-MM-yyyy"
                                                                placeholderText="To Date"
                                                            />
                                                        </FieldSet>
                                                    </CustomCol>
                                                    <CustomCol md={3}>
                                                        <FieldSet>
                                                            <DropDownRegular
                                                                placeholder={this.state.statusPlaceHolder}
                                                                itemsArr = {this.state.statusArray}
                                                                onDropDownItemClick = {this.statusDropDownClick}
                                                                name={"label"}
                                                            />
                                                        </FieldSet>
                                                    </CustomCol>
                                                </CustomRow>
                                            </FlexLayout>
                                            <CustomRow>
                                                <CustomCol md={4}>
                                                    <FieldSet>
                                                        <DropDownRegular
                                                            placeholder={this.state.initiatedPlaceHolder}
                                                            itemsArr = {this.state.projectUsers}
                                                            onDropDownItemClick = {this.initiatedDropDownClick}
                                                            name={"label"}
                                                        />
                                                    </FieldSet>
                                                </CustomCol>

                                                <CustomCol md={4}
                                                    style={{
                                                        display:"flex",
                                                        alignItems:"center"
                                                    }}
                                                >
                                                    <ClearSearchText onClick={this.handleSearchReset}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                                    {/* <SaveBtnSearch
                                                        as="button"
                                                        onClick = {this.handleSearch}
                                                    >Search</SaveBtnSearch> */}
                                                    <ErrorSpan>{this.state.searchFilterErrorMsg}</ErrorSpan>
                                                </CustomCol>
                                            </CustomRow>
                                        </SearchLayout>
                                    }
                                    {
                                        !isEmptyVariable(this.state.reportList) &&
                                        <TableCardLayout>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th width="5%">No</th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortId)}>
                                                            <div className="sort-header">
                                                                Execution ID
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortId ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th  width="18%" onClick={this.sortTableLocal.bind(this, sortDate)}>
                                                            <div className="sort-header">    
                                                                Date
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortDate ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        {/* <th onClick={this.sortTableLocal.bind(this, sortUser)}>
                                                            <div className="sort-header">
                                                                Initiated By
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortUser ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th> */}
                                                        <th  width="11%" onClick={this.sortTableLocal.bind(this, sortDuration)}>
                                                            <div className="sort-header">
                                                                Duration
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortDuration ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th  width="6%" onClick={this.sortTableLocal.bind(this, sortPassed)}>
                                                            <div className="sort-header">
                                                                Passed
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortPassed ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th  width="6%" onClick={this.sortTableLocal.bind(this, sortFailed)}>
                                                            <div className="sort-header">
                                                                Failed
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortFailed ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th  width="10%" onClick={this.sortTableLocal.bind(this, sortResult)}>
                                                            <div className="sort-header">
                                                                Result
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortResult ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width="11%" onClick={this.sortTableLocal.bind(this, sortStatus)}>
                                                            <div className="sort-header">
                                                                Status
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortStatus ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width="6%"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    !isEmptyVariable(this.state.reportList) &&
                                                    this.state.reportList.map((item,idx) => {
                                                        let actionArr =[];
                                                        if(item.execution_status === Constants.REPORTS_STATUS_INITIATED){
                                                            actionArr = actionInitiatedArr;
                                                        }
                                                        if(item.execution_status === Constants.REPORTS_STATUS_COMPLETED){
                                                            actionArr = actionCompletedArr;
                                                        }
                                                        if(item.execution_status === Constants.REPORTS_STATUS_FAILED){
                                                            actionArr = actionFailedArr;
                                                        }
                                                        if(item.execution_status === Constants.REPORTS_STATUS_ABORTED){
                                                            actionArr = actionAbortedArr;
                                                        }
                                                        return <tr>
                                                            {/* <td>{((this.state.currentPageNo - 1) * Constants.RESULT_SIZE_PAGINATION) + (++idx)}</td> */}
                                                            <td>{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                            <td>
                                                                <TableAnchor href={Constants.REPORT_DETAILS_PATH+"/"+item.executionMasterId}>{item.executionNumber}</TableAnchor>
                                                                <span style={{display:"block", fontSize:12}}>{item.firstName}</span>
                                                            </td>
                                                            <td>
                                                            {getLocalDateFromUTC(item.executionDate)}
                                                            </td>
                                                            {/* <td>
                                                            {item.firstName}
                                                            </td> */}
                                                            <td>{item.duration}</td>
                                                            <td>{item.passedScenariosCount}</td>
                                                            <td>{item.failedScenariosCount}</td>
                                                            <td>{ifEmptyReturnStr(item.executionResult,"-")}</td>
                                                            <td>
                                                                {
                                                                    item.execution_status === Constants.REPORTS_STATUS_COMPLETED &&
                                                                    <StatusSpan color="#4CAF50">{item.execution_status}</StatusSpan>
                                                                }
                                                                {
                                                                    item.execution_status === Constants.REPORTS_STATUS_FAILED &&
                                                                    <StatusSpan color="#FF0000">{item.execution_status}</StatusSpan>
                                                                }
                                                                {
                                                                    item.execution_status === Constants.REPORTS_STATUS_INITIATED &&
                                                                    <StatusSpanRunning color="#38b2fe"><Refresh /> RUNNING</StatusSpanRunning>
                                                                    // <StatusSpan color="#38b2fe">{item.execution_status}</StatusSpan>
                                                                }
                                                                {
                                                                    item.execution_status === Constants.REPORTS_STATUS_ABORTED &&
                                                                    <StatusSpan color="#FF0000">{item.execution_status}</StatusSpan>
                                                                }
                                                                {
                                                                    item.execution_status === Constants.REPORTS_STATUS_STOPPED &&
                                                                    <StatusSpan color="#FF0000">{item.execution_status}</StatusSpan>
                                                                }
                                                            </td>
                                                            <td><TableDropDown 
                                                                actionArr={actionArr}
                                                                onClickDropDownItem={this.onClickActionItem}
                                                                item={item}
                                                            /></td>
                                                        </tr>
                                                    })
                                                }
                                                </tbody>

                                            </Table>
                                        </TableCardLayout>
                                    }
                                    <FlexLayoutCenterJustified>
                                        {
                                            (this.state.totalCount > this.state.reportList.length) && 
                                            <Pagination 
                                                totalLength ={this.state.totalCount} 
                                                items={this.state.reportList} 
                                                onChangePage={this.onChangePage} 
                                                currentPageNo = {this.state.currentPageNo} 
                                                pageSize={this.state.resultSize}
                                                initialPage={this.state.currentPageNo}
                                                />
                                        }
                                        {
                                            this.state.totalCount <= this.state.reportList.length &&
                                            <div></div>
                                        }
                                        <PageCountSpan>
                                            {(start+1)+"-"+end+" of "+this.state.totalCount}
                                        </PageCountSpan>
                                    </FlexLayoutCenterJustified>

                                </CustomContainer>
                            }

                            {
                                this.state.componentDidMountFlag && isEmptyVariable(this.state.reportList) &&
                                <CustomContainerEmptyLayout
                                    paddingValue={(
                                        isEmptyVariable(this.state.apiSearchKey1) &&
                                        isEmptyVariable(this.state.apiSearchKey2) &&
                                        isEmptyVariable(this.state.apiSearchKey3) &&
                                        isEmptyVariable(this.state.apiSearchKey4) &&
                                        isEmptyVariable(this.state.apiSearchKey5)
                                    )?"25px":"0px 25px 25px"}
                                >
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    (
                                                        isEmptyVariable(this.state.apiSearchKey1) &&
                                                        isEmptyVariable(this.state.apiSearchKey2) &&
                                                        isEmptyVariable(this.state.apiSearchKey3) &&
                                                        isEmptyVariable(this.state.apiSearchKey4) &&
                                                        isEmptyVariable(this.state.apiSearchKey5)
                                                    )
                                                    ?
                                                    Constants.REPORTS_EMPTY_WARNING
                                                    :
                                                    Constants.REPORTS_EMPTY_SEARCH_WARNING
                                                }
                                                </CustomText>
                                            </CustomCol>
                                        </CustomRow>
                                    </EmptyCard>
                                </CustomContainerEmptyLayout>
                            }
                        </MainContainer>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type= {Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Report"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteReport}
                            proceedBtnLabel={ Constants.REPORTS_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                        <LiveLogsBrowserListDialog
                            showBrowserDialog = {this.state.showBrowserDialog}
                            handleLiveLogsBrowserDialogClose = {this.handleLiveLogsBrowserDialogClose}
                            browserArr = {this.state.browserArr}
                            executionMasterId = {this.state.executionMasterId}
                        />
                        
                    </ReportSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Reports;