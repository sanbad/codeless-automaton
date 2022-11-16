import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ScenarioSection,MainContainer,LoaderLayout,TableCardLayout,BootstrapModal,CancelBtnDialog,
    TableCard,SearchIcon,ClearSearchText,SearchLayout,SaveBtn,FieldSetRoundSearch,InputFieldRoundSearch,
    AddNewLayout,EmptyCard,EmptyCardAddNewLayout,CustomText,CustomContainerEmptyLayout
} from './testparams.style';
import {CustomContainer,CardHeadingLayout,ErrorSpan,
    CardHeading,Table,     FieldSet,InputFieldBorder,InputLabel,
    AddNewBtn,CustomRow,CustomCol,ArrowUpIcon,ArrowDownIcon, FlexLayoutCenterJustified, PageCountSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import {getLocalStorageVariables,isEmptyVariable,sortTable,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../../commonComponents/pagination';
import AlertDialog from '../../commonComponents/AlertDialog';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

import SpinnerLoader from 'react-loader-spinner';

const userDetails  = getLocalStorageVariables();

const sortName  = "testParamName";
const sortValue = "testParamValue";
const sortUseCount = "testParamUseCount";

class TestParams extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            projectId:this.props.match.params.id,
            projectDetails:{},
            showLoader:false,
            testParamsList:"",
            totalCount:0,
            projectName:"",
            searchTestParamNameKey:"",
            apiSearchKey:"",
            componentDidMountFlag:false,
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            sort: "",
			sortDir: "",

            showAddTestParamModal:false,

            errors:[],
            testParamName:'',
            testParamValue:'',

            isEdit:false,
            testParamId:"",

            showAlertDialog:false,
            alertDialogMessage:"",
            deleteTestParamId:"",
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
        }
    }

    componentDidMount(){
        this.getTestParamList();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.searchTestParamNameKey)){
                this.setState({currentPageNo:1},()=>{
                    this.getTestParamList();
                });
            }
        }
    }
    onEnterBtnPressSave = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            this.addTestParam(e);
        }
    }

    searchTestParamName = () => {
        if(!isEmptyVariable(this.state.searchTestParamNameKey)){
            this.setState({currentPageNo:1},()=>{
                this.getTestParamList();
            });
        }
    }

    resetFilters = () => {
        this.setState({
            currentPageNo: 1,
            searchTestParamNameKey:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
        },()=>{
            this.getTestParamList();
        })
    }

    resultSizeDropdownClick = (item, selectedIndex) => {
		this.setState(
			{
                currentPageNo:1,
				resultSize: item.label,
				resultSizePlaceholder: item.label,
			},
			() => {
				this.getTestParamList();
			}
		);
	};

    handleAddTestParamClose = () => this.setState({showAddTestParamModal:false});
    handleAddTestParamShow = () => this.setState(
        {
            showAddTestParamModal:true,
            testParamName:'',
            testParamValue:'', 
            errors:[],
            isEdit:false,
            testParamId:""
        });
    
    sortTableLocal = (sortColumn) => {
        let sortObj = sortTable(sortColumn, this.state.sort, this.state.sortDir);

        this.setState(
            {
                sort: sortObj.sortTemp,
                sortDir: sortObj.sortDirTemp,
            },
            () => {
                this.getTestParamList();
            }
        );
    };

    openEditDialog = (item) =>{
        this.setState(
        {
            showAddTestParamModal:true,
            testParamName:item.testParamName,
            testParamValue:item.testParamValue, 
            errors:[],
            isEdit:true,
            testParamId:item.testParamId
        });
    }

    onClickItem = (label,item) =>{
        if(label === "Edit"){
            this.openEditDialog(item);
        }
        else if(label === "Delete"){
            this.openDeleteDialog(item,label);
        }
    }

    openDeleteDialog =(item,label)=>{
        this.setState(
        {
            deleteTestParamId:item.testParamId,
            showAlertDialog:true,
            alertDialogMessage:"Are you sure you want to delete "+item.testParamName+"?"
        });
    }
    
    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    handleAlertDialogClose = () =>{
        this.setState(
        {
            deleteTestParamId:"",
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }

    /********************* API CALLS **********************/
    getTestParamList = () => {
        this.setState({
            showLoader:true,
        });
        fetch(Constants.TestParamList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                search:this.state.searchTestParamNameKey,
                pageNo: this.state.currentPageNo,
                resultsize:this.state.resultSize,
                sort: this.state.sort,
                sortDir: this.state.sortDir,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    pageNo:this.state.currentPageNo,
                    totalCount:data.data.count,
                    testParamsList:data.data.result,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchTestParamNameKey,
                    projectDetails:data.data.projectDetails

                })
            }else{
                this.setState({
                    testParamsList:"",
                    totalCount:0,
                    projectName:data.title,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchTestParamNameKey
                })
            }
        });
    }

    onChangePage = (page) => {
        // update state with new page of items
        if(page !== this.state.currentPageNo){
            this.setState({
                showLoader:true,
            })
            fetch(Constants.TestParamList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    testParamName:this.state.searchTestParamNameKey,
                    pageNo: page,
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
                    this.setState({
                        currentPageNo:page,
                        testParamsList:data.data.result,
                        totalCount:data.data.count,
                        showLoader:false,

                    });
                }else{
                    this.setState({
                        currentPageNo:page,
                        testParamsList:"",
                        totalCount:0,
                        showLoader:false,
                    });
                }
            });
        }
    }

    addTestParam = (e) =>{
        e.preventDefault();
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.testParamName))
        {
            error_flag = true;
            errors['testParamName'] = "Please enter test parameter name";
        }

        if(isEmptyVariable(this.state.testParamValue))
        {
            error_flag = true;
            errors['testParamValue'] = "Please enter testParam value!";
        }

        if (error_flag) {
            this.setState({
                errors: errors
            });

            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }
        else
        {
            fetch(Constants.AddTestParam,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    testParamName:this.state.testParamName,
                    testParamValue:this.state.testParamValue,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    // window.location=Constants.WINDOW_LOCATION;
                }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showAddTestParamModal:false
                    },()=> {
                        this.getTestParamList();
                    })
                }else{
                    errors['testParamError'] = data.responseMessage;

                    this.setState({
                        errors: errors
                    });
        
                    setTimeout(function(){
                        this.setState({errors:{}});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }
            });
        }
    }

    editTestParam = (e) => {
        e.preventDefault();
        var error_flag = false;
        let errors = {};
        
        if(isEmptyVariable(this.state.testParamName))
        {
            error_flag = true;
            errors['testParamName'] = "Please enter testParam name!";
        }
        if(isEmptyVariable(this.state.testParamValue))
        {
            error_flag = true;
            errors['testParamValue'] = "Please enter testParam value!";
        }
        
        if (error_flag) {
            this.setState({
                errors: errors
            });
            setTimeout(function(){
                this.setState({errors:{}});
           }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }
        else
        {
            fetch(Constants.EditTestParam,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    testParamName:this.state.testParamName,
                    testParamValue:this.state.testParamValue,
                    testParamId:this.state.testParamId,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showAddTestParamModal:false
                    },()=> {
                        this.getTestParamList();
                    })
                }else{
                    errors['testParamError'] = data.responseMessage;

                    this.setState({
                        errors: errors
                    });
        
                    setTimeout(function(){
                        this.setState({errors:{}});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }
            });
        }
    }

    deleteTestParam = () =>{
        let url = Constants.DeleteTestParam;
        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
            {
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                testParamId:this.state.deleteTestParamId
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
                    deleteTestParamId:"",
                    showAlertDialog:false,
                    alertDialogMessage:""
                },()=>{
                    this.getTestParamList();
                });
            }else{
                this.setState({
                    deleteTestParamId:"",
                    showAlertDialog:false,
                    alertDialogMessage:"",
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage
                });
            }
        });
    }


    render(){
        const {projectDetails} = this.state;
        const actionArr = [
            {
                label:"Edit",
                icon:<EditAlt/>
            },
            {
                label:"Delete",
                icon:<Delete/>
            },
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

                    <ScenarioSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                showLeftMenu={true}
                                title={this.state.projectDetails.title}
                                projectNo={this.state.projectId}
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
                                !(isEmptyArray(this.state.testParamsList) &&
                                isEmptyVariable(this.state.apiSearchKey)) &&
                                <CustomContainer>
                                {
                                    // dont display when action and search key both are empty
                                    !(isEmptyVariable(this.state.testParamsList) &&
                                    isEmptyVariable(this.state.apiSearchKey)) &&
                                    <CustomRow>
                                        <CustomCol md="6">
                                            <SearchLayout>
                                                <ResultsizeDropDown
                                                    itemsArr={this.state.resultSizeArr}
                                                    placeholder={this.state.resultSizePlaceholder}
                                                    name={"label"}
                                                    onDropDownItemClick={this.resultSizeDropdownClick}
                                                    disableShadowAddBorder={true}
                                                />
                                                <FieldSetRoundSearch>
                                                    <InputFieldRoundSearch 
                                                        type="text"
                                                        placeholder="Search Parameter Name"
                                                        name="searchTestParamNameKey" 
                                                        onChange={this.handleChange} 
                                                        value={this.state.searchTestParamNameKey}
                                                        onKeyPress={this.onEnterBtnPress}
                                                    />
                                                    <SearchIcon 
                                                        onClick = {this.searchTestParamName}
                                                    />
                                                </FieldSetRoundSearch>  
                                                <ClearSearchText onClick={this.resetFilters}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                            </SearchLayout>
                                        </CustomCol>
                                        <CustomCol md="3">
                                        </CustomCol>
                                        <CustomCol md="3">
                                            {
                                                projectDetails.writeScenariosAndAction === "Y" &&
                                                <AddNewLayout>
                                                    <AddNewBtn
                                                        as="button"
                                                        onClick = {this.handleAddTestParamShow}
                                                    >Add New Parameter</AddNewBtn>
                                                </AddNewLayout>
                                            }
                                        </CustomCol>
                                    </CustomRow>
                                }

                                {
                                    !isEmptyArray(this.state.testParamsList) &&
                                    <TableCardLayout>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th width="6%">No</th>
                                                    <th width="30%" onClick={this.sortTableLocal.bind(this, sortName)}>
                                                        <div className="sort-header">
                                                            Parameter Name
                                                            <span
                                                                className={
                                                                    this.state.sort === sortName ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th width="45%" onClick={this.sortTableLocal.bind(this, sortValue)}>
                                                        <div className="sort-header">
                                                            Parameter Value
                                                            <span
                                                                className={
                                                                    this.state.sort === sortValue ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th width="12%" onClick={this.sortTableLocal.bind(this, sortUseCount)}>
                                                        <div className="sort-header">
                                                            Usage
                                                            <span
                                                                className={
                                                                    this.state.sort === sortUseCount ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    {
                                                        projectDetails.writeScenariosAndAction === "Y" &&
                                                        <th width="7%"></th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                !isEmptyVariable(this.state.testParamsList) &&
                                                this.state.testParamsList.map((item,idx) => {
                                                    return <tr>
                                                        {/* <td>{((this.state.currentPageNo - 1) * Constants.RESULT_SIZE_PAGINATION) + (++idx)}</td> */}
                                                        <td>{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                        <td>{item.testParamName}</td>
                                                        <td>{item.testParamValue}</td>
                                                        <td>{item.testParamUseCount}</td>
                                                        {
                                                            projectDetails.writeScenariosAndAction === "Y" &&
                                                            <td><TableDropDown 
                                                                actionArr={actionArr}
                                                                item = {item}
                                                                onClickDropDownItem={this.onClickItem}
                                                            /></td>
                                                        }
                                                    </tr>
                                                })
                                            }
                                            </tbody>

                                        </Table>
                                    </TableCardLayout>
                                }
                                <FlexLayoutCenterJustified>
                                    {
                                        (this.state.totalCount > this.state.testParamsList.length) && 
                                        <Pagination 
                                            totalLength ={this.state.totalCount} 
                                            items={this.state.testParamsList} 
                                            onChangePage={this.onChangePage} 
                                            currentPageNo = {this.state.currentPageNo}
                                            pageSize={this.state.resultSize}
                                            initialPage={this.state.currentPageNo}
                                        />
                                    }
                                    {
                                        this.state.totalCount <= this.state.testParamsList.length &&
                                        <div></div>
                                    }
                                    <PageCountSpan>
                                        {(start+1)+"-"+end+" of "+this.state.totalCount}
                                    </PageCountSpan>
                                </FlexLayoutCenterJustified>

                                </CustomContainer>
                            }
                            {
                                this.state.componentDidMountFlag && isEmptyArray(this.state.testParamsList) &&
                                <CustomContainerEmptyLayout
                                    paddingValue={isEmptyVariable(this.state.apiSearchKey)?"25px":"0px 25px 25px"}
                                >
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey)?
                                                    Constants.TEST_PARAM_EMPTY_WARNING
                                                    :
                                                    Constants.ELEMENTS_EMPTY_SEARCH_WARNING
                                                }
                                                </CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey) &&
                                                    <EmptyCardAddNewLayout>
                                                        <AddNewBtn
                                                            as="button"
                                                            onClick = {this.handleAddTestParamShow}
                                                        >Add New Parameter</AddNewBtn>
                                                    </EmptyCardAddNewLayout>
                                                }
                                            </CustomCol>
                                        </CustomRow>
                                    </EmptyCard>
                                </CustomContainerEmptyLayout>
                            }
                        </MainContainer>

                        {/* Add/Edit TestParam Dialog */}
                        <BootstrapModal show={this.state.showAddTestParamModal} onHide={this.handleAddTestParamClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{this.state.isEdit?"Edit":"Add"} Test Parameter</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FieldSet>
                                    <InputLabel>Parameter Name</InputLabel>
                                    <InputFieldBorder 
                                        placeholder="Parameter Name"
                                        name="testParamName"
                                        onChange={this.handleChange}
                                        value={this.state.testParamName}
                                    />
                                    <ErrorSpan>{this.state.errors.testParamName}</ErrorSpan>
                                </FieldSet>
                                <FieldSet>
                                    <InputLabel>Parameter Value</InputLabel>
                                    <InputFieldBorder 
                                        placeholder="Parameter Value"
                                        name="testParamValue"
                                        onChange={this.handleChange}
                                        value={this.state.testParamValue}
                                        onKeyPress={this.onEnterBtnPressSave}
                                    />
                                    <ErrorSpan>{this.state.errors.testParamValue}</ErrorSpan>
                                </FieldSet>
                                {
                                    !isEmptyVariable(this.state.errors.testParamError) &&
                                    <ErrorSpan>{this.state.errors.testParamError}</ErrorSpan>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleAddTestParamClose}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.state.isEdit?this.editTestParam:this.addTestParam}
                                >Save Parameter</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type= {Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Parameter"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteTestParam}
                            proceedBtnLabel={ Constants.PARAMETERS_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                    </ScenarioSection>
                </div>
            </Router>
        );
    
    }
}

export default TestParams;