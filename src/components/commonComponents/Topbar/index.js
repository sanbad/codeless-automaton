import React, { Component } from 'react';
import {TopbarWrapper,TopbarInnerWrapper,MenuLayout,MenuInnerLayout,PageHeading,TopMenuItem,DropdownLayout,
    BootstrapModal,CancelBtnDialog,SaveBtn,SuccessSpan,UploadPhotoLabel,ImageInput} from './topbar.style';
import {ErrorSpan,FieldSet,InputFieldBorder,InputLabel,TextareaFieldBorder
    } from '../../commonComponents/Global/common.style';
import DropdownRegular from '../AccountDropDown';
import ProjectDropDown from '../ProjectDropDown';
import NotificationDropdown from '../NotificationDropDown'
import {User} from '@styled-icons/fa-solid/User';
import {LogOut} from '@styled-icons/entypo/LogOut';
import {Mail} from '@styled-icons/entypo/Mail';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Delete} from '@styled-icons/material/Delete';
import {InfoCircleFill} from '@styled-icons/bootstrap/InfoCircleFill';
import {PeopleFill} from '@styled-icons/bootstrap/PeopleFill';
import * as Constants from '../../commonComponents/constants';
import {getLocalStorageVariables,isEmptyVariable} from '../../commonComponents/commonFunctions';
import { matchPath,withRouter } from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertDialog from '../../commonComponents/AlertDialog';
import AlertInputDialog from '../../commonComponents/AlertInputDialog';
const userDetails = getLocalStorageVariables();

class Topbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showSupportModal: false,
            subject:"",
            message:"",
            topbarHeading:"",
            errors:[],
            responseMessage:"",
            
            showEditProjectModal:false,
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",

            showInputDialog:false,
            alertInputMessage:"",
            inputDialogError:"",
            inputFieldDialog:"",
            projectDetails:{}
        }
    }

    componentDidMount(){
        this.setState({
            topbarHeading:this.props.title,
            projectDetails:this.props.projectDetails
        })
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
            this.setState({
                topbarHeading:this.props.title,
                projectDetails:this.props.projectDetails
            })
        }
    }

    onClickItem = (label,e) =>{
        if(label === "Contact Support"){
            this.openSupportDialog();
        }
        else if(label === "Edit Project"){
            this.openEditProjectDialog();
        }
        else if(label === "Delete Project"){
            this.openProjectPasswordDialog();
        }
        else if(label === "Details"){
        }
    }

    openSupportDialog = () =>{
        this.setState( {
            showSupportModal:true
        });
    }

    handleSupportClose = () => this.setState({showSupportModal:false});

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    contactSupport = (e) =>{
        e.preventDefault();
        let isError = false;
        let errors = {};

        if(isEmptyVariable(this.state.subject))
        {
            isError = true;
            errors['subject'] = "Please enter subject!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }
        if(isEmptyVariable(this.state.message))
        {
            isError = true;
            errors['message'] = "Please enter message!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if (isError) {
            this.setState({
                errors: errors
            });
        }
        else
        {
            fetch(Constants.ContactSupport,
                {
                    method: "POST",
                    mode:'cors',
                    body: new URLSearchParams({
                        loginEmail:userDetails.email,
                        loginAccessToken:userDetails.accessToken,
                        subject:this.state.subject,
                        message:this.state.message,
                    })
                })
                .then(response => { return response.json(); } )
                .then(data =>
                {
                    this.setState(
                        {
                            responseMessage:data.responseMessage,
                            subject:"",
                            message:"",
                            errors:[]
                        },()=>{
                        setTimeout(function(){
                            this.setState({responseMessage:""});
                        }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                    });
                });
        }
    }

    handleAlertProjectDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    openProjectPasswordDialog = () =>{
        this.setState(
            {
                showInputDialog:true,
                alertInputMessage:Constants.PROJECTS_DELETE_WARNING +this.props.title+"?",
                inputDialogError:"",
                inputFieldDialog:""
            });
    }

    handleInputProjectDialogClose = () =>{
        this.setState(
        {
            showInputDialog:false,
            alertInputMessage:"",
            inputDialogError:"",
            inputFieldDialog:""
        });
    }

    openEditProjectDialog = () =>{
        this.setState({
            showEditProjectModal:true,
            title:this.state.projectDetails?.title, //set value
            description:this.state.projectDetails?.description, //set value
            errors:[],
        });
    }

    handleEditProjectClose = () => {
        this.setState({
            showEditProjectModal:false,
            errors:[],
            title:"",
            description:"",
        });
    }

    fileValidation(id){
        var fileInput = document.getElementById(id);
        var filePath = fileInput.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if(!allowedExtensions.exec(filePath)){
            fileInput.value = '';
            return false;
        }else{
                return true;
            }
    }

    changeImage = (e) => {
        e.preventDefault();
        let error_flag = false;
        let errors = {};

        if(!isEmptyVariable(e.target.files[0])){

            let sizeInMB = (e.target.files[0].size / (1024*1024)).toFixed(2);
            
            if(!this.fileValidation("supportImage"))
            {
                error_flag = true;
                errors['supportImage'] = "Please upload file having extensions jpeg,jpg and png only.";
                setTimeout(function(){
                    this.setState({errors:{}});
                }.bind(this),Constants.WRNG_MSG_TIMEOUT);

            }
            else if(sizeInMB > Constants.VALID_PROFILE_IMAGE_SIZE)
            {
                error_flag = true;
                errors['supportImage'] = 'Please upload image size less than '+Constants.VALID_PROFILE_IMAGE_SIZE+' MB';
                setTimeout(function(){
                    this.setState({errors:{}});
                }.bind(this),Constants.WRNG_MSG_TIMEOUT);

            }

            if (error_flag) {
                this.setState({
                    errors: errors
                });
            }else
            {
                const formData = new FormData();
                formData.append('file',e.target.files[0]);
                formData.append('email',userDetails.email);
                formData.append('accessToken',userDetails.accessToken);

                // fetch(Constants.UpdateProfilePic,
                //     {
                //         method: "POST",
                //         mode: 'cors',
                //         body: formData
                //     })
                //     .then(response => { return response.json(); })
                //     .then(data => {
                //         if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
                //         {
                //         }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                //             localStorage.clear();
                //             window.location=Constants.WINDOW_LOCATION;
                //         }else{
                //         }
                //     });
            }
        }
    }
    /*************************PROJECT EDIT/DELETE FUNCTIONS STARTS HERE********************/

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
                    projectNo:this.props.projectNo,
                    title:this.state.title,
                    description:this.state.description
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    let projectDetails = this.state.projectDetails;
                    projectDetails.title = this.state.title;
                    projectDetails.description = this.state.description;
                    this.setState({
                        showEditProjectModal:false,
                        errors:[],
                        title:"",
                        description:"",
                        topbarHeading:this.state.title,
                        projectDetails:projectDetails
                    });
                }
                else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        showEditProjectModal:false,
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage,
                    });
                }
            });
        }
    }

    deleteProject = () =>{
        if(isEmptyVariable(this.state.inputFieldDialog))
        {
            this.setState(
            {
                inputDialogError:"Please enter value to proceed."
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
                        projectNo:this.props.projectNo,
                        password:this.state.inputFieldDialog
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
                    this.setState({
                        showInputDialog:false,
                        alertInputMessage:"",
                    },()=>{
                        window.location=Constants.PROJECTS_LISTING_PATH;
                    });
                }else{
                    this.setState({
                        showInputDialog:false,
                        inputFieldDialog:"",
                        alertInputMessage:"",
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    });
                }
            });
        }
    }

    /*************************PROJECT EDIT/DELETE FUNCTIONS ENDS HERE********************/

    render(){
        const userDetailsLocalStorage = getLocalStorageVariables();
        const accountArr = [
            {
                label:"Profile",
                href:"/profile",
                icon:<User/>
            },
            // {
            //     label:"Help & FAQ",
            //     href:"/help",
            //     icon:<HelpWithCircle/>
            // },
            {
                label:"Contact Support",
                href:"javascript:void(0)",
                icon:<Mail/>
            },
            {
                label:"Logout",
                href:"/logout",
                icon:<LogOut/>
            },
        ];

        const projectDropDownArr = [
            {
                label:"Details",
                icon:<InfoCircleFill/>,
                href:Constants.PROJECT_DETAILS_PATH+"/"+this.props.projectNo
            },
            {
                label:"Project Members",
                icon:<PeopleFill/>,
                href:Constants.PROJECT_MEMBERS_PATH+"/"+this.props.projectNo
            },
            {
                label:"Edit Project",
                icon:<EditAlt/>
            },
            {
                label:"Delete Project",
                icon:<Delete/>
            }
        ];

        return(
            <TopbarWrapper>
                <TopbarInnerWrapper>
                    <MenuLayout>
                    {
                        this.props.showLeftMenu && 
                        // userDetails.userType === Constants.USER_TYPE_OWNER &&
                        <MenuInnerLayout>
                            {
                                userDetails.userType === Constants.USER_TYPE_OWNER 
                                ?<ProjectDropDown 
                                    dropdownArr = {projectDropDownArr}
                                    title={this.state.topbarHeading}
                                    onClickDropDownItem={this.onClickItem}
                                />
                                :<PageHeading>{this.state.topbarHeading}</PageHeading>
                            }
                            
                            <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: ["/projects/scenarios/:id","/projects/scenariodetails/:id","/projects/createscenario/:id","/projects/editscenario/:id"]}) ? true : false} href={(this.props.projectNo!=="")?Constants.SCENARIO_LISTING_PATH+"/"+this.props.projectNo:"#"}>Scenarios</TopMenuItem>
                            <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: ["/projects/actions/:id","/projects/actiondetails/:id","/projects/createaction/:id","/projects/editaction/:id"]}) ? true : false} href={(this.props.projectNo!=="")?Constants.ACTION_LISTING_PATH+"/"+this.props.projectNo:"#"}>Custom Actions</TopMenuItem>
                            <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: "/projects/elements/:id" }) ? true : false} href={(this.props.projectNo!=="")?Constants.ELEMENTS_LISTING_PATH+"/"+this.props.projectNo:"#"}>Elements</TopMenuItem>
                            <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: "/projects/testparameters/:id" }) ? true : false} href={(this.props.projectNo!=="")?Constants.TESTPARAMS_LISTING_PATH+"/"+this.props.projectNo:"#"}>Parameters</TopMenuItem>
                            <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: "/projects/configs/:id" }) ? true : false} href={(this.props.projectNo!=="")?Constants.CONFIG_LISTING_PATH+"/"+this.props.projectNo:"#"}>Configs</TopMenuItem>
                            {
                                this.props.projectDetails?.viewReports === "Y" &&
                                <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: ["/projects/reports/:id","/projects/reportdetails/:id","/projects/livelogs/:id"]}) ? true : false} href={(this.props.projectNo!=="")?Constants.REPORTS_LISTING_PATH+"/"+this.props.projectNo:"#"}>Reports</TopMenuItem>
                            }   
                            {/* <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: "/projects/team/:id" }) ? true : false} href={(this.props.projectNo!=="")?Constants.TEAM_LISTING_PATH+"/"+this.props.projectNo:"#"}>Team</TopMenuItem> */}
                            {/* <TopMenuItem isActive={matchPath(this.props.history.location.pathname, { path: "/projects/details/:id" }) ? true : false} href={(this.props.projectNo!=="")?Constants.PROJECT_DETAILS_PATH+"/"+this.props.projectNo:"#"}>Details</TopMenuItem> */}
                        </MenuInnerLayout>
                    }
                    {
                        !this.props.showLeftMenu &&
                        <PageHeading>{this.state.topbarHeading}</PageHeading>

                    }
                    </MenuLayout>
                    <DropdownLayout>
                        {/* <a className="pricing-anchor" href="/pricing">
                            Pricing
                        </a> */}
                        <NotificationDropdown 
                            notificationArr = {this.props.notificationArr}    
                        />
                        <DropdownRegular 
                            accountArr = {accountArr}
                            profilePic = {userDetailsLocalStorage.profilePic}
                            profileName = {userDetailsLocalStorage.fullName}
                            onClickDropDownItem={this.onClickItem}
                        />
                    </DropdownLayout>
                </TopbarInnerWrapper>
                {/* Show Support Modal Dialog */}
                <BootstrapModal show={this.state.showSupportModal} onHide={this.handleSupportClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Contact Support</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FieldSet>
                            <InputLabel>Subject</InputLabel>
                            <InputFieldBorder 
                                placeholder=""
                                name="subject"
                                onChange={this.handleChange}
                                value={this.state.subject}
                            />
                            <ErrorSpan>{this.state.errors.subject}</ErrorSpan>
                        </FieldSet>
                        <FieldSet>
                            <ImageInput 
                                name="file" 
                                type="file"
                                id={"supportImage"}
                                onChange={this.changeImage}
                            />
                            <UploadPhotoLabel for="supportImage" >Upload Image</UploadPhotoLabel>
                            <ErrorSpan>{this.state.errors.supportImage}</ErrorSpan>
                        </FieldSet>
                        <FieldSet>
                            <InputLabel>Message</InputLabel>
                            <TextareaFieldBorder 
                                placeholder=""
                                name="message"
                                onChange={this.handleChange}
                                value={this.state.message}
                            />
                            <ErrorSpan>{this.state.errors.message}</ErrorSpan>
                        </FieldSet>
                    </Modal.Body>
                    <Modal.Footer>
                    <SuccessSpan>{this.state.responseMessage}</SuccessSpan>
                        <CancelBtnDialog
                            as="button"
                            onClick={this.handleSupportClose}
                        >Cancel</CancelBtnDialog>
                        <SaveBtn
                            as="button"
                            onClick = {this.contactSupport}
                        >Send</SaveBtn>
                    </Modal.Footer>
                </BootstrapModal>

                {/* Add/Edit Project Dialog */}
                <BootstrapModal show={this.state.showEditProjectModal} onHide={this.handleEditProjectClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FieldSet>
                            <InputLabel>Project Name</InputLabel>
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
                            onClick={this.handleEditProjectClose}
                        >Cancel</CancelBtnDialog>
                        <SaveBtn
                            as="button"
                            onClick = {this.editProject}
                        >Save Project</SaveBtn>
                    </Modal.Footer>
                </BootstrapModal>
                <AlertDialog 
                    showAlertDialog={this.state.showAlertDialogInfo}
                    handleAlertDialogClose={this.handleAlertProjectDialogCloseInfo}
                    type= {Constants.ALERT_TYPE_ALERT}
                    alertDialogMessage={this.state.alertDialogMessageInfo}
                    proceedBtnClick={this.handleAlertProjectDialogCloseInfo}
                    proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                />

                <AlertInputDialog 
                    showAlertDialog={this.state.showInputDialog}
                    handleAlertDialogClose={this.handleInputProjectDialogClose}
                    alertDialogHeading={Constants.PROJECTS_DELETE_HEADING}
                    alertDialogMessage={this.state.alertInputMessage}
                    alertDialogInputLabel={Constants.ALERT_TYPE_PASSWORD}
                    handleChange = {this.handleChange}
                    inputFieldValue = {this.state.inputProjectFieldDialog}
                    errorSpan = {this.state.inputDialogError}
                    proceedBtnClick={this.deleteProject}
                    proceedBtnLabel={ Constants.PROJECTS_DELETE_BUTTON }
                />
            </TopbarWrapper>
        );
    
    }
}

export default withRouter(Topbar);