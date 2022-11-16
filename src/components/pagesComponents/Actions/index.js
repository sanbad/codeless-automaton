import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ActionSection,MainContainer,LoaderLayout,TableCardLayout,
    TableCard,SearchIcon,AddNewLayout,FieldSetRoundSearch,InputFieldRoundSearch,
    SearchLayout,ClearSearchText,CustomText,EmptyCard,CustomContainerEmptyLayout,SelectTagsDropdownLayout,
    EmptyCardAddNewLayout,ActionTags} from './actions.style';
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import {CustomContainer,CardHeadingLayout,
    CardHeading,Table,     TableAnchor,CustomRow,CustomCol,
    AddNewBtn,ArrowUpIcon,ArrowDownIcon, FlexLayoutCenterJustified, PageCountSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import AlertDialog from '../../commonComponents/AlertDialog'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import {getLocalStorageVariables,isEmptyVariable,sortTable,truncateString,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {FileCopy} from '@styled-icons/remix-fill/FileCopy';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import Pagination from '../../commonComponents/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpinnerLoader from 'react-loader-spinner';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import AddAction from "../AddAction";
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-react-dropdowns/styles/material.css";

const actionArr = [
    {
        label:"Clone",
        onClick:"",
        icon:<FileCopy/>
    },
    {
        label:"Edit",
        onClick:"",
        icon:<EditAlt/>
    },
    {
        label:"Delete",
        onClick:"",
        icon:<Delete/>
    },
];

const userDetails  = getLocalStorageVariables();

const sortAction  = "actionName";
const sortSteps  = "stepCount";
const sortActionUseCount  = "actionUseCount";
const sortActionFullname  = "fullName";
const sortTag  = "actionTags";
// Sample Tags 
const tagPlaceholder= "Select Tags";

class Actions extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            projectId:this.props.match.params.id,
            projectDetails:{},
            showLoader:false,
            actions:"",
            totalCount:0,
            actionNameSearchkey:"",
            apiSearchKey:"",
            projectName:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            sort: "",
			sortDir: "",

            showAlertDialog:false,
            alertDialogMessage:"",
            copyEditDeleteActionId:"",
            operationType:"",
            componentDidMountFlag:false,

            showActionsList:false,
            isEdit:false,
            showAddAction:false,

            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",

            tagsMasterDD: [],
			tagsSelectedDD: [],
            selectedTagPlaceholder:tagPlaceholder
        }
    }

    componentDidMount(){
        // this.getActionList();
        this.initData();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.actionNameSearchkey)){
                this.setState({currentPageNo:1},()=>{
                    this.getActionList();
                });
            }
        }
    }

    searchActionName = () => {
        if(!isEmptyVariable(this.state.actionNameSearchkey)){
            this.setState({currentPageNo:1},()=>{
                this.getActionList();
            });
        }
    }

    resetSearch = () => {
        this.setState({
            currentPageNo: 1,
            actionNameSearchkey:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            tagsSelectedDD:[]
        },()=>{
            this.getActionList();
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
				this.getActionList();
			}
		);
	};

    onClickItem = (label,item) =>{
        if(label === "Clone"){
            this.openCopyDialog(item,label);
        }
        else if(label === "Edit"){
            this.setState({
                showActionsList: false,
                showAddAction: true,
                isEdit:true,
                copyEditDeleteActionId:item.actionId
            });
        }
        else if(label === "Delete"){
            this.openDeleteDialog(item,label);
        }
    }

    openCopyDialog =(item,label)=>{
        this.setState(
        {
            operationType:label,
            copyEditDeleteActionId:item.actionId,
            showAlertDialog:true,
            alertDialogMessage:"Are you sure you want to copy "+item.actionName+"?"
        });
    }

    openDeleteDialog =(item,label)=>{
        this.setState(
        {
            operationType:label,
            copyEditDeleteActionId:item.actionId,
            showAlertDialog:true,
            alertDialogMessage:"Are you sure you want to delete "+item.actionName+"?"
        });
    }

    handleAlertDialogClose = () =>{
        this.setState({
            copyEditDeleteActionId:"",
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }

    handleAlertDialogCloseInfo = () => {
        this.setState({
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        })
    }

    sortTableLocal = (sortColumn) => {
		let sortObj = sortTable(sortColumn, this.state.sort, this.state.sortDir);

		this.setState(
			{
				sort: sortObj.sortTemp,
				sortDir: sortObj.sortDirTemp,
			},
			() => {
				this.getActionList();
			}
		);
	};

    handleShowAddAction = () =>{
        this.setState({
            showActionsList: false,
            showAddAction:true,
        }) 
    }

    handleHideAddEditAction = (refreshFlag)=>{
        this.setState({
            showActionsList: true,
            isEdit:false,
            showAddAction:false,
            copyEditDeleteActionId:""
            
        },()=>{
            if(refreshFlag){
                this.initData();
            }
        });
    }

    addSelection = (args) => {
        // console.log(this.state.tagsSelectedDD);
        if(!isEmptyVariable(args.itemData.value))
        {
            this.state.tagsSelectedDD.push(args.itemData.value)
        }
        this.setState({
            tagsSelectedDD:this.state.tagsSelectedDD,
        },()=>{
            this.getActionList();
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
            this.getActionList();
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
            this.getActionList();
        })
    }


    /********************** API CALLS ***********************/
    initData = () => {
        this.setState({
            showLoader:true,
        });

        Promise.all([
            fetch(Constants.ActionList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    pageNo:this.state.currentPageNo,
                    actionName: this.state.actionNameSearchkey,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
                    sortDir: this.state.sortDir,
                    tags:this.state.tagsSelectedDD
                    
                })
            }),
            fetch(Constants.GetProjectActionTags,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                })
            })
            
        ])
        .then(([actionRes,actionTagsRes]) => { 
            return Promise.all([actionRes.json(),actionTagsRes.json()]) 
        })
        .then(([actionRes,actionTagsRes]) => {
            let actions="";
            let totalCount=0;
            let showActionsList= false;
            let projectDetails = "";

            if(actionRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                totalCount = actionRes.data.count;
                actions =actionRes.data.result;
                projectDetails =actionRes.data.projectDetails;
                showActionsList=true;
            }else if(actionRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                //TODO - Show Alert Dialog or Error Message on the screen
            }

            let tagsMasterDD = [];
            let tagsArr = [];
            if(actionTagsRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){

                tagsArr=actionTagsRes.data.result;
                tagsMasterDD= tagsArr.map((item)=>({value:item.actionTagName,label:item.actionTagName}));
                
            }else if(actionTagsRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }

            this.setState({
                totalCount:totalCount,
                actions:actions,
                showActionsList:showActionsList,
                apiSearchKey:this.state.actionNameSearchkey,
                projectDetails:projectDetails,
                tagsMasterDD:tagsMasterDD,

                showLoader:false,
                componentDidMountFlag:true
            })
        });
    }
    getActionList()
    {
        this.setState({
            showLoader:true,
        });

        // //TODO
        // let tagsMasterDD = [];
        // let tagsSelectedDD = [];
        // // set tags select dropdown
        // if (!isEmptyArray(sampleTagsMasterDD)) {
        //     tagsMasterDD = sampleTagsMasterDD.map((item) => ({ value: item, label: item }));
        //     console.log(tagsMasterDD);
        // }

        fetch(Constants.ActionList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                pageNo:this.state.currentPageNo,
                actionName: this.state.actionNameSearchkey,
                resultsize:this.state.resultSize,
                sort: this.state.sort,
                sortDir: this.state.sortDir,
                tags:this.state.tagsSelectedDD
                
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
                this.setState({
                    actions:data.data.result,
                    totalCount:data.data.count,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.actionNameSearchkey,
                    projectName:data.title,
                    showActionsList:true,
                    projectDetails:data.data.projectDetails,
                    
                    // tagsMasterDD:tagsMasterDD,
                })
            }else{
                this.setState({
                    actions:"",
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.actionNameSearchkey,
                    showActionsList:false,
                })
            }
        });
    }


    onChangePage = (page) => {
        // update state with new page of items
        if(page !== this.state.currentPageNo){
            fetch(Constants.ActionList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                    {
                        email:userDetails.email,
                        accessToken:userDetails.accessToken,
                        projectNo:this.state.projectId,
                        pageNo:page,
                        actionName: this.state.actionNameSearchkey,
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
                        actions:data.data.result,
                        totalCount:data.data.count,
                    });
                }else{
                    
                }
            });
        }
    }

    copyDeleteAction = () =>{
        let url = "";

        if(this.state.operationType === "Clone")
        {
            url = Constants.Copyaction;
        }
        else if(this.state.operationType === "Delete")
        {
            url = Constants.Deleteaction;
        }

        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    actionId:this.state.copyEditDeleteActionId,
                    projectNo:this.state.projectId,
                })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState(
                {
                    copyEditDeleteActionId:"",
                    showAlertDialog:false,
                    alertDialogMessage:""
                },()=>{
                    this.initData();
                });
            } else {
                this.setState(
                {
                    copyEditDeleteActionId:"",
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

                    <ActionSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                showLeftMenu={true}
                                title={projectDetails.title}
                                projectNo={this.state.projectId}
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
                                // it shows no items found flag.
                                this.state.componentDidMountFlag &&
                                this.state.showActionsList &&
                                !(isEmptyArray(this.state.actions) &&
                                isEmptyVariable(this.state.apiSearchKey)  && isEmptyArray(this.state.tagsSelectedDD)) &&
                                <CustomContainer>
                                    {
                                        // dont display when action and search key both are empty
                                        !(isEmptyVariable(this.state.actions) &&
                                        isEmptyVariable(this.state.apiSearchKey) && isEmptyArray(this.state.tagsSelectedDD)) &&
                                        <CustomRow>
                                            <CustomCol md="9">
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
                                                            placeholder="Search Action Name"
                                                            name="actionNameSearchkey" 
                                                            onChange={this.handleChange} 
                                                            value={this.state.actionNameSearchkey}
                                                            onKeyPress={this.onEnterBtnPress}
                                                        />
                                                        <SearchIcon 
                                                            onClick = {this.searchActionName}
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
                                                    </SelectTagsDropdownLayout>

                                                    <ClearSearchText onClick={this.resetSearch}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                                </SearchLayout>
                                            </CustomCol>
                                            
                                            <CustomCol md="3">
                                            {
                                                projectDetails.writeScenariosAndAction === "Y" &&
                                                <AddNewLayout>
                                                    <AddNewBtn
                                                        onClick={this.handleShowAddAction}
                                                        // href={Constants.CREATE_ACTION_PATH+"/"+this.state.projectId}
                                                    >Add New Action</AddNewBtn>
                                                </AddNewLayout>
                                            }
                                            </CustomCol>
                                        </CustomRow>
                                    }
                                    {
                                        !isEmptyArray(this.state.actions) &&
                                        <TableCardLayout>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th width={"5%"} className="text-center">No</th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortAction)}>
                                                            <div className="sort-header">
                                                                Name
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortAction ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortActionFullname)}>
                                                            <div className="sort-header">
                                                                Created By
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortActionFullname ? "material-icons" : "material-icons hide-sort-arrow"
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
                                                        <th width={"7%"} onClick={this.sortTableLocal.bind(this, sortSteps)} className="text-center">
                                                            <div className="sort-header text-center">
                                                                Steps
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortSteps ? "material-icons" : "material-icons hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th width={"7%"} onClick={this.sortTableLocal.bind(this, sortActionUseCount)} className="text-center">
                                                            <div className="sort-header text-center">
                                                                Usage
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortActionUseCount ? "material-icons" : "material-icons hide-sort-arrow"
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
                                                    !isEmptyVariable(this.state.actions) &&
                                                    this.state.actions.map((item,idx) => {
                                                        let actionTagsArr=[];
                                                        if(!isEmptyVariable(item.actionTags)){
                                                            try{
                                                                actionTagsArr = JSON.parse(item.actionTags);
                                                            }catch(e){
                                                                actionTagsArr=[]
                                                            }
                                                        }
                                                        return <tr>
                                                            <td className="text-center">{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                            <td><TableAnchor href={Constants.ACTION_DETAILS_PATH+"/"+item.actionId}>{item.actionName}</TableAnchor></td>
                                                            <td>{item.fullName}</td>
                                                            {/* <td>{truncateString(item.description,100)}</td> */}
                                                            <td>
                                                                {
                                                                    item.actionTags &&
                                                                    actionTagsArr.map((actionItem)=>{
                                                                        return <ActionTags onClick={this.handleTagSelection.bind(this,actionItem)}>{actionItem}</ActionTags>
                                                                    })
                                                                }
                                                            </td>

                                                            <td className="text-center"
                                                            style={{paddingRight:37}}>{item.stepCount}</td>

                                                            <td className="text-center"
                                                            style={{paddingRight:37}}>{item.actionUseCount}</td>
                                                            {
                                                                projectDetails.writeScenariosAndAction === "Y" &&
                                                                <td><TableDropDown 
                                                                actionArr={actionArr}
                                                                onClickDropDownItem={this.onClickItem}
                                                                item={item}
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
                                            this.state.totalCount > this.state.actions.length && 
                                            <Pagination 
                                                totalLength ={this.state.totalCount} 
                                                items={this.state.actions} 
                                                onChangePage={this.onChangePage} 
                                                currentPageNo = {this.state.currentPageNo} 
                                                pageSize={this.state.resultSize}
                                                initialPage={this.state.currentPageNo} />
                                        }
                                        {
                                            this.state.totalCount <= this.state.actions.length &&
                                            <div></div>
                                        }
                                        <PageCountSpan>
                                            {(start+1)+"-"+end+" of "+this.state.totalCount}
                                        </PageCountSpan>
                                    </FlexLayoutCenterJustified>

                                </CustomContainer>
                            }
                            {
                                !this.state.showActionsList && this.state.showAddAction &&
                                <AddAction
                                    projectId={this.state.projectId}
                                    history={this.props.history}
                                    handleHideAddEditAction={this.handleHideAddEditAction}
                                    actionId={this.state.copyEditDeleteActionId}
                                    isEdit = {this.state.isEdit}
                                />
                            }
                            {
                                this.state.componentDidMountFlag && isEmptyArray(this.state.actions) &&
                                this.state.showActionsList &&
                                <CustomContainerEmptyLayout
                                    paddingValue={isEmptyVariable(this.state.apiSearchKey) && isEmptyArray(this.state.tagsSelectedDD)?"25px":"0px 25px 25px"}
                                >
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey)  && isEmptyArray(this.state.tagsSelectedDD)?
                                                    Constants.ACTIONS_EMPTY_WARNING
                                                    :
                                                    Constants.ACTIONS_EMPTY_SEARCH_WARNING
                                                }
                                                </CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey)  && isEmptyArray(this.state.tagsSelectedDD) &&
                                                    <EmptyCardAddNewLayout>
                                                        <AddNewBtn
                                                        onClick={this.handleShowAddAction}
                                                        // href={Constants.CREATE_ACTION_PATH+"/"+this.state.projectId}
                                                        >Add New Action</AddNewBtn>
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
                            type={
                                (this.state.operationType === "Delete")
                                ?
                                Constants.ALERT_TYPE_WARNING
                                :
                                Constants.ALERT_TYPE_INFO
                            }
                            alertDialogHeading={
                                (this.state.operationType === "Delete")
                                ?
                                "Delete Action"
                                :
                                "Clone Action"
                            }
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.copyDeleteAction}
                            proceedBtnLabel={
                                (this.state.operationType === "Delete")
                                ?
                                Constants.ACTIONS_DELETE_BUTTON
                                :
                                Constants.ACTIONS_COPY_BUTTON
                            }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                    </ActionSection>
                </div>
            </Router>
        );
    
    }
}

export default Actions;