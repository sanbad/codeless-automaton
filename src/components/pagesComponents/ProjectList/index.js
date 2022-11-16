import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ProjectSection,MainContainer,TableCardLayout,BootstrapModal,CancelBtnDialog,
    SearchIcon,SaveBtn,FieldSetRoundSearch,InputFieldRoundSearch,
    AddNewLayout,LoaderLayout,SearchLayout,ClearSearchText,CustomText,EmptyCard,
    EmptyCardAddNewLayout,CustomContainerEmptyLayout} from './projectlist.style';
import {CustomContainer,ErrorSpan,Table,    
    TableAnchor,FieldSet,InputFieldBorder,InputLabel,TextareaFieldBorder,
    AddNewBtn,CustomRow,CustomCol, ArrowUpIcon,ArrowDownIcon, 
    FlexLayoutCenterJustified, PageCountSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import {getLocalStorageVariables,isEmptyVariable,isEmptyArray, sortTable} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
// import {ArchiveIn} from '@styled-icons/boxicons-solid/ArchiveIn';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../../commonComponents/pagination';
import SpinnerLoader from 'react-loader-spinner';
import AlertDialog from '../../commonComponents/AlertDialog';
import AlertInputDialog from '../../commonComponents/AlertInputDialog';
// import {ArrowUp} from '@styled-icons/bootstrap/ArrowUp';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

const userDetails  = getLocalStorageVariables();
const sortTitle  = "title";
const sortScenario  = "scenariosCount";
const sortAction  = "actionsCount";
const sortReport  = "reportsCount";
const sortTeamMembers  = "teamMembersCount";

class Projectlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            projectStatus:Constants.PROJECTS_STATUS_ACTIVE,
            showLoader:false,
            projects:[],
            totalCount:0,
            title:"",
            decription:"",
            errors:[],
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            project_id:"",
            searchProjectNameKey:"",
            apiSearchKey:"",
            componentDidMountFlag:false,
            sort: "",
			sortDir: "",

            deleteProjectId:"",
            showInputDialog:false,
            alertInputMessage:"",
            inputFieldDialog:"",
            inputDialogError:"",
            
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
        }
    }

    componentDidMount(){
        this.getProjectList();
    }
    
    /*******************API CALLS ****************/
    getProjectList()
    {
        this.setState({
            showLoader:true,
        });

        fetch(Constants.ProjectList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                pageNo:this.state.currentPageNo,
                title:this.state.searchProjectNameKey,
                status:this.state.projectStatus,
                resultsize: this.state.resultSize,
                sort: this.state.sort,
			    sortDir: this.state.sortDir,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    projects:data.data.result,
                    totalCount:data.data.count,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchProjectNameKey
                })
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                this.setState({
                    projects:"",
                    totalCount:0,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchProjectNameKey
                })
            }
        });
    }

    addProject = (e) =>{
        e.preventDefault();
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.title))
        {
            error_flag = true;
            errors['title'] = "Please enter project name!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if (error_flag) {
            this.setState({
                errors: errors
            });
        }
        else
        {
            fetch(Constants.AddProject,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    title:this.state.title,
                    description:this.state.description,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showAddProjectModal:false
                    },()=>{
                        this.getProjectList();
                    })
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        showAddProjectModal:false,
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    });
                }
            });
        }

    }

    onChangePage = (page) => {
        // update state with new page of items
        if(page != this.state.currentPageNo){
            this.setState({
                showLoader:true,
            })
            fetch(Constants.ProjectList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    pageNo:page,
                    title:this.state.searchProjectNameKey,
                    status:this.state.projectStatus,
                    resultsize: this.state.resultSize,
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
                        projects:data.data.result,
                        totalCount:data.data.count,
                        showLoader:false,
                        apiSearchKey:this.state.searchProjectNameKey
                    });
                }else if(data.responseCode ===  Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
                {
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        currentPageNo:page,
                        projects:"",
                        totalCount:0,
                        showLoader:false,
                        apiSearchKey:this.state.searchProjectNameKey
                    })
                }
            });
        }
    }

    editProject = (e) => {
        e.preventDefault();
        var error_flag = false;
        let errors = {};
        
        if(isEmptyVariable(this.state.title))
        {
            error_flag = true;
            errors['title'] = "Please enter project name!";
            setTimeout(function(){
                this.setState({errors:{}});
           }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }
      
        if (error_flag) {
            this.setState({
                errors: errors
            });
        }
        else
        {
            fetch(Constants.EditProject,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                    title:this.state.title,
                    description:this.state.description
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showAddProjectModal:false
                    },()=>{
                        this.getProjectList();
                    })
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        deleteProjectId:"",
                        showAddProjectModal:false,
                        showInputDialog:false,
                        alertInputMessage:"",
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    });
                }
            });
        }
    }

    openEditDialog = (projectItem) =>{
        this.setState({
            showAddProjectModal:true,
            title:projectItem.title,
            description:projectItem.description, 
            errors:[],
            isEdit:true,
            project_id:projectItem.projectNo,
        })
    }

    deleteProject = () =>{
        if(isEmptyVariable(this.state.inputFieldDialog))
        {
            this.setState({
                inputDialogError:"Please enter the password."
            },()=>{
                    setTimeout(function(){
                        this.setState({inputDialogError:""});
                }.bind(this),Constants.WRNG_MSG_TIMEOUT);
            });
        }
        else
        {
            fetch(Constants.DeleteProject,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                    {
                        email:userDetails.email,
                        accessToken:userDetails.accessToken,
                        projectNo:this.state.deleteProjectId,
                        password:this.state.inputFieldDialog
                    })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        deleteProjectId:"",
                        showInputDialog:false,
                        alertInputMessage:"",
                    },()=>{
                        this.getProjectList();
                    });
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        deleteProjectId:"",
                        showInputDialog:false,
                        alertInputMessage:"",
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    });
                }
            });
        }
    }

    /*******************API CALL ENDS ****************/

    resetSearch = () => {
        this.setState({
            currentPageNo: 1,
            searchProjectNameKey:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
        },()=>{
            this.getProjectList();
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
				this.getProjectList();
			}
		);
	};

    handleAddProjectClose = () => this.setState({showAddProjectModal:false});
    handleAddProjectShow = () => this.setState(
        {
            showAddProjectModal:true,
            title:'',
            description:'', 
            errors:[],
            isEdit:false,
            project_id:""
        });


    onClickItem = (label,item) =>{
        if(label === "Edit"){
            this.openEditDialog(item);
        }
        else if(label === "Delete"){
            this.openPasswordDialog(item);
        }
    }

    openPasswordDialog = (projectItem) =>{
        this.setState(
        {
            deleteProjectId:projectItem.projectNo,
            showInputDialog:true,
            alertInputMessage:Constants.PROJECTS_DELETE_WARNING +projectItem.title+"?",
            inputDialogError:"",
            inputFieldDialog:""
        });
    }

    handleInputDialogClose = () =>{
        this.setState(
        {
            deleteProjectId:"",
            showInputDialog:false,
            alertInputMessage:"",
            inputDialogError:"",
            inputFieldDialog:""
        });
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

    searchProjectName = () => {
        if(!isEmptyVariable(this.state.searchProjectNameKey)){
            this.setState({currentPageNo:1},()=>{
                this.getProjectList();
            });
        }
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.searchProjectNameKey)){
                this.setState({currentPageNo:1},()=>{
                    this.getProjectList();
                });
            }
        }
    }

    resultSizeDropdownClick = (item, selectedIndex) => {
		this.setState({
            currentPageNo:1,
            resultSize: item.label,
            resultSizePlaceholder: item.label,
        },() => {
            this.getProjectList();
        });
	};

    render(){
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

                    <ProjectSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar
                                title="Projects"
                            />
                            {
                                this.state.showLoader &&
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }
                            {
                                // Need to check component did mount flag, other wise until api is called,
                                // it shows no items found flag. Also check if both projects and search key are
                                //empty, other wise empty space with padding will be displayed.
                                this.state.componentDidMountFlag &&
                                !(isEmptyArray(this.state.projects) &&
                                isEmptyVariable(this.state.apiSearchKey)) &&
                                <CustomContainer>
                                    {
                                        // dont display when action and search key both are empty
                                        !(isEmptyVariable(this.state.projects) &&
                                        isEmptyVariable(this.state.apiSearchKey)) &&
                                        <CustomRow>
                                            <CustomCol md={6}>
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
                                                            placeholder="Search Project Name"
                                                            name="searchProjectNameKey" 
                                                            onChange={this.handleChange} 
                                                            value={this.state.searchProjectNameKey}
                                                            onKeyPress={this.onEnterBtnPress}
                                                        />
                                                        <SearchIcon 
                                                            onClick = {this.searchProjectName}
                                                        />
                                                    </FieldSetRoundSearch> 
                                                    <ClearSearchText onClick={this.resetSearch}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                                </SearchLayout>
                                            </CustomCol> 
                                                <CustomCol md={3}>
                                                </CustomCol> 
                                                <CustomCol md={3}>
                                                    {
                                                        userDetails.userType === Constants.USER_TYPE_OWNER &&
                                                        <AddNewLayout>
                                                            <AddNewBtn
                                                                as="button"
                                                                onClick = {this.handleAddProjectShow}
                                                                >Add New Project</AddNewBtn>
                                                        </AddNewLayout>
                                                    }
                                            </CustomCol>
                                        </CustomRow>
                                    }
                                    {
                                        !isEmptyArray(this.state.projects) &&
                                        <TableCardLayout>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th width="5%">No</th>
                                                        <th width="40%" onClick={this.sortTableLocal.bind(this, sortTitle)}>
                                                            <div className="sort-header">
                                                                Project Name
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortTitle ? "" : "hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortScenario)}>
                                                            <div className="sort-header">
                                                                Scenarios
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortScenario ? "" : "hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortAction)}>
                                                            <div className="sort-header">
                                                                Actions
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortAction ? "" : "hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortReport)}>
                                                            <div className="sort-header">
                                                                Reports
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortReport ? "" : "hide-sort-arrow"
                                                                    }
                                                                >
                                                                    {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                                </span>
                                                            </div>
                                                        </th>
                                                        <th onClick={this.sortTableLocal.bind(this, sortTeamMembers)}>
                                                            <div className="sort-header">
                                                                Team
                                                                <span
                                                                    className={
                                                                        this.state.sort === sortTeamMembers ? "" : "hide-sort-arrow"
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
                                                        !isEmptyVariable(this.state.projects) &&
                                                        this.state.projects.map((item,idx) => {
                                                            let actionArr = [];

                                                            let objEdit =  {
                                                                label:"Edit",
                                                                icon:<EditAlt/>
                                                            };

                                                            let objDelete =  {
                                                                label:"Delete",
                                                                icon:<Delete/>
                                                            };

                                                            actionArr.push(objEdit);
                                                            actionArr.push(objDelete);
                                                            
                                                            // if(item.projectStatus === Constants.PROJECTS_STATUS_VIEWONLY)
                                                            // {
                                                            //     actionArr.push(objDetails);
                                                            // }
                                                            // else
                                                            // {
                                                            //     actionArr.push(objEdit);
                                                            //     actionArr.push(objDelete);
                                                            // }
                                                            return <tr>
                                                                {/* <td>{((this.state.currentPageNo - 1) * Constants.RESULT_SIZE_PAGINATION) + (++idx)}</td> */}
                                                                <td className="text-center">{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                                <td><TableAnchor href={Constants.SCENARIO_LISTING_PATH+"/"+item.projectNo} >
                                                                    {item.title}</TableAnchor>
                                                                </td>
                                                                <td>{item.scenariosCount}</td>
                                                                <td>{item.actionsCount}</td>
                                                                <td>{item.reportsCount}</td>
                                                                <td>{item.teamMembersCount}</td>
                                                                {
                                                                    userDetails.userType === Constants.USER_TYPE_OWNER &&
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
                                            this.state.totalCount > this.state.projects.length &&
                                            <Pagination 
                                                totalLength ={this.state.totalCount} 
                                                items={this.state.projects} 
                                                onChangePage={this.onChangePage} 
                                                pageSize={this.state.resultSize}
                                                initialPage={this.state.currentPageNo}
                                                currentPageNo = {this.state.currentPageNo} />
                                        }
                                        {
                                            this.state.totalCount <= this.state.projects.length &&
                                            <div></div>
                                        }
                                        <PageCountSpan>
                                            {(start+1)+"-"+end+" of "+this.state.totalCount}
                                        </PageCountSpan>
                                    </FlexLayoutCenterJustified>
                                    

                                </CustomContainer>
                            }
                            {
                                this.state.componentDidMountFlag && isEmptyArray(this.state.projects) &&
                                <CustomContainerEmptyLayout
                                    paddingValue={isEmptyVariable(this.state.apiSearchKey)?"25px":"0px 25px 25px"}
                                >
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey)?
                                                    Constants.PROJECTS_EMPTY_WARNING
                                                    :
                                                    Constants.PROJECTS_EMPTY_SEARCH_WARNING
                                                }
                                                </CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey) &&
                                                    <EmptyCardAddNewLayout>
                                                        <AddNewBtn
                                                        as="button"
                                                        onClick = {this.handleAddProjectShow}
                                                        >Add New Project</AddNewBtn>
                                                    </EmptyCardAddNewLayout>
                                                }
                                            </CustomCol>
                                        </CustomRow>
                                    </EmptyCard>
                                </CustomContainerEmptyLayout>
                            }
                        </MainContainer>

                         {/* Add/Edit Element Dialog */}
                        <BootstrapModal show={this.state.showAddProjectModal} onHide={this.handleAddProjectClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{this.state.isEdit?"Edit":"Add"} Project</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FieldSet>
                                    <InputLabel>Project Name*</InputLabel>
                                    <InputFieldBorder 
                                        placeholder="Project Name"
                                        name="title"
                                        onChange={this.handleChange}
                                        value={this.state.title}
                                    />
                                    <ErrorSpan>{this.state.errors.title}</ErrorSpan>
                                </FieldSet>
                                <FieldSet>
                                    <InputLabel>Description</InputLabel>
                                    <TextareaFieldBorder 
                                        placeholder="Description"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.description}
                                    />
                                    <ErrorSpan>{this.state.errors.description}</ErrorSpan>
                                </FieldSet>
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleAddProjectClose}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.state.isEdit?this.editProject:this.addProject}
                                >Save Project</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <AlertInputDialog 
                            showAlertDialog={this.state.showInputDialog}
                            handleAlertDialogClose={this.handleInputDialogClose}
                            alertDialogHeading={Constants.PROJECTS_DELETE_HEADING}
                            alertDialogMessage={this.state.alertInputMessage}
                            alertDialogInputLabel={Constants.ALERT_TYPE_PASSWORD}
                            handleChange = {this.handleChange}
                            inputFieldValue = {this.state.inputFieldDialog}
                            errorSpan = {this.state.inputDialogError}
                            proceedBtnClick={this.deleteProject}
                            proceedBtnLabel={ Constants.PROJECTS_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />
                        
                    </ProjectSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Projectlist;