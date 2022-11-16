import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ConfigSection,MainContainer,LoaderLayout,TableCardLayout,
    TableCard,SearchIcon,AddNewLayout,SearchLayout,ClearSearchText,ConfigTags,BootstrapModal,
    EmptyCard,EmptyCardAddNewLayout,CustomText,TdPara,FieldSetRoundSearch,FieldLabelPlain,
    InputFieldRoundSearch,CancelBtnDialog,SaveBtn,ConfigOuterWrapper,FieldWrapper,FieldLabel,
    AddNewConfigLayout,AddNewText,AddPlusIcon,ConfigContainer,DeleteConfigLayout,DeleteIconHolder,
    DeleteIcon,ModalBodyWrapper,FieldSetConfig,ConfigDropdownLayout,CustomContainerEmptyLayout
} from './configs.style';
import {CustomContainer,CardHeadingLayout,
    InputFieldBorder,ErrorSpan,
    CardHeading,Table,    ArrowUpIcon,ArrowDownIcon,
    AddNewBtn,CustomRow,CustomCol, FlexLayoutCenterJustified, PageCountSpan,} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import {getLocalStorageVariables,isEmptyVariable,sortTable,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Modal,Button} from 'react-bootstrap';
import Pagination from '../../commonComponents/pagination';
import AlertDialog from '../../commonComponents/AlertDialog';
import DropDownRegular from '../../commonComponents/DropDownRegularV2';
import { animateScroll } from "react-scroll";
import SpinnerLoader from 'react-loader-spinner';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

const userDetails  = getLocalStorageVariables();
const sortName  = "name";
const sortOs = "osCount";
const sortBrowser = "browsers";
const sortResolution = "resolutions";
const osLinuxId = 1;
const osLinuxValue = "Linux";
const resolutionDefaultPlacholder = "Select Resolution";
class Configs extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            projectId:this.props.match.params.id,
            projectDetails:{},
            projectName:"",
            configStatus:Constants.CONFIGS_STATUS_ACTIVE,
            showLoader:false,
            configList:"",
            totalCount:0,
            searchConfigNameKey:"",
            apiSearchKey:"",
            componentDidMountFlag:false,
            showAlertDialog:false,
            alertDialogMessage:"",
            deleteConfigId:"",

            showConfigModal:false,
            isEdit:false,
            masterConfigId:"",
            errors:"",
            configName:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            sort: "",
			sortDir: "",


            configCount:0, 
            configArr: [{
                osId:osLinuxId,
                osValue:osLinuxValue,
                browserId:0,
                browserValue:"Select Browser",
                versionId:0,
                versionValue:"Select Version",
                id:0,
                resolution:resolutionDefaultPlacholder,
                // osError:"",
                browserError:"",
                versionError:"",
                browserArr:[],
                versionArr:[]
            }],

            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
        }
        // this.primitiveOSDDArr = [];
        this.browserMap = {};
        this.browserVersionMap = {};
        this.browserResolutionArr = [];
    }

    componentDidMount(){
        this.getInitData();
    }

    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }
    
    // onPrimitiveOSDropDownItemClick = (item,index) => {
    //     this.browserDDArr = this.browserMap[item.masterOsId].browsers;
    //     const tempArr = this.state.configArr;
        
    //     let idTemp = tempArr[index].id;

    //     let tempObj = {
    //         osId:1,
    //         osValue:item.masterOsName,
    //         browserId:0,
    //         browserValue:"Select Browser",
    //         versionId:0,
    //         versionValue:"Select Version",
    //         id:idTemp,
    //         osError:"",
    //         browserError:"",
    //         versionError:"",
    //         browserArr:this.browserDDArr,
    //         versionArr:[]
    //     }

    //     tempArr.splice(index,1,tempObj);

    //     this.setState({
    //         configArr:tempArr,
    //     })
    // }

    browserDropDownItemClick = (item,index) => {
        let versionDDArr = this.browserVersionMap[item.masterBrowserId].versions;

        const tempArr = this.state.configArr;
        let idTemp = tempArr[index].id;
        
        let tempObj = {
            osId:osLinuxId,
            osValue:osLinuxValue,
            browserId:item.masterBrowserId,
            browserValue:item.browser,
            versionId:0,
            versionValue:"Select Version",
            resolution:resolutionDefaultPlacholder,
            id:idTemp,
            // osError:"",
            browserError:"",
            versionError:"",
            resolutionError:"",
            browserArr:tempArr[index].browserArr,
            versionArr:versionDDArr
        }

        tempArr.splice(index,1,tempObj);

        this.setState({
            configArr:tempArr,
        })
    }

    browserVersionDropDownItemClick = (item,index) => {
        const tempArr = this.state.configArr;
        let tempObj = {
            ...tempArr[index],
            browserId:item.masterBrowserId,
            versionId:item.masterBrowserId,
            versionValue:item.browserVersion,
            resolution:resolutionDefaultPlacholder,
        }

        tempArr.splice(index,1,tempObj);

        this.setState({
            configArr:tempArr,
        })
    }

    resolutionDropDownItemClick = (item,index) => {
        // alert(item.id);
        const tempArr = this.state.configArr;
        let tempObj = {
            ...tempArr[index],
            resolution:item.resolution
        }

        tempArr.splice(index,1,tempObj);

        this.setState({
            configArr:tempArr,
        })
    }

    //Adding Empty Config Row
    addNewConfigRow = () => {
        let id = this.state.configCount + 1;

        const row = {
            osId:osLinuxId,
            osValue:osLinuxValue,
            browserId:0,
            browserValue:"Select Browser",
            versionId:0,
            versionValue:"Select Version",
            id:id,
            resolution:resolutionDefaultPlacholder,
            // osError:"",
            browserError:"",
            versionError:"",
            browserArr:this.browserDDArr,
            versionArr:[]
        }

        var tempArr = this.state.configArr;
        tempArr.push(row)

        this.setState({
            configArr:tempArr,
            configCount:id
        },()=>{
            this.scrollToBottom();
        })
    }

    deleteConfigRow = (index,e) => {
        e.stopPropagation();
        let tempArr = this.state.configArr;
        tempArr.splice(index,1);

        this.setState({
            configArr:tempArr,
        })

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.searchConfigNameKey)){
                this.setState({currentPageNo:1},()=>{
                    this.getConfigList();
                });
            }
        }
    }

    sortTableLocal = (sortColumn) => {
        let sortObj = sortTable(sortColumn, this.state.sort, this.state.sortDir);

        this.setState(
            {
                sort: sortObj.sortTemp,
                sortDir: sortObj.sortDirTemp,
            },
            () => {
                this.getConfigList();
            }
        );
    };

    searchConfigName = () => {
        if(!isEmptyVariable(this.state.searchConfigNameKey)){
            this.setState({currentPageNo:1},()=>{
                this.getConfigList();
            });
        }
    }

    onClickItem = (label,item) =>{
        if(label === "Edit"){
            this.openEditDialog(item,label);
        }
        else if(label === "Delete"){
            this.openDeleteDialog(item,label);
        }
    }

    openEditDialog = (masterConfigId) =>{
        fetch(Constants.ConfigDetails,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                { 
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    masterConfigId:masterConfigId,
                })
        })
        .then((response) => { 
            return response.json()
        })
        .then(data => {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                let tempArr = [];

                data.data.configArray.map((value,index)=>{
                    let tmpObj = {
                        osId:osLinuxId,
                        osValue:value.masterOs,
                        browserId:value.masterBrowserId,
                        browserValue:value.browser,
                        versionId:value.masterBrowserId,
                        versionValue:value.browserVersion,
                        id:index,
                        resolution:value.resolution,
                        // osError:"",
                        browserError:"",
                        versionError:"",
                        browserArr:this.browserMap[value.masterOs].browsers,
                        versionArr:this.browserVersionMap[value.masterBrowserId].versions
                    };

                    tempArr.push(tmpObj);
                })

                this.setState(
                {
                    showConfigModal:true,
                    configName:data.data.configDetails.name,
                    errors:[],
                    isEdit:true,
                    masterConfigId:masterConfigId,
                    configArr:tempArr
                });
            }
            else
            {

            }
        });
    }

    openDeleteDialog =(configId,label)=>{
        this.setState(
        {
            deleteConfigId:configId,
            showAlertDialog:true,
        });
    }

    resetFilters = () => {
        this.setState({
            currentPageNo: 1,
            searchConfigNameKey:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
        },()=>{
            this.getConfigList();
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
				this.getConfigList();
			}
		);
	};

    handleAlertDialogClose = () =>{
        this.setState(
        {
            deleteConfigId:"",
            showAlertDialog:false,
        });
    }

    handleClose = () => {
        this.setState(
            {
                showConfigModal:false,
                masterConfigId:"",
                errors:""
            });
    }

    handleAddDialogShow = () => {
        let id = 0;

        const row = {
            osId:osLinuxId,
            osValue:osLinuxValue,
            browserId:0,
            browserValue:"Select Browser",
            versionId:0,
            versionValue:"Select Version",
            id:id,
            resolution:resolutionDefaultPlacholder,
            // osError:"",
            browserError:"",
            versionError:"",
            browserArr:this.browserDDArr,
            versionArr:[]
        }

        var tempArr = [];
        tempArr.push(row);

        this.setState(
        {
            showConfigModal:true,
            configName:'',
            errors:"",
            isEdit:false,
            configId:"",
            configArr:tempArr,
            configCount:0
        });
    }

    hasDuplicates(arr)
    {
        return new Set(arr).size !== arr.length; 
    }

    clearStatesErrors = () => {
        let tempArr = this.state.configArr;
        for(const [index, value] of tempArr.entries()){
            // tempArr[index].osError = ""
            tempArr[index].browserError = ""
            tempArr[index].versionError = ""
        }

        this.setState({
            configArr:tempArr,
            errors:"",
        })
    }

    scrollToBottom = () => {
        animateScroll.scrollToBottom({
            duration: 500,
            containerId: "modalbody"
        });
    }

    /************************API CALLS**************************/

    getInitData = () => {
        this.setState({
            showLoader:true,
        });

        Promise.all([
            fetch(Constants.ConfigList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    sortDir:this.state.sortDir
                })
            }),
            fetch(Constants.MasterConfigList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    sortDir:this.state.sortDir
                })
            })
        ])
        .then(([configRes,masterRes])=>{
            return Promise.all([configRes.json(),masterRes.json()])
        })
        .then(([configRes,masterRes])=>{
            if(masterRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(masterRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.primitiveOSDDArr = masterRes.data.osArr;
                this.browserMap = masterRes.data.browserMap;
                this.browserDDArr = masterRes.data.browserMap["Linux"].browsers;
                this.browserVersionMap = masterRes.data.browserVersionMap;
                this.browserResolutionArr = masterRes.data.resolutions;
            }else{
                // this.primitiveOSDDArr = [];
                this.browserMap = {};
                this.browserVersionMap = {};
            }

            if(configRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else if(configRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    showLoader:false,
                    componentDidMountFlag:true,

                    pageNo:this.state.currentPageNo,
                    totalCount:configRes.data.count,
                    configList:configRes.data.result,
                    apiSearchKey:this.state.searchConfigNameKey,
                    projectName:configRes.title,
                    projectDetails:configRes.data.projectDetails
                })
            }
        });
    }

    getConfigList()
    {
        this.setState({
            showLoader:true,
        });

        fetch(Constants.ConfigList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                search:this.state.searchConfigNameKey,
                status:this.state.configStatus,
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
                    showLoader:false,
                    componentDidMountFlag:true,

                    pageNo:this.state.currentPageNo,
                    totalCount:data.data.count,
                    configList:data.data.result,
                    apiSearchKey:this.state.searchConfigNameKey,
                    projectName:data.title,
                    projectDetails:data.data.projectDetails
                })
            }else{
                this.setState({
                    showLoader:false,
                    componentDidMountFlag:true,

                    configList:"",
                    totalCount:0,
                    apiSearchKey:this.state.searchConfigNameKey,
                    projectName:data.title
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
            
            fetch(Constants.ConfigList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    search:this.state.searchConfigNameKey,
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
                        showLoader:false,

                        currentPageNo:page,
                        totalCount:data.data.count,
                        configList:data.data.result,
                        apiSearchKey:this.state.searchConfigNameKey,
                    });
                }else{
                    this.setState({
                        currentPageNo:page,
                        elementsList:"",
                        totalCount:0,
                        showLoader:false,
                    });
                }
            });
        }
    }

    callAddEditConfigApi = (e) =>{
        e.preventDefault();

        let isError = false;
        let errors = {};
        let rowValues = [];
        let tempArr = this.state.configArr;


        if(isEmptyVariable(this.state.configName))
        {
            isError = true;
            errors['configName'] = "Please enter config name";
        }

        if(tempArr.length > 0)
        {
            for(const [index, value] of tempArr.entries()){
                // if(value.osId === 0)
                // {
                //     tempArr[index].osError = "Please select an OS"
                //     isError = true;
                // }
                if(value.browserId === 0)
                {
                    tempArr[index].browserError = "Please select a Browser"
                    isError = true;
                }
                if(value.versionId === 0)
                {
                    tempArr[index].versionError = "Please select a Version"
                    isError = true;
                }
                if(isEmptyVariable(value.resolution) || value.resolution === resolutionDefaultPlacholder){
                    tempArr[index].resolutionError = "Please select a Resolution"
                    isError = true;
                }
                
                // if(value.osId !== 0 && value.browserId !== 0 && value.versionId !== 0)
                // {
                //     let tempStr = value.osId+"-"+value.browserId+"-"+value.versionId;
                //     rowValues.push(tempStr);
                // }
            }
        }

        // if(!isError)
        // {
        //     if (this.hasDuplicates(rowValues)) {
        //         isError = true;
        //         errors['rowError'] = "Please remove duplicate configs"
        //     }
        // }

        if(isError){
            this.setState({
                errors: errors,
                configArr:tempArr
            });

            setTimeout(function(){
                this.clearStatesErrors();
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        } else {
            let postConfigArr = [];

            if(tempArr.length > 0)
            {
                for(const [index, value] of tempArr.entries()){
                    let tempConfigObj = {
                        // os:value.osId,
                        browser:value.browserId,
                        // version:value.versionId,
                        resolution:value.resolution
                    }
                    postConfigArr.push(tempConfigObj);
                }
            }

            let url = Constants.AddConfig;

            let postParams = {
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                name:this.state.configName,
                configArr:JSON.stringify(postConfigArr),
            }

            if(this.state.isEdit){
                url = Constants.EditConfig;
                postParams.masterConfigId = this.state.masterConfigId
            }

            fetch(url,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(postParams)
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
                {
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }
                else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState(
                    {
                        showConfigModal:false,
                        masterConfigId:"",
                        errors:""
                    },()=>{
                        this.getConfigList();
                    });
                }else{
                    errors['rowError'] = data.responseMessage;

                    this.setState({
                        errors: errors,
                    });

                    setTimeout(function(){
                        this.setState({errors:""})
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }
            });
        }
    }

    deleteConfig = () =>{

        let url = Constants.DeleteConfig;
        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
            {
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                masterConfigId:this.state.deleteConfigId
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
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState(
                {
                    deleteConfigId:"",
                    showAlertDialog:false,
                },()=>{
                    this.getConfigList();
                });
            } else {
                this.setState(
                {
                    deleteConfigId:"",
                    showAlertDialog:false,

                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage,
                });
            }
            
        });
    }

    render(){
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

                    <ConfigSection>
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
                                !(isEmptyArray(this.state.configList) &&
                                isEmptyVariable(this.state.apiSearchKey)) &&
                                <CustomContainer>
                                    {
                                        // dont display when action and search key both are empty
                                        !(isEmptyVariable(this.state.configList) &&
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
                                                            placeholder="Search Config Name"
                                                            name="searchConfigNameKey" 
                                                            onChange={this.handleChange} 
                                                            value={this.state.searchConfigNameKey}
                                                            onKeyPress={this.onEnterBtnPress}
                                                        />
                                                        <SearchIcon 
                                                            onClick = {this.searchConfigName}
                                                        />
                                                    </FieldSetRoundSearch> 
                                                    <ClearSearchText onClick={this.resetFilters}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                                </SearchLayout>
                                            </CustomCol>
                                            <CustomCol md="3">
                                            </CustomCol>
                                            <CustomCol md="3">
                                                <AddNewLayout> 
                                                    <AddNewBtn
                                                        as="button"
                                                        onClick = {this.handleAddDialogShow}
                                                    >Add New Config</AddNewBtn>
                                                </AddNewLayout>
                                            </CustomCol>
                                        </CustomRow>
                                    }

                                    {
                                        !isEmptyArray(this.state.configList) &&
                                        <TableCardLayout>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th width={"5%"}>No</th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortName)}>
                                                            <div className="sort-header">
                                                                Config Name
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortName ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        {/* <th width="9%" onClick={this.sortTableLocal.bind(this, sortOs)}>
                                                            <div className="sort-header">
                                                                OS
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortOs ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th> */}
                                                        <th width="24%" onClick={this.sortTableLocal.bind(this, sortBrowser)}>
                                                            <div className="sort-header">
                                                                Browser
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortBrowser ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width="24%" onClick={this.sortTableLocal.bind(this, sortResolution)}>
                                                            <div className="sort-header">
                                                                Resolution
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortResolution ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width="7%"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    !isEmptyVariable(this.state.configList) &&
                                                    this.state.configList.map((item,idx) => {
                                                        return <tr>
                                                            <td>{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                            <td>{item.name}</td>
                                                            {/* <td>{item.osCount}</td> */}
                                                            <td>{item.browsers}</td>
                                                            <td>{item.resolutions}</td>
                                                            <td>
                                                                <TableDropDown 
                                                                    actionArr={actionArr}
                                                                    item = {item.masterConfigId}
                                                                    onClickDropDownItem={this.onClickItem}
                                                                />
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                                </tbody>

                                            </Table>
                                        </TableCardLayout>
                                    }
                                    {
                                        
                                    }
                                    <FlexLayoutCenterJustified>
                                        {
                                            (this.state.totalCount > this.state.configList.length) && 
                                            <Pagination 
                                                totalLength ={this.state.totalCount} 
                                                items={this.state.configList} 
                                                onChangePage={this.onChangePage} 
                                                currentPageNo = {this.state.currentPageNo} 
                                                pageSize={this.state.resultSize}
                                                initialPage={this.state.currentPageNo}
                                            />
                                        }
                                        {
                                            this.state.totalCount <= this.state.configList.length &&
                                            <div></div>
                                        }
                                        <PageCountSpan>
                                            {(start+1)+"-"+end+" of "+this.state.totalCount}
                                        </PageCountSpan>
                                    </FlexLayoutCenterJustified>

                                </CustomContainer>
                            }
                            {
                                this.state.componentDidMountFlag && isEmptyArray(this.state.configList) &&
                                <CustomContainerEmptyLayout
                                paddingValue={isEmptyVariable(this.state.apiSearchKey)?"25px":"0px 25px 25px"}
                                >
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey)?
                                                    Constants.CONFIGS_EMPTY_WARNING
                                                    :
                                                    Constants.CONFIGS_EMPTY_SEARCH_WARNING
                                                }
                                                </CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey) &&
                                                    <EmptyCardAddNewLayout>
                                                        <AddNewBtn
                                                            as="button"
                                                            onClick = {this.handleAddDialogShow}
                                                        >Add New Config</AddNewBtn>
                                                    </EmptyCardAddNewLayout>
                                                }
                                            </CustomCol>
                                        </CustomRow>
                                    </EmptyCard>
                                </CustomContainerEmptyLayout>
                            }
                        </MainContainer>

                        <BootstrapModal show={this.state.showConfigModal} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.isEdit?"Edit":"Add"} Config</Modal.Title>
                            </Modal.Header>

                            <Modal.Body id="modalbody">
                                <ModalBodyWrapper>
                                    <FieldSetConfig>
                                        <FieldLabelPlain>Config Name</FieldLabelPlain>
                                        <InputFieldBorder 
                                            placeholder="Config Name"
                                            name="configName"
                                            onChange={this.handleChange}
                                            value={this.state.configName}
                                        />
                                        <ErrorSpan>{this.state.errors.configName}</ErrorSpan>
                                    </FieldSetConfig>
                                    {
                                        this.state.configArr.map((item, index) => {
                                        return  <ConfigContainer>
                                                    <ConfigDropdownLayout>
                                                    <CustomRow style={{flex:"1 1 auto"}}>
                                                        {/* <CustomCol md="4">
                                                            <ConfigOuterWrapper> */}
                                                                {/* <ConfigIndex>{(index+1)}.</ConfigIndex> */}
                                                                {/* <FieldWrapper>
                                                                    <FieldLabel>OS</FieldLabel>
                                                                    <DropDownRegular 
                                                                        placeholder={item.osValue}
                                                                        itemsArr = {this.primitiveOSDDArr}
                                                                        onDropDownItemClick = {this.onPrimitiveOSDropDownItemClick}
                                                                        dropDownId = {index}
                                                                        name={"masterOsName"}
                                                                    />
                                                                    {
                                                                        !isEmptyVariable(item.osError) &&
                                                                        <ErrorSpan>{item.osError}</ErrorSpan>
                                                                    }
                                                                </FieldWrapper>
                                                            </ConfigOuterWrapper>
                                                        </CustomCol> */}
                                                        <CustomCol md="4">
                                                            <ConfigOuterWrapper>
                                                                <FieldWrapper>
                                                                    <FieldLabel>Browser</FieldLabel>
                                                                    <DropDownRegular 
                                                                        placeholder={item.browserValue}
                                                                        itemsArr = {item.browserArr}
                                                                        onDropDownItemClick = {this.browserDropDownItemClick}
                                                                        dropDownId = {index}
                                                                        name={"browser"}
                                                                    />
                                                                    {
                                                                        !isEmptyVariable(item.browserError) &&
                                                                        <ErrorSpan>{item.browserError}</ErrorSpan>
                                                                    }
                                                                </FieldWrapper>
                                                            </ConfigOuterWrapper>
                                                        </CustomCol>
                                                        <CustomCol md="4">
                                                            <ConfigOuterWrapper>
                                                                <FieldWrapper>
                                                                    <FieldLabel>Version</FieldLabel>
                                                                    <DropDownRegular 
                                                                        placeholder={item.versionValue}
                                                                        itemsArr = {item.versionArr}
                                                                        onDropDownItemClick = {this.browserVersionDropDownItemClick}
                                                                        dropDownId = {index}
                                                                        name={"browserVersion"}
                                                                    />
                                                                    {
                                                                        !isEmptyVariable(item.versionError) &&
                                                                        <ErrorSpan>{item.versionError}</ErrorSpan>
                                                                    }
                                                                </FieldWrapper>
                                                            </ConfigOuterWrapper>
                                                        </CustomCol>
                                                        <CustomCol md="4">
                                                            <ConfigOuterWrapper>
                                                                <FieldWrapper>
                                                                    <FieldLabel>Resolution</FieldLabel>
                                                                    <DropDownRegular 
                                                                        placeholder={item.resolution}
                                                                        itemsArr = {item.versionId !== 0 ? this.browserResolutionArr: []}
                                                                        onDropDownItemClick = {this.resolutionDropDownItemClick}
                                                                        dropDownId = {index}
                                                                        name={"resolution"}
                                                                    />
                                                                    {
                                                                        !isEmptyVariable(item.resolutionError) &&
                                                                        <ErrorSpan>{item.resolutionError}</ErrorSpan>
                                                                    }
                                                                </FieldWrapper>
                                                            </ConfigOuterWrapper>
                                                        </CustomCol>
                                                </CustomRow>
                                                {/* As of now only one config is allowed */}
                                                {/* <DeleteConfigLayout>
                                                {
                                                    index >=1 &&
                                                    <DeleteIconHolder onClick={this.deleteConfigRow.bind(this,index)}>
                                                        <DeleteIcon />
                                                    </DeleteIconHolder>
                                                }
                                                </DeleteConfigLayout> */}
                                                
                                                </ConfigDropdownLayout>
                                                
                                            </ConfigContainer>
                                        })
                                    }
                                    {/* As of now only one config is allowed */}
                                    {/* <AddNewConfigLayout onClick={this.addNewConfigRow}>
                                        <AddPlusIcon />
                                        <AddNewText>Add More</AddNewText>
                                    </AddNewConfigLayout> */}
                                    {
                                        !isEmptyVariable(this.state.errors.rowError) &&
                                        <ErrorSpan style={{display:"block"}}>{this.state.errors.rowError}</ErrorSpan>
                                    }
                                </ModalBodyWrapper>
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                        as="button"
                                        onClick={this.handleClose}
                                    >Cancel</CancelBtnDialog>
                                    <SaveBtn
                                        as="button"
                                        onClick = {this.callAddEditConfigApi}
                                    >Save Config</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type= {Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Config"
                            alertDialogMessage={Constants.CONFIGS_DELETE_WARNING}
                            proceedBtnClick={this.deleteConfig}
                            proceedBtnLabel={ Constants.CONFIGS_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                    </ConfigSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Configs;