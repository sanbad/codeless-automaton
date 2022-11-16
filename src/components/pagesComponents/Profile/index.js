import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ProfileSection,MainContainer,EmptyCard,ProfileImage,ImageSpan,DetailsCard,
    ChangePhotoLayout,InputBox,
    ChangePhotoLabel,ImageInput,TextLayout,HeaderTitle,
    SuccessSpan,SubmitButton, TableCardLayout, TableCard} from './profile.style';
import {CustomContainer,CustomRow,CustomCol,Card,CardHeadingLayout,
    CardHeading,Table,    InputField,FieldSet,ErrorSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'

import {getLocalStorageVariables,isEmptyVariable,getLocalDateOnlyFromUTC,
    ifEmptyReturnNA} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import AlertDialog from '../../commonComponents/AlertDialog';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile:{},
            // activeSubscription:"",
            oldPass:"",
            newPass:"",
            cPass:"",
            fromSubmitted:false,
            errors:"",
            error_msg:"",
            success_msg:"",
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
            componentDidMountFlag:false,
        }
    }

    componentDidMount()
    {
       this.getProfile();
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

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    validateForm()
    {
        let error_flag = false;
        let errors = {};
        if(isEmptyVariable(this.state.oldPass))
        {
            error_flag = true;
            errors['oldPass'] = "Please enter Password!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if(isEmptyVariable(this.state.newPass))
        {
            error_flag = true;
            errors['newPass'] = "Please enter New Password!";
            
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if(!isEmptyVariable(this.state.newPass) && this.state.newPass < 8)
        {
            error_flag = true;
            errors['newPass'] = "Password must have minimum 8 characters";

            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if(isEmptyVariable(this.state.cPass))
        {
            error_flag = true;
            errors['cPass'] = "Please enter Confirm Password!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if(this.state.newPass !== this.state.cPass)
        {
            error_flag = true;
            errors['cPass'] = "Please enter confirm password same as above!";
            setTimeout(function(){
                this.setState({errors:{}});
           }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        this.setState({
            errors: errors
        });
        return error_flag;
    }

    changePassword = () => {
        if(!this.validateForm())
        {
            let userDetails  = getLocalStorageVariables();
            fetch(Constants.ChangePassword,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    oldPassword:this.state.oldPass,
                    newPassword:this.state.newPass,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
                {
                    this.setState(
                        {
                            "success_msg":data.responseMessage,
                            "oldPass":"",
                            "newPass":"",
                            "cPass":"",
                            "error_msg":"",
                            "errors":""
                        },()=>{
                        setTimeout(function(){
                            this.setState({"success_msg":""});
                        }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                    });
                    
                }
                else
                {
                    this.setState(
                        {
                            "error_msg":data.responseMessage,
                            "oldPass":"",
                            "newPass":"",
                            "cPass":"",
                            "success_msg":"",
                            "errors":""
                        },()=>{
                        setTimeout(function(){
                            this.setState({"error_msg":""});
                        }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                    });
                    
                }
            });
        }
    }

    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    /**************** API CALLS *****************/

    getProfile = () => {
        let userDetails  = getLocalStorageVariables();

        fetch(Constants.GetProfile,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    profile:data.data.result,
                    // activeSubscription:data.data.result,
                    componentDidMountFlag:true,
                })
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location = Constants.WINDOW_LOCATION;
            } else{
                this.setState({
                    profile:"",
                    // activeSubscription:"",
                    componentDidMountFlag:true,
                })
            }
        });
    }

    changeImage = (e) => {
        e.preventDefault();
        let userDetails  = getLocalStorageVariables();
       
        var sizeInMB    =   (e.target.files[0].size / (1024*1024)).toFixed(2);
        if(!this.fileValidation("uploadProfileImage"))
        {
            this.setState(
                {
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:'Please upload file having extensions jpeg,jpg and png only.'
                }
            );
        }
        else if(sizeInMB > Constants.VALID_PROFILE_IMAGE_SIZE)
        {
            this.setState(
                {
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:'Please upload image size less than '+Constants.VALID_PROFILE_IMAGE_SIZE+' MB'
                }
            );
        }
        else
        {
            const formData = new FormData();
            formData.append('file',e.target.files[0]);
            formData.append('email',userDetails.email);
            formData.append('accessToken',userDetails.accessToken);
            fetch(Constants.UpdateProfilePic,
            {
                method: "POST",
                mode: 'cors',
                body: formData
            })
            .then(response => { return response.json(); })
            .then(data => {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
                {
                    let parameters = {
                        loggedInUserId:userDetails.userId,
                        loggedInUserEmail:userDetails.email,
                        loggedInUserType:userDetails.userType,
                        loggedInProPic:data.data.profilePic,
                        loggedInFirstName:userDetails.fullName,
                        loggedInAccessToken:userDetails.accessToken,
                    };
                    localStorage.clear();
                    localStorage.setItem('loggedInUserDetails', JSON.stringify(parameters));
                    this.getProfile();
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    });
                }
            });
        }
    }

    render(){
        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <ProfileSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar />
                                <CustomContainer>
                                    <CustomRow>
                                        <CustomCol lg="7">
                                            <DetailsCard style={{height:"100%"}}>
                                                <CardHeadingLayout showBottomBorder>
                                                    <CardHeading>Profile</CardHeading>
                                                </CardHeadingLayout>
                                                
                                                <CustomRow style={{padding:"20px"}}>
                                                    <CustomCol lg="4">
                                                        {
                                                            this.state.componentDidMountFlag &&
                                                            <ProfileImage 
                                                            src={isEmptyVariable(this.state.profile.profilePic)?'/assets/default-propic.png':Constants.ImageBaseUrl+this.state.profile.profilePic}
                                                            />
                                                        }
                                                    </CustomCol>
                                                    <CustomCol lg="8">
                                                        <TextLayout>
                                                            <HeaderTitle>{ifEmptyReturnNA(this.state.profile.firstName)}</HeaderTitle>
                                                        </TextLayout>
                                                        <TextLayout>
                                                            <HeaderTitle> {ifEmptyReturnNA(this.state.profile.email)}</HeaderTitle>
                                                        </TextLayout>
                                                        <ChangePhotoLayout>
                                                            <ImageInput
                                                                name="file" 
                                                                type="file"
                                                                id="uploadProfileImage"
                                                                onChange={this.changeImage}
                                                            />
                                                            <ChangePhotoLabel for="uploadProfileImage">Upload Profile Pic</ChangePhotoLabel>
                                                        </ChangePhotoLayout>
                                                    </CustomCol>
                                                </CustomRow>
                                            </DetailsCard>
                                        </CustomCol>
                                        <CustomCol lg="5">
                                            <DetailsCard>
                                                <CardHeadingLayout showBottomBorder>
                                                    <CardHeading>Change Password</CardHeading>
                                                </CardHeadingLayout>
                                                <CustomRow style={{padding:"20px 20px 0px"}}>
                                                    <CustomCol md="12">
                                                        <FieldSet>
                                                            <InputBox type="password" placeholder="Old Password"
                                                            name="oldPass" onChange={this.handleChange} value={this.state.oldPass}/>
                                                            <ErrorSpan>{this.state.errors.oldPass}</ErrorSpan>
                                                        </FieldSet>
                                                        <FieldSet>
                                                            <InputBox type="password" placeholder="New Password"
                                                            name="newPass" onChange={this.handleChange} value={this.state.newPass}/>
                                                            <ErrorSpan>{this.state.errors.newPass}</ErrorSpan>
                                                        </FieldSet>
                                                        <FieldSet>
                                                            <InputBox type="password" placeholder="Confirm New Password"
                                                            name="cPass" onChange={this.handleChange} value={this.state.cPass}/>
                                                            <ErrorSpan>{this.state.errors.cPass}</ErrorSpan>
                                                        </FieldSet>
                                                        <FieldSet>
                                                            <SubmitButton 
                                                                as="button"
                                                                disabled={this.state.fromSubmitted}
                                                                onClick={this.changePassword}>
                                                                Change Password
                                                            </SubmitButton>
                                                            <ErrorSpan>{this.state.error_msg}</ErrorSpan>
                                                            <SuccessSpan>{this.state.success_msg}</SuccessSpan>
                                                        </FieldSet>
                                                    </CustomCol>
                                                </CustomRow>
                                                
                                            </DetailsCard>
                                        </CustomCol>
                                    </CustomRow>

                                    <TableCardLayout>
                                        <TableCard>
                                            <CardHeadingLayout>
                                                <CardHeading>Active Subscription</CardHeading>
                                            </CardHeadingLayout>
                                            <Table style={{marginBottom:0,borderBottomRightRadius:5,borderBottomLeftRadius:5}} lastchildcheck={true}>
                                                <tbody>
                                                    <tr style={{borderTop:"1px solid #ccc"}}>
                                                        <th>Plan</th>
                                                        <td>{ifEmptyReturnNA(this.state.profile.plan)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Subscription Id</th>
                                                        <td>{ifEmptyReturnNA(this.state.profile.razorpaySubscriptionId)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Start Date</th>
                                                        <td>{isEmptyVariable(this.state.profile.startDate)?"N/A":getLocalDateOnlyFromUTC(this.state.profile.startDate)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Projects</th>
                                                        <td>{ifEmptyReturnNA(this.state.profile.noOfProjects)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Team Members</th>
                                                        <td>{ifEmptyReturnNA(this.state.profile.teamMembers)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Live logs</th>
                                                        <td>{ifEmptyReturnNA(this.state.profile.liveExecutionLogs) === "Y"?"Yes":"No"}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Download Report</th>
                                                        <td>{ifEmptyReturnNA(this.state.profile.downloadReport) === "Y"?"Yes":"No"}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Parallel Runs</th>
                                                        <td>{ifEmptyReturnNA(this.state.profile.parallelRuns)}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </TableCard>
                                    </TableCardLayout>
                                    
                                    
                                </CustomContainer>
                        </MainContainer>

                         <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />
                        
                    </ProfileSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Profile;