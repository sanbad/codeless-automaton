import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import * as Constants from '../../commonComponents/constants';
import SpinnerLoader from 'react-loader-spinner';
import {ResetPasswordSection,ResetCard,LoaderLayout,ResetPasswordLayout,ResetPassHeading,
    RadicalTestLogo,SubmitButton} from './resetpassword.style';
import {Commonbtn,
    Card,FlexLayout,InputField,FieldSet,ErrorSpan} from '../../commonComponents/Global/common.style';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import {isEmptyVariable} from '../../commonComponents/commonFunctions';


class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state = {
            resetPass:"",
            resetCPass:"",
            fromSubmitted:false,
            showLoader:false,
            errors:[],
            error_msg:"",
            isSuccess:false,
            componentDidMount:false,
            heading:"",
        }
    }

    componentDidMount()
    {
        let code = window.location.href.split("/").pop();

        fetch(Constants.Checkforgotpasswordcode,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    code:code
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        isSuccess:true,
                        componentDidMount:true,
                        heading:"Reset Your Password"
                    })
                }else{
                    this.setState({
                        isSuccess:false,
                        componentDidMount:true,
                        heading:"Invalid password reset code or link expired"
                    })
                }
            });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    validateForm()
    {
        let error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.resetPass))
        {
            error_flag = true;
            errors['resetPass'] = "Please enter Password!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if(!isEmptyVariable(this.state.resetPass) && this.state.resetPass.length < 8){
            error_flag = true;
            errors['resetPass'] = "Password must have minimum 8 characters";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if(isEmptyVariable(this.state.resetCPass))
        {
            error_flag = true;
            errors['resetCPass'] = "Please enter Confirm Password!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        if(this.state.resetPass !== this.state.resetCPass)
        {
            error_flag = true;
            errors['resetCPass'] = "Please enter confirm password same as above!";
            setTimeout(function(){
                this.setState({errors:{}});
           }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }

        this.setState({
            errors: errors
        });
        return error_flag;
    }

    resetPassword = () => {
        if(!this.validateForm())
        {
            let code = window.location.href.split("/").pop();
            fetch(Constants.Resetpassword,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    code:code,
                    password:this.state.resetPass
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
                {
                    this.setState({
                        "error_msg":data.responseMessage+". Redirecting you to login screen"
                    })

                    setTimeout(function(){
                        window.location = "/";
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }
                else
                {
                    setTimeout(function(){
                        this.setState({"error_msg":data.responseMessage});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                    
                }
            });
        }
    }

    render(){
        const {resetPass,resetCPass,fromSubmitted} = this.state;
        return(
            <Router>
                <div>
                    <Fonts/>
                    <GlobalStyle/>
                    <ResetPasswordSection>
                        <ResetCard>
                        {
                            this.state.showLoader &&
                            <LoaderLayout>
                                <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                            </LoaderLayout>
                        }

                        {
                            this.state.componentDidMount && 
                            <ResetPasswordLayout>
                                <RadicalTestLogo src="/assets/radicaltest-logo-dark2.png"/>
                                <ResetPassHeading>{this.state.heading}</ResetPassHeading>

                                {
                                    this.state.isSuccess && 
                                    <div>
                                        <FieldSet>
                                            <InputField type="password" placeholder="Password"
                                            name="resetPass" onChange={this.handleChange} value={resetPass}/>
                                            <ErrorSpan>{this.state.errors.resetPass}</ErrorSpan>
                                        </FieldSet>

                                        <FieldSet>
                                            <InputField type="password" placeholder="Confirm Password"
                                            name="resetCPass" onChange={this.handleChange} value={resetCPass}/>
                                            <ErrorSpan>{this.state.errors.resetCPass}</ErrorSpan>
                                        </FieldSet>

                                        <FieldSet>
                                            <SubmitButton 
                                                as="button"
                                                disabled={fromSubmitted}
                                                onClick={this.resetPassword}>
                                                Reset Password
                                            </SubmitButton>
                                            <ErrorSpan>{this.state.error_msg}</ErrorSpan>
                                        </FieldSet>
                                    </div>
                                }
                                
                            </ResetPasswordLayout>
                        }

                        
                        </ResetCard>
                    </ResetPasswordSection>
                </div>
            </Router>
        );
    }
}

export default ResetPassword;