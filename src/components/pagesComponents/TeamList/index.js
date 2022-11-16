import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {TeamSection,MainContainer,LoaderLayout,TableCardLayout,BootstrapModal,CancelBtnDialog,
    TableCard,SearchIcon,ClearSearchText,SearchLayout,SaveBtn,FieldSetRoundSearch,InputFieldRoundSearch,
    AddNewLayout,EmptyCard,EmptyCardAddNewLayout,CustomText,DeleteBtn,InputLabelEmail
} from './teamlist.style';
import {CustomContainer,CardHeadingLayout,FieldSetRound,InputFieldRound,ErrorSpan,AddNewBtn,
    CardHeading,Table, TableAnchor,     FieldSet,InputFieldBorder,InputLabel,
    CustomRow,CustomCol,ArrowUpIcon,ArrowDownIcon, PageCountSpan, FlexLayoutCenterJustified,} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import {getLocalStorageVariables,isEmptyVariable,ifEmptyReturnNA,sortTable} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {Delete} from '@styled-icons/material/Delete';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../../commonComponents/pagination';
import AlertDialog from '../../commonComponents/AlertDialog';
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import SpinnerLoader from 'react-loader-spinner';

const userDetails  = getLocalStorageVariables();
const sortUser = "firstName";
const sortEmail  = "email";
const sortUserType = "userType";
const sortActiveProjectCount= "activeProjectCount";
const sortStatus= "status";

class Teamlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            showLoader:false,
            projectUsers:"",
            totalCount:0,

            searchProjectUserNameKey:"",
            apiSearchKey:"",
            componentDidMountFlag:false,

            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            sort: "",
			sortDir: "",
            
            email:"",
            errors:"",
            showAddUserModal:false,
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
            userId:"",

            showAlertDialog:false,
            alertDialogMessage:"",
            deleteEditUserId:"",
        }
    }

    componentDidMount(){
        this.getTeamList();
    }

    handleProjectUserDialog = (e)=>{
        this.setState({
            showAddUserModal:true,
            email:"",
            errors:"",
        });
    }

    handleCloseAddUserDialog = (e)=>{
        this.setState({
            showAddUserModal:false,
        });
    }

    handleAlertDialogClose = () =>{
        this.setState(
        {
            deleteEditUserId:"",
            showAlertDialog:false,
            alertDialogMessage:""
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
            if(!isEmptyVariable(this.state.searchProjectUserNameKey)){
                this.setState({currentPageNo:1},()=>{
                    this.getTeamList();
                });
            }
        }
    }

    searchProjectUserName = () => {
        if(!isEmptyVariable(this.state.searchProjectUserNameKey)){
            this.setState({currentPageNo:1},()=>{
                this.getTeamList();
            });
        }
    }

    resetFilters = () => {
        this.setState({
            currentPageNo: 1,
            searchProjectUserNameKey:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
        },()=>{
            this.getTeamList();
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
				this.getTeamList();
			}
		);
	};

    sortTableLocal = (sortColumn) => {
        let sortObj = sortTable(sortColumn, this.state.sort, this.state.sortDir);

        this.setState(
            {
                sort: sortObj.sortTemp,
                sortDir: sortObj.sortDirTemp,
            },
            () => {
                this.getTeamList();
            }
        );
    };

    onClickItem = (label,item) =>{
        if(label === "Delete"){
            this.openDeleteDialog(item,label);
        }
    }
    openDeleteDialog =(userId,label)=>{
        this.setState(
        {
            operationType:label,
            deleteEditUserId:userId,
            showAlertDialog:true,
            alertDialogMessage:Constants.USER_DELETE_WARNING
        });
    }

    getTeamList = () => {
        this.setState({
            showLoader:true,
        });
        fetch(Constants.ListAllProjectUsers,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                search:this.state.searchProjectUserNameKey,
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
            } else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    pageNo:this.state.currentPageNo,
                    totalCount:data.data.count,
                    projectUsers:data.data.result,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchProjectUserNameKey
                })
            }else{
                this.setState({
                    projectUsers:"",
                    totalCount:0,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchProjectUserNameKey
                })
            }
        });
    }

    onChangePage = (page) => {
        // update state with new page of items
        if(page != this.state.currentPageNo){
            this.setState({
                showLoader:true,
            })
            fetch(Constants.ListAllProjectUsers,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                    {
                        email:userDetails.email,
                        accessToken:userDetails.accessToken,
                        search:this.state.searchProjectUserNameKey,
                        pageNo: page,
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
                } else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        currentPageNo:page,
                        projectUsers:data.data.result,
                        totalCount:data.data.count,
                        showLoader:false,
                    });
                }
                else
                {
                    this.setState({
                        currentPageNo:page,
                        projectUsers:"",
                        totalCount:0,
                        showLoader:false,
                    });
                    
                }
            });
        }
    }

    addNewUser = (e) =>{
        e.preventDefault();
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.email))
        {
            error_flag = true;
            errors['email'] = "Please enter email";
        }

        if(!isEmptyVariable(this.state.email))
        {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(this.state.email)) {
                error_flag = true;
                errors["email"] = "Please enter valid email";
            }
        }

        if(isEmptyVariable(this.state.fullName))
        {
            error_flag = true;
            errors['fullName'] = "Please enter name";
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
            fetch(Constants.AddUserToOrganisation,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    targetEmail:this.state.email,
                    fullName:this.state.fullName,
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
                        showAlertDialogInfo:false,
                        alertDialogMessageInfo:"",
                        showAddUserModal:false,
                    },()=>{
                        this.getTeamList();
                    });
                }
                else
                {
                    this.setState({
                        showAddUserModal:false,
                        userId:"",
                        email:"",
                        errors:"",
                        isEdit:false,

                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage,
                    });
                }
            });
        }
    }

    deleteUser = () =>{
        let url = Constants.DeactivateUser;
        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    targetUserId:this.state.deleteEditUserId,
                })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                this.setState(
                    {
                        deleteEditUserId:"",
                        showAlertDialog:false,
                        alertDialogMessage:""
                    },()=>{
                    this.getTeamList();
                });
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                this.setState(
                    {
                        deleteEditUserId:"",
                        showAlertDialog:false,
                        alertDialogMessage:"",

                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    },()=>{
                    this.getTeamList();
                });
            }
        });
    }
    
    render(){
        const actionArr = [
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

                    <TeamSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar
                            title="Team Members"
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
                                <CustomContainer>
                                {
                                    // dont display when action and search key both are empty
                                    !(isEmptyVariable(this.state.projectUsers) &&
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
                                                        placeholder="Search Team Member Email"
                                                        name="searchProjectUserNameKey" 
                                                        onChange={this.handleChange} 
                                                        value={this.state.searchProjectUserNameKey}
                                                        onKeyPress = {this.onEnterBtnPress}
                                                    />
                                                    <SearchIcon 
                                                        onClick = {this.searchProjectUserName}
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
                                                        onClick={this.handleProjectUserDialog}
                                                    >Add New User</AddNewBtn>
                                                </AddNewLayout>
                                            }
                                        </CustomCol>
                                    </CustomRow>
                                }

                                {
                                    !isEmptyVariable(this.state.projectUsers) &&
                                    <TableCardLayout>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th width="5%">No</th>
                                                    <th onClick={this.sortTableLocal.bind(this, sortUser)}>
                                                        <div className="sort-header">    
                                                            Name
                                                            <span
                                                                className={
                                                                    this.state.sort === sortUser ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th onClick={this.sortTableLocal.bind(this, sortEmail)}>
                                                        <div className="sort-header">    
                                                            Email
                                                            <span
                                                                className={
                                                                    this.state.sort === sortEmail ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th onClick={this.sortTableLocal.bind(this, sortUserType)}>
                                                        <div className="sort-header">    
                                                            User Role
                                                            <span
                                                                className={
                                                                    this.state.sort === sortUserType ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th onClick={this.sortTableLocal.bind(this, sortActiveProjectCount)}>
                                                        <div className="sort-header">    
                                                            Projects
                                                            <span
                                                                className={
                                                                    this.state.sort === sortActiveProjectCount ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th onClick={this.sortTableLocal.bind(this, sortStatus)}>
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
                                                    {
                                                        userDetails.userType === Constants.USER_TYPE_OWNER &&
                                                        <th width="7%"></th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                !isEmptyVariable(this.state.projectUsers) &&
                                                this.state.projectUsers.map((item,idx) => {
                                                    return <tr>
                                                        <td>{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                        <td>{ifEmptyReturnNA(item.firstName)}</td>
                                                        <td>{item.email}</td>
                                                        <td>{Constants.USERROLESMAP[item.userType]}</td>
                                                        <td>{item.activeProjectCount}</td>
                                                        <td>{item.status}</td>
                                                        {
                                                            userDetails.userType === Constants.USER_TYPE_OWNER &&
                                                            <td>
                                                                <TableDropDown 
                                                                    actionArr={actionArr}
                                                                    onClickDropDownItem={this.onClickItem}
                                                                    item={item.userId}
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
                                        (this.state.totalCount > this.state.projectUsers.length) &&
                                        <Pagination 
                                            totalLength ={this.state.totalCount} 
                                            items={this.state.projectUsers} 
                                            onChangePage={this.onChangePage} 
                                            pageSize={this.state.resultSize}
                                            initialPage={this.state.currentPageNo}
                                            currentPageNo = {this.state.currentPageNo} />
                                    }
                                    {
                                        this.state.totalCount <= this.state.projectUsers.length &&
                                        <div></div>
                                    }
                                    <PageCountSpan>
                                        {(start+1)+"-"+end+" of "+this.state.totalCount}
                                    </PageCountSpan>
                                </FlexLayoutCenterJustified>

                                </CustomContainer>
                            }
                            {
                                this.state.componentDidMountFlag && isEmptyVariable(this.state.projectUsers) &&
                                <CustomContainer>
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey)?
                                                    Constants.PROJECT_USERS_EMPTY_WARNING
                                                    :
                                                    Constants.PROJECT_USERS_EMPTY_SEARCH_WARNING
                                                }
                                                </CustomText>
                                            </CustomCol>
                                        </CustomRow>
                                    </EmptyCard>
                                </CustomContainer>
                            }
                        </MainContainer>


                        {/* Add/Edit New User Dialog */}
                        <BootstrapModal show={this.state.showAddUserModal} onHide={this.handleCloseAddUserDialog}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FieldSet>
                                    <InputLabelEmail>Name</InputLabelEmail>
                                    <InputFieldBorder 
                                        placeholder="Name"
                                        name="fullName"
                                        onChange={this.handleChange}
                                        value={this.state.fullName}
                                    />
                                    <ErrorSpan>{this.state.errors.fullName}</ErrorSpan>
                                </FieldSet>
                                <FieldSet>
                                    <InputLabelEmail>Email</InputLabelEmail>
                                    <InputFieldBorder 
                                        placeholder="Email"
                                        name="email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                    <ErrorSpan>{this.state.errors.email}</ErrorSpan>
                                </FieldSet>
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleCloseAddUserDialog}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.addNewUser}
                                >Save</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type= {Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete User"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteUser}
                            proceedBtnLabel={ Constants.USER_DELETE_BUTTON }
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

export default Teamlist;