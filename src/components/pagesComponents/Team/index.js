import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {TeamSection,MainContainer,CardOuterLayout,TeamMemberLayout,MemberDetailsLayout,TopLayout,
    MemberDetailsTextLayout,TableDetails,TableRow, TableData,PrivilegeSingleLayout,
    TeamCard,ProfileImage,TextLayout,TableText,AddNewLayout,CheckSpan,CrossSpan,
    ActionButtonsLayout,ActionButton,EditIcon,DeleteIcon,ActionButtonText,
    InputLabelEmail,InputFieldCheckBox,CheckBoxLabel,CheckboxLayout,StatusSpan,
    BootstrapModal,CancelBtnDialog,SaveBtn,FormHeading,LoaderLayout,PrivilegeText,
    SearchLayout,FieldSetRoundSearch,InputFieldRoundSearch,ClearSearchText,SearchIcon
} from './teams.style';
import {CustomContainer,CardHeadingLayout,FieldSetRound,InputFieldRound,ErrorSpan,
    CardHeading,Table,     FieldSet,InputFieldBorder,InputLabel,
    AddNewBtn,CustomRow,CustomCol,ArrowUpIcon,ArrowDownIcon,} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import DropDownRegular from '../../commonComponents/DropDownRegularV2'
import {getLocalStorageVariables,isEmptyVariable,ifEmptyReturnNA,sortTable} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertDialog from '../../commonComponents/AlertDialog';
import TableDropDown from '../../commonComponents/TableDropDown';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import SpinnerLoader from 'react-loader-spinner';
import Pagination from '../../commonComponents/pagination';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
let userDetails  = getLocalStorageVariables();
class Team extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo:1,
            projectId:this.props.match.params.id,
            projectName:"",
            projectDetails:{},
            showLoader:false,
            projectUsers:"",
            componentDidMountFlag:false,
            showAddProjectUserModal:false,
            searchUserNameKey:"",
            apiSearchKey:"",
            sortDir:"desc",

            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,


            email:"",
            writeScenariosAndAction:"",
            createNewConfig:"",
            runTestCases:"",
            viewReports:"",
            errors:"",

            isEdit:false,
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
            projectUserId:"",
            
            otherUsersArr:"",
            otherUsersDDPlaceholder:"Select User",
        }
    }

    componentDidMount()
    {
        this.setState({
            showLoader:true,
        });
        this.getProjectUsers();
    }

    handleProjectUserDialog = (e)=>{
        this.getProjectUsersMasterData();

        // this.setState({
        //     showAddProjectUserModal:true,
        //     email:"",
        //     writeScenariosAndAction:"",
        //     createNewConfig:"",
        //     runTestCases:"",
        //     viewReports:"",
        //     errors:"",
        //     isEdit:false,
        // });
    }

    handleCloseProjectUserDialog = (e)=>{
        this.setState({
            showAddProjectUserModal:false,
            otherUsersDDPlaceholder:"",
            email:"",

        });
    }

    handleAlertDialogCloseInfo = () => {
        this.setState({
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.searchUserNameKey)){
                this.setState({currentPageNo:1},()=>{
                    this.getProjectUsers();
                });
            }
        }
    }

    searchUserName = () => {
        if(!isEmptyVariable(this.state.searchUserNameKey)){
            this.setState({currentPageNo:1},()=>{
                this.getProjectUsers();
            });
        }
    }

    resetFilters = () => {
        this.setState({
            currentPageNo: 1,
            searchUserNameKey:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
        },()=>{
            this.getProjectUsers();
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
				this.getProjectUsers();
			}
		);
	};

    handleCheck = (e) =>{
        let isChecked = e.target.checked;
        let name = e.target.name;

        if(isChecked){
            this.setState({ [name]: "Y" });
        }else{
            this.setState({ [name]: "" });
        }
    }

    editUser = (item) => {
        console.log(item)
        this.setState({
            showAddProjectUserModal:true,
            isEdit:true,
            projectUserId:item.projectUserId,
            errors:"",
            email:item.email,
            writeScenariosAndAction:item.writeScenariosAndAction,
            createNewConfig:item.createNewConfig,
            runTestCases:item.runTestCases,
            viewReports:item.viewReports,
            otherUsersDDPlaceholder:item.firstName+ " ("+item.email +")"
        });
    }

    deleteUser = (item) => {
        this.openDeleteDialog(item);
    }

    openDeleteDialog = (projectUserId) => {
        this.setState(
        {
            projectUserId:projectUserId,
            showAlertDialog:true,
            alertDialogMessage:Constants.PROJECT_USER_DELETE_WARNING
        });
    }

    handleAlertDialogClose = () =>{
        this.setState(
        {
            projectUserId:"",
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }
    onUserDropDownItemClick = (item) => {
        console.log("clcik",item);
        this.setState({
            otherUsersDDPlaceholder:item.displayName,
            email:item.email
        })
    }

    /************************API CALLS**************************/
    getProjectUsers()
    {
        userDetails  = getLocalStorageVariables();

        fetch(Constants.ListProjectUsers,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                search:this.state.searchUserNameKey,
                pageNo: this.state.currentPageNo,
                sortDir:this.state.sortDir,
                resultsize:this.state.resultSize
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
                    projectUsers:data.data.result,
                    componentDidMountFlag:true,
                    showLoader:false,
                    projectDetails:data.data.projectDetails,
                    apiSearchKey:this.state.searchUserNameKey,
                    totalCount:data.data.count,
                })
            }else{
                this.setState({
                    projectUsers:"",
                    totalCount:0,
                    componentDidMountFlag:true,
                    showLoader:false,
                    apiSearchKey:this.state.searchUserNameKey
                })
            }
        });
    }

    getProjectUsersMasterData = () => {
        userDetails  = getLocalStorageVariables();

        fetch(Constants.AddUserToProjectMasterData,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            let otherUsersArr = [];
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                otherUsersArr = data.data.result;

                otherUsersArr.forEach((item)=>{
                    let displayName=item.firstName+ " ("+item.email +")";
                    item['displayName']=displayName;
                });

                this.setState({
                    otherUsersArr:otherUsersArr,
                    showAddProjectUserModal:true,
                    email:"",
                    writeScenariosAndAction:"",
                    createNewConfig:"",
                    runTestCases:"",
                    viewReports:"",
                    errors:"",
                    isEdit:false,
                    componentDidMountFlag:true,
                    showLoader:false,
                    otherUsersDDPlaceholder:"Select User",
                })
            }else{
                this.setState({
                    otherUsersArr:"",
                    showAddProjectUserModal:false,
                    email:"",
                    writeScenariosAndAction:"",
                    createNewConfig:"",
                    runTestCases:"",
                    viewReports:"",
                    errors:"",
                    isEdit:false,
                    componentDidMountFlag:true,
                    showLoader:false,
                })
            }
        });
    }

    onChangePage = (page) => {

        // update state with new page of items
        if(page != this.state.currentPageNo){
            userDetails  = getLocalStorageVariables();
            this.setState({
                showLoader:true,
            })
            fetch(Constants.ListProjectUsers,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    search:this.state.searchUserNameKey,
                    pageNo: page,
                    sortDir:this.state.sortDir,
                    resultsize:this.state.resultSize

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
                        projectUsers:data.data.result,
                        totalCount:data.data.count,
                        showLoader:false,

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

    editProjectUser = (e) =>{
        e.preventDefault();
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.email))
        {
            error_flag = true;
            errors['email'] = "Please enter email";
        }
        if(isEmptyVariable(this.state.writeScenariosAndAction) &&
            isEmptyVariable(this.state.createNewConfig) &&
            isEmptyVariable(this.state.runTestCases) &&
            isEmptyVariable(this.state.viewReports)){
            error_flag = true;
            errors['privileges'] = "Please select atleast one privilege!";
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
            userDetails  = getLocalStorageVariables();

            fetch(Constants.EditProjectUser,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    writeScenariosAndAction:this.state.writeScenariosAndAction,
                    // createNewConfig:this.state.createNewConfig,
                    runTestCases:this.state.runTestCases,
                    viewReports:this.state.viewReports,
                    projectUserId:this.state.projectUserId
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
                        email:"",
                        errors:"",
                        writeScenariosAndAction:"",
                        createNewConfig:"",
                        runTestCases:"",
                        viewReports:"",
                        showAlertDialogInfo:false,
                        alertDialogMessageInfo:"",
                        projectUserId:"",
                        isEdit:false,
                        showAddProjectUserModal:false,
                        otherUsersDDPlaceholder:"",
                    },()=>{
                        this.getProjectUsers();
                    });
                }
                else
                {
                    this.setState({
                        showAddProjectUserModal:false,
                        projectUserId:"",
                        email:"",
                        errors:"",
                        writeScenariosAndAction:"",
                        createNewConfig:"",
                        runTestCases:"",
                        viewReports:"",
                        isEdit:false,
                        otherUsersDDPlaceholder:"",

                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage,
                    });
                }
            });
        }
    }

    addProjectUser = (e) =>{
        e.preventDefault();
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.email))
        {
            error_flag = true;
            errors['email'] = "Please enter email!";
        }
        if(
            isEmptyVariable(this.state.writeScenariosAndAction) &&
            isEmptyVariable(this.state.createNewConfig) &&
            isEmptyVariable(this.state.runTestCases) &&
            isEmptyVariable(this.state.viewReports)
            )
        {
            error_flag = true;
            errors['privileges'] = "Please select atleast one privilege!";
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
            userDetails  = getLocalStorageVariables();
            fetch(Constants.AddProjectUser,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    teamMemberEmail:this.state.email,
                    writeScenariosAndAction:this.state.writeScenariosAndAction,
                    // createNewConfig:this.state.createNewConfig,
                    runTestCases:this.state.runTestCases,
                    viewReports:this.state.viewReports,
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
                        email:"",
                        errors:"",
                        writeScenariosAndAction:"",
                        createNewConfig:"",
                        runTestCases:"",
                        viewReports:"",
                        showAlertDialogInfo:false,
                        alertDialogMessageInfo:"",
                        showAddProjectUserModal:false,
                        otherUsersDDPlaceholder:"",
                    },()=>{
                        this.getProjectUsers();
                    });
                }
                else
                {
                    errors['privileges'] = data.responseMessage;
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

    deleteProjectUser = () =>{
        userDetails  = getLocalStorageVariables();
        let url = Constants.DeleteProjectUser;

        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                projectUserId:this.state.projectUserId
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                this.setState({
                    showAlertDialog:false,
                    alertDialogMessage:"",
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage,
                    projectUserId:"",
                });
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    projectUserId:"",
                    showAlertDialog:false,
                    alertDialogMessage:""
                },()=>{
                    this.getProjectUsers();
                });
            }
            else
            {
                this.setState(
                {
                    projectUserId:"",
                    showAlertDialog:false,
                    alertDialogMessage:"",

                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage
                });
            }
        });
    }

    render(){
        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <TeamSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                showLeftMenu={true}
                                projectNo = {this.state.projectId}
                                title={this.state.projectDetails.title}
                                projectDetails={this.state.projectDetails}
                            />
                            {
                                this.state.showLoader &&
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }
                            {
                                this.state.componentDidMountFlag &&
                                <CustomContainer>
                                    <CustomRow>
                                        <CustomCol md="6">
                                            <SearchLayout>
                                                <ResultsizeDropDown
                                                    itemsArr={this.state.resultSizeArr}
                                                    placeholder={this.state.resultSizePlaceholder}
                                                    name={"label"}
                                                    onDropDownItemClick={this.resultSizeDropdownClick}
                                                    disabled = {this.state.isEdit?true:false}
                                                    disableShadowAddBorder={true}
                                                />
                                                <FieldSetRoundSearch>
                                                    <InputFieldRoundSearch 
                                                        type="text"
                                                        placeholder="Search User Name"
                                                        name="searchUserNameKey" 
                                                        onChange={this.handleChange} 
                                                        value={this.state.searchUserNameKey}
                                                        onKeyPress={this.onEnterBtnPress}
                                                    />
                                                    <SearchIcon 
                                                        onClick = {this.searchUserName}
                                                    />
                                                </FieldSetRoundSearch>  
                                                <ClearSearchText onClick={this.resetFilters}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                            </SearchLayout>
                                        </CustomCol>
                                        <CustomCol md="3">
                                        </CustomCol>
                                        <CustomCol md="3">
                                            {
                                                userDetails.userType === Constants.USER_TYPE_OWNER &&
                                                <AddNewLayout>
                                                    <AddNewBtn
                                                        as="button"
                                                        onClick = {this.handleProjectUserDialog}
                                                    >Add New Member</AddNewBtn>
                                                </AddNewLayout>
                                            }
                                        </CustomCol>
                                    </CustomRow>

                                    <CardOuterLayout>
                                        <TeamCard>
                                            <CardHeadingLayout showBottomBorder>
                                                <CardHeading>Team</CardHeading>
                                            </CardHeadingLayout>
                                            {
                                                !isEmptyVariable(this.state.projectUsers) &&
                                                this.state.projectUsers.map((item,idx) => {
                                                return <TeamMemberLayout>
                                                    <CustomRow>
                                                        <CustomCol lg="12">
                                                            <TopLayout>
                                                            <MemberDetailsLayout>
                                                                <ProfileImage 
                                                                    src={isEmptyVariable(item.profilePic)?'/assets/default-propic.png':Constants.ImageBaseUrl+item.profilePic}
                                                                />
                                                                <MemberDetailsTextLayout>
                                                                    <TableDetails>
                                                                        <TableRow>
                                                                            <TableData>
                                                                                <TableText> Name:</TableText>
                                                                            </TableData>
                                                                            <TableData>
                                                                                <TableText>{ifEmptyReturnNA(item.firstName)}</TableText>
                                                                            </TableData>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableData>
                                                                                <TableText> Email:</TableText>
                                                                            </TableData>
                                                                            <TableData>
                                                                                <TableText>{ifEmptyReturnNA(item.email)}</TableText>
                                                                            </TableData>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableData>
                                                                                <TableText> Type:</TableText>
                                                                            </TableData>
                                                                            <TableData>
                                                                                <TableText>{Constants.PROJECTROLESMAP[item.privilege]}</TableText>
                                                                            </TableData>
                                                                        </TableRow>
                                                                    </TableDetails>
                                                                    {
                                                                        item.userStatus === "REGISTRATION PENDING" && 
                                                                        <StatusSpan alertflag> {"PENDING REGISTRATION"}</StatusSpan>
                                                                    }
                                                                    {
                                                                        item.userStatus === "ACTIVE" && 
                                                                        <StatusSpan> {ifEmptyReturnNA(item.userStatus)}</StatusSpan>
                                                                    }
                                                                    
                                                                </MemberDetailsTextLayout>
                                                            </MemberDetailsLayout>

                                                            {
                                                                item.privilege !== Constants.PROJECT_USER_PRIVILEGE_OWNER &&
                                                                userDetails.userType === Constants.USER_TYPE_OWNER &&
                                                                <ActionButtonsLayout>
                                                                    <ActionButton onClick={this.editUser.bind(this,item)}>
                                                                        <EditIcon/>
                                                                        {/* <ActionButtonText>Edit</ActionButtonText> */}
                                                                    </ActionButton>

                                                                    <ActionButton onClick={this.deleteUser.bind(this,item.projectUserId)}>
                                                                        <DeleteIcon/>
                                                                        {/* <ActionButtonText>Delete</ActionButtonText> */}
                                                                    </ActionButton>
                                                                </ActionButtonsLayout>
                                                            }

                                                            </TopLayout>
                                                        </CustomCol>
                                                    </CustomRow>

                                                    <CustomRow>
                                                        <CustomCol lg="8" style={{display:"flex"}}>
                                                            <PrivilegeSingleLayout>
                                                                {
                                                                    item.writeScenariosAndAction === "Y"?<CheckSpan />:<CrossSpan />
                                                                }
                                                                <PrivilegeText>Write Scenarios & Action</PrivilegeText>
                                                            </PrivilegeSingleLayout>
                                                            <PrivilegeSingleLayout>
                                                            {
                                                                item.runTestCases === "Y"?<CheckSpan />:<CrossSpan />
                                                            }
                                                                <PrivilegeText>Run Test Cases</PrivilegeText>
                                                            </PrivilegeSingleLayout>
                                                            <PrivilegeSingleLayout>
                                                            {
                                                                item.viewReports === "Y"?<CheckSpan />:<CrossSpan />
                                                            }
                                                                <PrivilegeText>View Reports</PrivilegeText>
                                                            </PrivilegeSingleLayout>
                                                            {/* <PrivilegeSingleLayout>
                                                                {
                                                                    item.createNewConfig === "Y"?<CheckSpan />:<CrossSpan />
                                                                }
                                                                <PrivilegeText>Create New Config</PrivilegeText>
                                                            </PrivilegeSingleLayout> */}
                                                            {/* {
                                                                item.privilege === Constants.PROJECT_USER_PRIVILEGE_OWNER &&
                                                                <PrivilegeSingleLayout>
                                                                    {
                                                                        item.isInviteAndManageTeam === "Y"?<CheckSpan />:<CrossSpan />
                                                                    }
                                                                    <TableText>Invite and Manage Team</TableText>
                                                                </PrivilegeSingleLayout>
                                                            } */}
                                                        </CustomCol>

                                                        {/* <CustomCol lg="4">
                                                            
                                                        </CustomCol> */}

                                                    </CustomRow>
                                                </TeamMemberLayout>
                                            })
                                        }
                                        </TeamCard>
                                    </CardOuterLayout>

                                    {
                                    (this.state.totalCount > this.state.projectUsers.length) && 
                                    <Pagination 
                                        totalLength ={this.state.totalCount} 
                                        items={this.state.projectUsers} 
                                        onChangePage={this.onChangePage} 
                                        currentPageNo = {this.state.currentPageNo}
                                        pageSize={this.state.resultSize}
                                        initialPage={this.state.currentPageNo}
                                        />
                                }
                                </CustomContainer>
                            }

                        </MainContainer>

                        {/* Add/Edit Project User Dialog */}
                        <BootstrapModal show={this.state.showAddProjectUserModal} onHide={this.handleCloseProjectUserDialog}>
                            <Modal.Header closeButton>
                            <Modal.Title>{this.state.isEdit?"Edit":"Add"} Team Member</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FieldSet>
                                    <InputLabelEmail>User</InputLabelEmail>
                                    <DropDownRegular 
                                        placeholder={this.state.otherUsersDDPlaceholder}
                                        itemsArr = {this.state.otherUsersArr}
                                        onDropDownItemClick = {this.onUserDropDownItemClick}
                                        // dropDownId = {index}
                                        name={"displayName"}
                                    />
                                    {/* <InputFieldBorder 
                                        placeholder="Email"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        disabled = {this.state.isEdit?true:false}
                                    /> */}
                                    <ErrorSpan>{this.state.errors.email}</ErrorSpan>
                                </FieldSet>
                                <FormHeading>
                                    Privileges
                                </FormHeading>
                                <CheckboxLayout marginBottom>
                                    <InputFieldCheckBox 
                                        type="checkbox"
                                        name="writeScenariosAndAction"
                                        id="writeScenariosAndAction"
                                        onChange={e => this.handleCheck(e)}
                                        checked={this.state.writeScenariosAndAction === "Y"?true:false}
                                    />
                                    <CheckBoxLabel for="writeScenariosAndAction">Write Scenarios & Action</CheckBoxLabel>
                                </CheckboxLayout>
                                {/* <CheckboxLayout marginBottom>
                                    <InputFieldCheckBox 
                                        type="checkbox"
                                        name="createNewConfig"
                                        id="createNewConfig"
                                        onChange={e => this.handleCheck(e)}
                                        checked={this.state.createNewConfig === "Y"?true:false}
                                    />
                                    <CheckBoxLabel for="createNewConfig">Create New Config</CheckBoxLabel>
                                </CheckboxLayout> */}
                                <CheckboxLayout marginBottom>
                                    <InputFieldCheckBox 
                                        type="checkbox"
                                        name="runTestCases"
                                        id="runTestCases"
                                        onChange={e => this.handleCheck(e)}
                                        checked={this.state.runTestCases === "Y"?true:false}
                                    />
                                    <CheckBoxLabel for="runTestCases">Run Test Cases</CheckBoxLabel>
                                </CheckboxLayout>
                                <CheckboxLayout>
                                    <InputFieldCheckBox 
                                        type="checkbox"
                                        name="viewReports"
                                        id="viewReports"
                                        onChange={e => this.handleCheck(e)}
                                        checked={this.state.viewReports === "Y"?true:false}
                                    />
                                    <CheckBoxLabel for="viewReports">View Reports</CheckBoxLabel>
                                </CheckboxLayout>
                                <ErrorSpan>{this.state.errors.privileges}</ErrorSpan>
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleCloseProjectUserDialog}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.state.isEdit?this.editProjectUser:this.addProjectUser}
                                >Save</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type= {Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Team Member"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteProjectUser}
                            proceedBtnLabel={ Constants.PROJECT_USER_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />
                        
                    </TeamSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Team;