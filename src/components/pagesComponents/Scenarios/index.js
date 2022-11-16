import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';

import {ScenarioSection,MainContainer,TableCardLayout,CustomContainerEmptyLayout,
    TableCard,SearchIcon,ClearSearchText,SearchLayout,ScenarioTags,AddNewLayout,FieldSetRoundSearch,
    InputFieldRoundSearch,LoaderLayout,CustomText,EmptyCard,EmptyCardAddNewLayout,CheckboxLayout,
    InputFieldCheckBox,TableRowCheckBox,SelectionInfoLayout,SelectionInfoText,RunScenarioBtn,
    SelectionCheckboxWrapper,BootstrapModal,CancelBtnDialog,SaveBtn, SelectTagsDropdownLayout
} from './scenarios.style';

import {CustomContainer,CardHeadingLayout,FieldSet,InputLabel,ErrorSpan,
    CardHeading,Table,    TableAnchor,ArrowUpIcon,ArrowDownIcon,
    AddNewBtn,CustomRow,CustomCol, FlexLayoutCenterJustified, PageCountSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import DropDownRegular from '../../commonComponents/DropDownRegularV2'
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import CheckBoxDropDown from '../../commonComponents/DropDownRegularCheckbox'
import {getLocalStorageVariables,isEmptyVariable,sortTable,truncateString,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {Delete} from '@styled-icons/material/Delete';
import {PlayCircle} from '@styled-icons/fa-regular/PlayCircle';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import Pagination from '../../commonComponents/pagination';
import {Modal} from 'react-bootstrap';
import SpinnerLoader from 'react-loader-spinner';
import AlertDialog from '../../commonComponents/AlertDialog'
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import AddScenario from '../AddScenario';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";
import {FileCopy} from '@styled-icons/remix-fill/FileCopy';
import CloneDialog from "./cloneDialog";

const userDetails  = getLocalStorageVariables();
const ConfigDropdownDefaultText = "Select Config"

const sortScenario  = "scenarioName";
const sortScenarioFullname  = "fullName";
const sortTag  = "scenarioTags";
const sortAction  = "actionCount";
const sortTotalStepCount  = "totalStepCount";
// Sample Tags 
const tagPlaceholder= "Select Tags"
class Scenarios extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            project_id:this.props.match.params.id,
            projectDetails:{},
            showLoader:false,
            scenarioList:"",
            totalCount:0,
            apiSearchKey:"",
            scenarioNameSearchkey:"",
            showAlertDialog:false,
            alertDialogMessage:"",
            deleteEditScenarioId:"",
            componentDidMountFlag:false,
            showScenarioList:false,
            isEdit:false,
            showAddScenario:false,
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            sort: "",
			sortDir: "",

            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",

            showTableRowCheckBox:false,
            totalSelectionCount:0,
            selectedScenarios:{},

            showRunScenariosModal:false,
            selectedConfigName:ConfigDropdownDefaultText,
            selectedConfigId:"",
            configArr:[],
            configErrors:{},

            tagsMasterDD: [],
			tagsSelectedDD: [],
            selectedTagPlaceholder:tagPlaceholder,

            showCloneDialogFlag:false,
        }
    }

    componentDidMount(){
        this.initData();
    }

    handleCloseCloneDialog = (reloadFlag) => {
        this.setState({
            showCloneDialogFlag:false,
            deleteEditScenarioId:"",
        },()=>{
            if(reloadFlag) this.getScenarioList();
        })
    }

    handleRunScenariosModalClose = () => {
        this.setState({
            showRunScenariosModal:false,
            selectedConfigName:ConfigDropdownDefaultText,
            selectedConfigId:"",
            configArr:[],
            configErrors:{}
        })
    }

    configDropdownClick = (item,idParam) =>{
        this.setState({
            selectedConfigName:item.name,
            selectedConfigId:item.masterConfigId
        })
    }

    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    searchScenarioName = () => {
        if(!isEmptyVariable(this.state.scenarioNameSearchkey)){
            this.setState({
                currentPageNo:1,
                totalSelectionCount:0,
                selectedScenarios:{}
            },()=>{
                this.getScenarioList();
            });
        }
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.scenarioNameSearchkey)){
                this.setState({
                    currentPageNo:1,
                    totalSelectionCount:0,
                    selectedScenarios:{}
                },()=>{
                    this.getScenarioList();
                });
            }
        }
    }

    resetFilters = () => {
        this.setState({
            currentPageNo: 1,
            scenarioNameSearchkey:"",
            totalSelectionCount:0,
            selectedScenarios:{},
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            tagsSelectedDD:[],
            selectedTagPlaceholder:tagPlaceholder
        },()=>{
            this.getScenarioList();
        })
    }

    onClickItem = (label,item) =>{
        if(label === "Delete"){
            this.openDeleteDialog(item,label);
        }else if(label === "Edit"){
            this.setState({
                showScenarioList: false,
                showAddScenario:true,
                isEdit:true,
                deleteEditScenarioId:item
            });
            // this.props.history.push(Constants.EDIT_SCENARIO_PATH+"/"+item)
        }else if(label === "Details"){
            this.props.history.push(Constants.SCENARIO_DETAILS_PATH+"/"+item)
        }else if(label === "Run"){
            let selectedScenarioTemp  = {};
            let count = 0;
            if(selectedScenarioTemp["page_"+this.state.currentPageNo]){
                selectedScenarioTemp["page_"+this.state.currentPageNo]["scenarioId_"+item] = item
            }else{
                let pageObj = {};
                pageObj["scenarioId_"+item] = item
                selectedScenarioTemp["page_"+this.state.currentPageNo] = pageObj;
            }
            count++;
            this.setState({
                selectedScenarios:selectedScenarioTemp,
                totalSelectionCount:count
            },()=>{

                this.onClickRunScenarios();
            })
        }else if(label === "Clone"){
            this.setState({
                showCloneDialogFlag:true,
                deleteEditScenarioId:item,
            })
        }
    }

    openDeleteDialog =(scenarioId,label)=>{
        this.setState(
        {
            operationType:label,
            deleteEditScenarioId:scenarioId,
            showAlertDialog:true,
            alertDialogMessage:Constants.SCENARIOS_DELETE_WARNING
        });
    }

    handleAlertDialogClose = () =>{
        this.setState(
        {
            deleteEditScenarioId:"",
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }

    selectionDropdownClick = (item,id) =>{
        if(item.label === "Select"){
            this.setState({
                showTableRowCheckBox:true,
            })
        }else if(item.label === "Select All"){
            //first get PAGE datalist and then add it to selectedScenario array
            let selectedScenarioTemp  = this.state.selectedScenarios;
            let pageObj = {};
            let count = 0;
            let oldCount = 0;

            //First Check if object is there or not
            if(this.state.selectedScenarios["page_"+this.state.currentPageNo]){
                oldCount = Object.keys(this.state.selectedScenarios["page_"+this.state.currentPageNo]).length;
            }

            //Now create a page object and add all the scenarios in that object
            this.state.scenarioList.forEach(item => {
                pageObj["scenarioId_"+item.scenarioId] = item.scenarioId
                count++;
            })
            selectedScenarioTemp["page_"+this.state.currentPageNo] = pageObj;
            
            let newCount = this.state.totalSelectionCount - oldCount + count;
            // alert()
            this.setState({
                showTableRowCheckBox:true,
                selectedScenarios:selectedScenarioTemp,
                totalSelectionCount:newCount
            })
        }else if(item.label === "None"){
            //Unselect from all the pages
            this.setState({
                showTableRowCheckBox:false,
                selectedScenarios:{},
                totalSelectionCount:0
            })
        }
    }

    resultSizeDropdownClick = (item) => {
		this.setState({
            currentPageNo:1,
            resultSize: item.label,
            resultSizePlaceholder: item.label,
        },() => {
            this.getScenarioList();
        });
	};

    handleCheckMain = (e) =>{
        let isChecked = e.target.checked;
        // let name = e.target.name;
        let selectedScenarioTemp  = this.state.selectedScenarios;

        if(isChecked){
            //first get PAGE datalist and then add it to selectedScenario array
            let pageObj = {};
            let count = 0;
            let oldCount = 0;

            //First Check if object is there or not
            if(this.state.selectedScenarios["page_"+this.state.currentPageNo]){
                oldCount = Object.keys(this.state.selectedScenarios["page_"+this.state.currentPageNo]).length;
            }

            //Now create a page object and add all the scenarios in that object
            this.state.scenarioList.map(item => {
                pageObj["scenarioId_"+item.scenarioId] = item.scenarioId
                count++;
            })
            selectedScenarioTemp["page_"+this.state.currentPageNo] = pageObj;
            
            let newCount = this.state.totalSelectionCount - oldCount + count;
            this.setState({
                showTableRowCheckBox:true,
                selectedScenarios:selectedScenarioTemp,
                totalSelectionCount:newCount
            })
        }else{
            //Unselecting the current page items
            let count = 0;
            if(selectedScenarioTemp["page_"+this.state.currentPageNo]){
                count = Object.keys(selectedScenarioTemp["page_"+this.state.currentPageNo]).length;
                delete selectedScenarioTemp["page_"+this.state.currentPageNo]
            }

            this.setState({
                selectedScenarios:selectedScenarioTemp,
                totalSelectionCount:this.state.totalSelectionCount - count
            })
        }
    }

    handleCheck = (e) =>{
        let isChecked = e.target.checked;
        let name = e.target.name;
        let selectedScenarioTemp  = this.state.selectedScenarios;
        let count = this.state.totalSelectionCount

        if(isChecked){
            if(selectedScenarioTemp["page_"+this.state.currentPageNo]){
                selectedScenarioTemp["page_"+this.state.currentPageNo]["scenarioId_"+name] = name
            }else{
                let pageObj = {};
                pageObj["scenarioId_"+name] = name
                selectedScenarioTemp["page_"+this.state.currentPageNo] = pageObj;
            }
            count++;
        }else{
            delete selectedScenarioTemp["page_"+this.state.currentPageNo]["scenarioId_"+name]
            count--;
        }

        this.setState({
            selectedScenarios:selectedScenarioTemp,
            totalSelectionCount:count
        })
    }
    
    handleShowAddScenario = () =>{
        this.setState({
            showScenarioList: false,
            showAddScenario:true,
            
        }) 
    }

    hideAddEditScenario = (refreshFlag)=>{
        this.setState({
            showScenarioList: true,
            isEdit:false,
            showAddScenario:false,
            deleteEditScenarioId:""
            
        },()=>{
            if(refreshFlag){
                //TODO- need to refresh scenario tags
                this.initData();
            }
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
				this.getScenarioList();
			}
		);
	};

    // handleTagChange = (newValueArr) => {

    //     this.setState(
    //         {
    //             tagsSelectedDD: newValueArr,
    //         });
    // };

    addSelection = (args) => {
        if(!isEmptyVariable(args.itemData.value))
        {
            this.state.tagsSelectedDD.push(args.itemData.value)
        }
        this.setState({
            tagsSelectedDD:this.state.tagsSelectedDD,
        },()=>{
            this.getScenarioList();
        })

    }

    removeSelection = (args) => {
        if(!isEmptyVariable(args.itemData.value)){
            let idx = this.state.tagsSelectedDD.indexOf(args.itemData.value);
            if(idx !== -1){
                this.state.tagsSelectedDD.splice(idx,1);
            }
        }
        this.setState({
            tagsSelectedDD:this.state.tagsSelectedDD
        },()=>{
            this.getScenarioList();
        })
    }

    handleTagSelection = (tagValue) => {
        let tagsSelectedDD=JSON.parse(JSON.stringify(this.state.tagsSelectedDD));

        if(!isEmptyVariable(tagValue) )
        {
            let idx = tagsSelectedDD.indexOf(tagValue);
            if(idx !== -1){
                tagsSelectedDD.splice(idx,1);
                
            }else{
                tagsSelectedDD.push(tagValue)

            }
        }
        this.setState({
            tagsSelectedDD:tagsSelectedDD,
        },()=>{
            this.getScenarioList();
        })

    }

    getScenarioList()
    {
        this.setState({
            showLoader:true,
        });

        // //TODO
        // let tagsMasterDD = [];
        // // set tags select dropdown
		// if (!isEmptyArray(sampleTagsMasterDD)) {
		// 	tagsMasterDD = sampleTagsMasterDD.map((item) => ({ value: item, label: item }));
		// 	console.log(tagsMasterDD);
		// }

        fetch(Constants.ScenarioList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                    pageNo:this.state.currentPageNo,
                    search: this.state.scenarioNameSearchkey,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
			        sortDir: this.state.sortDir,
                    tags:this.state.tagsSelectedDD
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    
                    this.setState({
                        totalCount:data.data.count,
                        scenarioList:data.data.result,
                        showLoader:false,
                        componentDidMountFlag:true,
                        showScenarioList:true,
                        apiSearchKey:this.state.scenarioNameSearchkey,
                        projectDetails:data.data.projectDetails,
                        
                        // tagsMasterDD:tagsMasterDD,
                    })
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        scenarioList:"",
                        totalCount:0,
                        showLoader:false,
                        componentDidMountFlag:true,
                        showScenarioList:false,
                        apiSearchKey:this.state.scenarioNameSearchkey,
                    })
                }
            });
    }

    initData = () => {
        this.setState({
            showLoader:true,
        });

        Promise.all([
            fetch(Constants.ScenarioList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                    pageNo:this.state.currentPageNo,
                    search: this.state.scenarioNameSearchkey,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
                    sortDir: this.state.sortDir,
                    tags:this.state.tagsSelectedDD
                })
            }),
            fetch(Constants.GetProjectScenarioTags,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                })
            })
            
        ])
        .then(([scenarioRes,scenarioTagsRes]) => { 
            return Promise.all([scenarioRes.json(),scenarioTagsRes.json()]) 
        })
        .then(([scenarioRes,scenarioTagsRes]) => {
            let scenarioList="";
            let totalCount=0;
            let showScenarioList= false;
            let projectDetails = "";
            if(scenarioRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                totalCount = scenarioRes.data.count;
                scenarioList =scenarioRes.data.result;
                projectDetails =scenarioRes.data.projectDetails;
                showScenarioList=true;

                // this.setState({
                //     totalCount:data.data.count,
                //     scenarioList:data.data.result,
                //     showLoader:false,
                //     componentDidMountFlag:true,
                //     showScenarioList:true,
                //     apiSearchKey:this.state.scenarioNameSearchkey,
                //     projectDetails:data.data.projectDetails,
                    
                //     tagsMasterDD:tagsMasterDD,
                // })
            }else if(scenarioRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                // this.setState({
                //     scenarioList:"",
                //     totalCount:0,
                //     showLoader:false,
                //     componentDidMountFlag:true,
                //     showScenarioList:false,
                //     apiSearchKey:this.state.scenarioNameSearchkey,
                // })
            }

            let tagsMasterDD = [];
            let tagsArr = [];
            if(scenarioTagsRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){

                tagsArr=scenarioTagsRes.data.result;
                tagsMasterDD= tagsArr.map((item)=>({value:item.scenarioTagName,label:item.scenarioTagName}));
                
            }else if(scenarioTagsRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }

            this.setState({
                totalCount:totalCount,
                scenarioList:scenarioList,
                showLoader:false,
                componentDidMountFlag:true,
                showScenarioList:showScenarioList,
                apiSearchKey:this.state.scenarioNameSearchkey,
                projectDetails:projectDetails,
                tagsMasterDD:tagsMasterDD,

                showLoader:false,
                componentDidMountFlag:true
            })
        });
    }

    onChangePage = (page) => {
        // update state with new page of items
        if(page != this.state.currentPageNo){
            this.setState({
                showLoader:true,
            })

            fetch(Constants.ScenarioList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                    pageNo:page,
                    search: this.state.scenarioNameSearchkey,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
			        sortDir: this.state.sortDir,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        currentPageNo:page,
                        totalCount:data.data.count,
                        scenarioList:data.data.result,
                        showLoader:false,
                        apiSearchKey:this.state.scenarioNameSearchkey,
                    });
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        currentPageNo:page,
                        scenarioList:"",
                        totalCount:0,
                        showLoader:false,
                    });
                }
            });
        }
    }

    deleteScenario = () =>{
        let url = Constants.DeleteScenario;
        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    scenarioId:this.state.deleteEditScenarioId,
                    projectNo:this.state.project_id
                })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                this.setState(
                    {
                        deleteEditScenarioId:"",
                        showAlertDialog:false,
                        alertDialogMessage:""
                    },()=>{
                    //TODO- need to refresh scenario tags
                    this.initData();
                });
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                this.setState(
                    {
                        deleteEditScenarioId:"",
                        showAlertDialog:false,
                        alertDialogMessage:"",

                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    },()=>{
                    //TODO- need to refresh scenario tags
                    this.initData();
                });
            }
        });
    }

    onClickRunScenarios = () => {
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
                projectNo:this.state.project_id,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                let configArr = data.data?.result;
                let configArrNew = configArr.map((item)=>{
                    item.nameWithBrowser = item.name + "(" + 
                                            item.browsers + ", " + item.resolutions+ ")";
                    return item;
                })
                this.setState({
                    showLoader:false,
                    configArr:configArrNew,
                    showRunScenariosModal:true
                })
            }else{
                this.setState({
                    showLoader:false,
                    configArr:[],
                    showRunScenariosModal:true
                })
            }
        });
    }

    runScenariosApi = () => {
        //validation is required.
        let scenarioIds = [];
        let scenarioArr = Object.values(this.state.selectedScenarios)

        scenarioArr.forEach(item=>{
            let idsArr = Object.values(item);
            scenarioIds = [...scenarioIds,...idsArr]
        })

        fetch(Constants.RunScenarios,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                    {
                        email:userDetails.email,
                        accessToken:userDetails.accessToken,
                        projectNo:this.state.project_id,
                        scenarioIds:JSON.stringify(scenarioIds),
                        masterConfigId:this.state.selectedConfigId
                    })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.props.history.push('/projects/reports/'+this.state.project_id);
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    })
                }
            });

    }

    render(){
        const {projectDetails} = this.state;
        let actionArr = [];

        if(projectDetails.runTestCases === "Y"){
            actionArr.push({
                label:"Run",
                icon:<PlayCircle/>
            })
        }

        if(projectDetails.writeScenariosAndAction === "Y"){
            
            actionArr.push({
                label:"Clone",
                icon:<FileCopy/>
            },)
            
            actionArr.push({
                label:"Edit",
                icon:<EditAlt/>
            })

            actionArr.push({
                label:"Delete",
                icon:<Delete/>
            })
        }

        let checkBoxMainFlag = true;
        let selectedScenariosCount = 0;

        if(this.state.selectedScenarios["page_"+this.state.currentPageNo]){
            selectedScenariosCount = Object.keys(this.state.selectedScenarios["page_"+this.state.currentPageNo]).length;
        }

        if(selectedScenariosCount < this.state.scenarioList.length){
            checkBoxMainFlag = false;
        }

        if(selectedScenariosCount === 0 && this.state.scenarioList.length === 0){
            checkBoxMainFlag = false;
        }
        let start = this.state.resultSize*(this.state.currentPageNo - 1);

        let end = this.state.resultSize+start;

        if(end > this.state.totalCount){
            end = this.state.totalCount;
        }
        let fields = {text:"label",value:"value"}

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
                                title={projectDetails.title}
                                projectNo = {this.state.project_id}
                                projectDetails={projectDetails}
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
                                !(isEmptyArray(this.state.scenarioList) &&
                                isEmptyVariable(this.state.apiSearchKey) && isEmptyArray(this.state.tagsSelectedDD)) &&
                                this.state.showScenarioList &&
                                <CustomContainer>
                                    {
                                        // dont display when action and search key both are empty
                                        !(isEmptyVariable(this.state.scenarioList) &&
                                        isEmptyVariable(this.state.apiSearchKey) && isEmptyArray(this.state.tagsSelectedDD)) &&
                                        <CustomRow>
                                            <CustomCol md="9">
                                                <SearchLayout>
                                                    {
                                                        projectDetails.runTestCases === "Y" &&
                                                        <SelectionCheckboxWrapper>
                                                            <CheckboxLayout>
                                                                <InputFieldCheckBox 
                                                                    type="checkbox"
                                                                    name="checkboxmain"
                                                                    id="checkboxmain"
                                                                    onChange={this.handleCheckMain}
                                                                    checked={checkBoxMainFlag}
                                                                />
                                                                <CheckBoxDropDown 
                                                                    itemsArr = {Constants.SELECTION_DROPDOWN}
                                                                    name="label"
                                                                    onDropDownItemClick = {this.selectionDropdownClick}
                                                                    dropDownId = ""
                                                                />
                                                            </CheckboxLayout>
                                                        </SelectionCheckboxWrapper>
                                                    }

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
                                                            placeholder="Search Scenario Name"
                                                            name="scenarioNameSearchkey" 
                                                            onChange={this.handleChange} 
                                                            value={this.state.scenarioNameSearchkey}
                                                            onKeyPress={this.onEnterBtnPress}
                                                        />
                                                        <SearchIcon 
                                                            onClick = {this.searchScenarioName}
                                                        />
                                                    </FieldSetRoundSearch> 

                                                    <SelectTagsDropdownLayout>
                                                        <MultiSelectComponent 
                                                            id="tagsCheckbox"
                                                            dataSource={this.state.tagsMasterDD}
                                                            fields={fields}
                                                            placeholder={this.state.selectedTagPlaceholder} 
                                                            mode="CheckBox"
                                                            closePopupOnSelect={false}
                                                            allowFiltering={true}
                                                            select={this.addSelection}
                                                            removed={this.removeSelection}
                                                            cssClass="tagChecklist"
                                                            value={this.state.tagsSelectedDD}
                                                            showDropDownIcon={true}
                                                            showClearButton={false}
                                                        >
                                                            <Inject services={[CheckBoxSelection]} />
                                                        </MultiSelectComponent>
                                                        {/* <Select
                                                            isMulti
                                                            placeholder="Select tags"
                                                            value={this.state.tagsSelectedDD}
                                                            onChange={this.handleTagChange}
                                                            options={this.state.tagsMasterDD}
                                                            // styles={selectWithImageStyles}
                                                            // components={{
                                                            //     Option: IconOption,
                                                            //     SingleValue: SingleValueOption,
                                                            //     // Input: CustomInput,
                                                            //     DropdownIndicator: this.returnNullComponent,
                                                            //     IndicatorSeparator: this.returnNullComponent,
                                                            // }}
                                                        /> */}
                                                    </SelectTagsDropdownLayout>

                                                    <ClearSearchText onClick={this.resetFilters}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                                </SearchLayout>
                                            </CustomCol>
                                            <CustomCol md="3">
                                                {
                                                    projectDetails.writeScenariosAndAction === "Y" &&
                                                    <AddNewLayout> 
                                                        <AddNewBtn
                                                            onClick={this.handleShowAddScenario}
                                                            // href={Constants.CREATE_SCENARIO_PATH+"/"+this.state.project_id}
                                                        >Add New Scenario</AddNewBtn>
                                                    </AddNewLayout>
                                                }
                                            </CustomCol>
                                            {
                                                this.state.showTableRowCheckBox &&
                                                this.state.totalSelectionCount > 0 &&
                                                <CustomCol md="12">
                                                    <SelectionInfoLayout>
                                                        <SelectionInfoText>{this.state.totalSelectionCount+(this.state.totalSelectionCount === 1?" Scenario selected":" Scenarios selected")}</SelectionInfoText>
                                                        <RunScenarioBtn onClick={this.onClickRunScenarios}
                                                        as="button">{this.state.totalSelectionCount === 1?"Run Scenario":"Run Scenarios"}</RunScenarioBtn>
                                                    </SelectionInfoLayout>
                                                </CustomCol>
                                            }
                                        </CustomRow>
                                    }

                                    {
                                        !isEmptyArray(this.state.scenarioList) &&
                                        <TableCardLayout>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        {
                                                            this.state.showTableRowCheckBox &&
                                                            <th width="5%"></th>
                                                        }
                                                        <th className = "text-center" width="5%">No</th>
                                                        <th width="25%" onClick={this.sortTableLocal.bind(this, sortScenario)}>
                                                            <div className="sort-header">
                                                                Scenario Name
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortScenario ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width="20%" onClick={this.sortTableLocal.bind(this, sortScenarioFullname)}>
                                                            <div className="sort-header">
                                                                Created By
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortScenarioFullname ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortTag)}>
                                                            <div className="sort-header">
                                                                Tags
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortTag ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width="10%" onClick={this.sortTableLocal.bind(this, sortAction)} className = "text-center">
                                                            <div className="sort-header text-center">
                                                                Actions
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortAction ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width="10%" onClick={this.sortTableLocal.bind(this, sortTotalStepCount)} className = "text-center">
                                                            <div className="sort-header text-center">
                                                                Steps
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortTotalStepCount ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        {
                                                            !isEmptyArray(actionArr) &&
                                                            <th width="7%"></th>
                                                        }
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    !isEmptyVariable(this.state.scenarioList) &&
                                                    this.state.scenarioList.map((item,idx) => {
                                                        let flag = false;
                                                        if(this.state.selectedScenarios["page_"+this.state.currentPageNo]){
                                                            if(this.state.selectedScenarios["page_"+this.state.currentPageNo]["scenarioId_"+item.scenarioId]){
                                                                flag = true;
                                                            }
                                                        }
                                                        let scenarioTagsArr=[]
                                                        if(!isEmptyVariable(item.scenarioTags)){
                                                            try{
                                                                scenarioTagsArr = JSON.parse(item.scenarioTags);
                                                            }catch(e){
                                                                scenarioTagsArr=[];
                                                            }
                                                        }
                                                        return <tr>
                                                            {
                                                                this.state.showTableRowCheckBox &&
                                                                <td style={{lineHeight:1}}>
                                                                    <TableRowCheckBox 
                                                                        type="checkbox"
                                                                        name={""+item.scenarioId}
                                                                        id={""+item.scenarioId}
                                                                        onChange={this.handleCheck}
                                                                        checked={flag}
                                                                    />
                                                                </td>
                                                            }
                                                            <td className = "text-center">{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                            <td><TableAnchor href={Constants.SCENARIO_DETAILS_PATH+"/"+item.scenarioId}>{item.scenarioName}</TableAnchor></td>
                                                            <td>{item.fullName}</td>
                                                            {/* <td>{truncateString(item.scenarioDescription,100)}</td> */}

                                                            <td>
                                                            {
                                                                item.scenarioTags &&
                                                                scenarioTagsArr.map((scenarioItem)=>{
                                                                    return <ScenarioTags onClick={this.handleTagSelection.bind(this,scenarioItem)}>{scenarioItem}</ScenarioTags>
                                                                })
                                                                // <ScenarioTags>{JSON.parse(item.scenarioTags)}</ScenarioTags>
                                                            }
                                                            </td>
                                                            <td className = "text-center" style={{paddingRight:37}}>{item.actionCount}</td>
                                                            <td className = "text-center" style={{paddingRight:37}}>{item.totalStepCount}</td>
                                                            {
                                                                !isEmptyArray(actionArr) &&
                                                                <td>
                                                                    <TableDropDown 
                                                                        actionArr={actionArr}
                                                                        onClickDropDownItem={this.onClickItem}
                                                                        item={item.scenarioId}
                                                                    />
                                                                </td>
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
                                            this.state.totalCount > this.state.scenarioList.length && 
                                            <Pagination 
                                                totalLength ={this.state.totalCount} 
                                                items={this.state.scenarioList} 
                                                onChangePage={this.onChangePage} 
                                                currentPageNo = {this.state.currentPageNo}
                                                pageSize={this.state.resultSize}
                                                initialPage={this.state.currentPageNo}
                                            />
                                        }
                                        {
                                            this.state.totalCount <= this.state.scenarioList.length &&
                                            <div></div>
                                        }
                                        <PageCountSpan>
                                            {(start+1)+"-"+end+" of "+this.state.totalCount}
                                        </PageCountSpan>
                                    </FlexLayoutCenterJustified>

                                </CustomContainer>
                        }
                        {
                            !this.state.showScenarioList && this.state.showAddScenario &&
                            <AddScenario
                                projectId={this.state.project_id}
                                history={this.props.history}
                                hideAddEditScenario={this.hideAddEditScenario}
                                scenarioId={this.state.deleteEditScenarioId}
                                isEdit = {this.state.isEdit}
                            />
                        }
                        {
                            this.state.componentDidMountFlag && isEmptyArray(this.state.scenarioList) &&
                            this.state.showScenarioList &&
                            <CustomContainerEmptyLayout
                                paddingValue={isEmptyVariable(this.state.apiSearchKey) && isEmptyArray(this.state.tagsSelectedDD)?"25px":"0px 25px 25px"}
                            >
                                <EmptyCard>
                                    <CustomRow>
                                        <CustomCol md={12}>
                                            <CustomText>
                                            {
                                                isEmptyVariable(this.state.apiSearchKey) && isEmptyArray(this.state.tagsSelectedDD)?
                                                Constants.SCENARIOS_EMPTY_WARNING
                                                :
                                                Constants.SCENARIOS_EMPTY_SEARCH_WARNING
                                            }
                                            </CustomText>
                                            {
                                                isEmptyVariable(this.state.apiSearchKey) && isEmptyArray(this.state.tagsSelectedDD) &&
                                                <EmptyCardAddNewLayout>
                                                    <AddNewBtn onClick={this.handleShowAddScenario}
                                                    // href={Constants.CREATE_SCENARIO_PATH+"/"+this.state.project_id}
                                                    >Add New Scenario</AddNewBtn>
                                                </EmptyCardAddNewLayout>
                                            }
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
                            alertDialogHeading="Delete Scenario"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteScenario}
                            proceedBtnLabel={ Constants.SCENARIOS_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                        <BootstrapModal show={this.state.showRunScenariosModal} onHide={this.handleRunScenariosModalClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Run Scenarios</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h6>{this.state.totalSelectionCount+(this.state.totalSelectionCount === 1?" Scenario selected":" Scenarios selected")}</h6>
                                <FieldSet>
                                    <InputLabel>Select Config</InputLabel>
                                    <DropDownRegular 
                                        placeholder={this.state.selectedConfigName}
                                        itemsArr = {this.state.configArr}
                                        onDropDownItemClick = {this.configDropdownClick}
                                        dropDownId = {""}
                                        name={"nameWithBrowser"}
                                    />
                                    {
                                        !isEmptyVariable(this.state.configErrors.selectedConfig) &&
                                        <ErrorSpan>{this.state.configErrors.selectedConfig}</ErrorSpan>
                                    }
                                </FieldSet>
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleRunScenariosModalClose}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.runScenariosApi}
                                >Run Scenarios</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <CloneDialog
                            showCloneDialogFlag = {this.state.showCloneDialogFlag}
                            handleCloseCloneDialog = {this.handleCloseCloneDialog}
                            scenarioId = {this.state.deleteEditScenarioId}
                        />

                    </ScenarioSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Scenarios;