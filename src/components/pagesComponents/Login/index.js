import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {LoginSection,LeftLayout,TextLayout,TextLayoutHeading,ListLayout,
    TickMark,ListText,RightLayout,LoaderLayout,LoginLayout,Logo,LoginHeading,FieldSet,InputBox,
    ErrorSpan,SubmitButton,ForgotPasswordText,TermsText,OrLayout,OrDivider,
    RegisterLayout,CommonText,RegisterButton,TermsLink,LoginLayoutWrapper,
    BottomLinksLayout,BottomLink,LoginCard} from './login.style';
import * as Constants from '../../commonComponents/constants';
import {isEmptyVariable} from '../../commonComponents/commonFunctions';
import SpinnerLoader from 'react-loader-spinner';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertDialog from '../../commonComponents/AlertDialog';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            showLogin:true,
            showForgotPassword:false,
            showRegister:false,
            formSubmitted:false,
            showLoader:false,

            errors:[],
            loginEmail:"",
            loginPassword:"",

            loggedInUserName:'',
            loggedInUserType:'',
            loggedInUserId:'',
            loggedInAccessToken:'',
            

            registerErrors:[],
            registerName:"",
            registerEmail:"",
            registerPassword:"",
            registerCPassword:"",  
            register_privacy:"Y",

            forgotEmail:"",
            forgotErrors:[],

            showAlertDialogInfo:false,

        }
    }

    componentDidMount(){
        if(localStorage.getItem('loggedInUserDetails')){
            this.props.history.push('/dashboard');
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    validateCheckLoginForm()
    {
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.loginEmail))
        {
            error_flag = true;
            errors['loginEmail'] = "Please enter email!";
        }

        if(!isEmptyVariable(this.state.loginEmail))
        {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(this.state.loginEmail)) {
                error_flag = true;
                errors["loginEmail"] = "Please enter valid email!";
            }
        }
        if(isEmptyVariable(this.state.loginPassword))
        {
            error_flag = true;
            errors['loginPassword'] = "Please enter password!";
        }
        
        this.setState({
            errors: errors
        });

        return error_flag;
    }

    saveLocalStorage = (loggedInUserEmail,loggedInProPic,loggedInUserType,
        loggedInFirstName,loggedInAccessToken) =>{
        let parameters = {
            loggedInUserEmail:loggedInUserEmail,
            loggedInProPic:loggedInProPic,
            loggedInUserType:loggedInUserType,
            loggedInFirstName:loggedInFirstName,
            loggedInAccessToken:loggedInAccessToken,
        };

        cookies.set('loggedInUserEmail', loggedInUserEmail, { path: '/' });
        cookies.set('loggedInAccessToken', loggedInAccessToken, { path: '/' });

        localStorage.clear();
        localStorage.setItem('loggedInUserDetails', JSON.stringify(parameters));
    }

    handleClose = () =>{
        this.setState({
            showAlertDialogInfo:false
        });
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            this.checkLogin();
        }
    }

    /*********************** API CALLS *************************/
    checkLogin = () => {

        this.setState({
            formSubmitted:true,
            showLoader:true,
        });

        const { loginEmail, loginPassword } = this.state;
        
        if(!this.validateCheckLoginForm())
        {
            fetch(Constants.CheckLogin,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:loginEmail, 
                    password:loginPassword
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
                {
                    this.setState(
                        { 
                            loggedInUserEmail: data.data.email,
                            loggedInUserType: data.data.userType,
                            loggedInProPic:data.data.profilePic,
                            loggedInFirstName:data.data.firstName,
                            loggedInAccessToken:data.data.accessToken,

                        },()=>{

                            this.saveLocalStorage(this.state.loggedInUserEmail,
                                this.state.loggedInProPic,this.state.loggedInUserType,
                                this.state.loggedInFirstName,this.state.loggedInAccessToken,);

                            this.props.history.push('/dashboard');
                        });
                }
                else
                {
                    let errors = {};
                    errors['invalidLogin'] = data.responseMessage;

                    this.setState({
                        formSubmitted:false,
                        showLoader:false,
                        errors: errors
                    });

                    setTimeout(function(){
                        this.setState({errors:[]});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }    
            });
        }
        else
        {
            setTimeout(function(){
                this.setState({errors:[]});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);

            this.setState({
                formSubmitted:false,
                showLoader:false,
            });
        }
    }

    submitRegister=(e)=>{
        e.preventDefault();

        this.setState({
            formSubmitted:true,
            showLoader:true,
        });

        var error_flag = false;
        let errors = {};

        if (isEmptyVariable(this.state.registerName)) {
            error_flag = true;
            errors['registerName'] = "Please enter name";
        }

        if (isEmptyVariable(this.state.registerEmail)) {
            error_flag = true;
            errors['registerEmail'] = "Please enter email!";
        }

        if(!isEmptyVariable(this.state.registerEmail))
        {
            var reg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if( !reg.test( this.state.registerEmail ) )
            {
                error_flag = true;
                errors['registerEmail'] = "Please enter valid email";
            }
        }

        if (isEmptyVariable(this.state.registerPassword)) {
            error_flag = true;
            errors['registerPassword'] = "Please enter password";
        }

        if (isEmptyVariable(this.state.registerCPassword)) {
            error_flag = true;
            errors['registerCPassword'] = "Please enter confirm password";
        }

        if (!isEmptyVariable(this.state.registerPassword) &&
            !isEmptyVariable(this.state.registerCPassword) &&
            this.state.registerPassword !== this.state.registerCPassword) {
            error_flag = true;
            errors['registerCPassword'] = "Password mismatch";
        }
       
        if (!error_flag)
        {
            Promise.all([fetch(Constants.Register,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                    {
                        email:this.state.registerEmail, 
                        name:this.state.registerName, 
                        password:this.state.registerPassword,
                    }
                )
            })
            ])
            .then(([res1]) => { 
                return Promise.all([res1.json()]) 
            })
            .then(([res1]) => {
                if(res1.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
                {
                    this.setState({
                        registerErrors:[],
                        registerName:"",
                        registerEmail:"",
                        registerPassword:"",
                        registerCPassword:"",
                    },()=>{
                        this.saveLocalStorage(res1.data.email,
                            res1.data.profilePic,res1.data.userType,
                            res1.data.firstName,res1.data.accessToken);
                        
                        this.props.history.push('/dashboard');
                    });
                }
                else
                {
                    let errors = {};
                    errors['registrationFailed'] = res1.responseMessage;

                    this.setState({
                        registerErrors: errors,
                        formSubmitted:false,
                        showLoader:false,
                    });

                    setTimeout(function(){
                        this.setState({registerErrors:[]});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }   
            });
        }else{
            this.setState({
                registerErrors: errors
            });

            setTimeout(function(){
                this.setState({registerErrors:[]});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);

            this.setState({
                formSubmitted:false,
                showLoader:false,
            });
        }
    }

    submitForgotPass = () => {
        this.setState({
            formSubmitted:true,
            showLoader:true,
        });

        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.forgotEmail))
        {
            error_flag = true;
            errors['forgotEmail'] = "Please enter email!";
        }

        if(!isEmptyVariable(this.state.forgotEmail))
        {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!pattern.test(this.state.forgotEmail)) {
                error_flag = true;
                errors["forgotEmail"] = "Please enter valid email";
            }
        }

        if (!error_flag)
        {
            fetch(Constants.ForgotPassword,
                {
                    method: "POST",
                    mode:'cors',
                    body: new URLSearchParams({email:this.state.forgotEmail})
                })
                .then(response => { return response.json(); } )
                .then(data =>
                {
                    let errors = {};
                    errors['responseMessage'] = data.responseMessage;
                    
                    this.setState({
                        formSubmitted:false,
                        showLoader:false,
                        forgotErrors: errors,
                        forgotEmail:""
                    });

                    setTimeout(function(){
                        this.setState({forgotErrors:[]});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                });

        }else{
            this.setState({
                forgotErrors: errors
            });

            setTimeout(function(){
                this.setState({forgotErrors:[]});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);

           this.setState({
                formSubmitted:false,
                showLoader:false,
            });
        }
    }

    render(){
        const {loginEmail,loginPassword,formSubmitted,forgotEmail} = this.state;
        const {registerName,registerEmail,registerPassword,
            registerCPassword} = this.state;
        return(
            <Router>
                <div>
                    <Fonts/>
                    <GlobalStyle/>
                    
                        <LoginSection>
                            <LeftLayout>
                                <TextLayout>
                                    <TextLayoutHeading>Automate your tests quickly and easily using Radical Test</TextLayoutHeading>
                                    <ListLayout>
                                        <TickMark />
                                        <ListText>Create test using web elementary inputs</ListText>
                                    </ListLayout>
                                    <ListLayout>
                                        <TickMark />
                                        <ListText>Run tests on across different platforms</ListText>
                                    </ListLayout>
                                    <ListLayout>
                                        <TickMark />
                                        <ListText>Modularise your actions and elements to reuse later</ListText>
                                    </ListLayout>
                                    <ListLayout>
                                        <TickMark />
                                        <ListText>Analyse detailed reports for test runs</ListText>
                                    </ListLayout>
                                    <ListLayout>
                                        <TickMark />
                                        <ListText>Locate elements using our optimised AI based element finder</ListText>
                                    </ListLayout>
                                </TextLayout>
                            </LeftLayout>

                            <RightLayout>
                            {
                                this.state.showLogin && 
                                <LoginLayoutWrapper>
                                <LoginCard>
                                    {
                                        this.state.showLoader &&
                                        <LoaderLayout>
                                            <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                        </LoaderLayout>
                                    }
                                    <LoginLayout>
                                        <a href = "https://www.radicaltest.com/">
                                        <Logo src="/assets/radicaltest-logo-dark2.png" />
                                        </a>
                                        <LoginHeading>Login to your Account</LoginHeading>
                                        <FieldSet>
                                            <InputBox type="text" placeholder="Email" autoFocus 
                                                name="loginEmail" onChange={this.handleChange} value={loginEmail}/>
                                            <ErrorSpan>{this.state.errors.loginEmail}</ErrorSpan>
                                        </FieldSet>

                                        <FieldSet>
                                            <InputBox type="password" placeholder="Password" onKeyPress={this.onEnterBtnPress}
                                            name="loginPassword" onChange={this.handleChange} value={loginPassword}/>
                                            <ErrorSpan>{this.state.errors.loginPassword}</ErrorSpan>
                                        </FieldSet>

                                        <FieldSet>
                                            <SubmitButton 
                                                as="button"
                                                disabled={formSubmitted}
                                                onClick={this.checkLogin}>
                                                Login
                                            </SubmitButton>
                                            <ErrorSpan>{this.state.errors.invalidLogin}</ErrorSpan>
                                        </FieldSet>

                                        <ForgotPasswordText onClick={()=>{this.setState({showLogin:false,showForgotPassword:true,showRegister:false,})}}>Forgot Password?</ForgotPasswordText>
                                        
                                        <OrLayout>
                                            <OrDivider/>
                                            {/* <OrText>Or Login Using</OrText> */}
                                            <OrDivider/>
                                        </OrLayout>
                                        
                                        <RegisterLayout>
                                            <CommonText>New to Radical Test?</CommonText>
                                            <RegisterButton href="javascript:void(0)" onClick={()=>{this.setState({showLogin:false,showForgotPassword:false,showRegister:true,})}}>Sign Up</RegisterButton>
                                        </RegisterLayout>
                                    </LoginLayout>
                                </LoginCard>
                                <BottomLinksLayout>
                                    <BottomLink href="https://www.radicaltest.com/">Home</BottomLink>
                                    <BottomLink href="https://www.radicaltest.com/privacy-policy/">Privacy</BottomLink>
                                    <BottomLink href="https://www.radicaltest.com/terms-conditions/">Terms</BottomLink>
                                    <BottomLink href="https://www.radicaltest.com/contact/">Contact</BottomLink>
                                </BottomLinksLayout>
                                </LoginLayoutWrapper>
                            }
                            {
                                this.state.showRegister && 
                                <LoginLayoutWrapper>
                                <LoginCard>
                                    {
                                        this.state.showLoader &&
                                        <LoaderLayout>
                                            <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                        </LoaderLayout>
                                    }
                                    <LoginLayout>
                                        <a href = "https://www.radicaltest.com/">
                                        <Logo src="/assets/radicaltest-logo-dark2.png" />
                                        </a>
                                        <LoginHeading>Create a new Account</LoginHeading>
                                        <FieldSet>
                                            <InputBox type="text" placeholder="Full Name"
                                            name="registerName" onChange={this.handleChange} value={registerName}/>
                                            <ErrorSpan>{this.state.registerErrors.registerName}</ErrorSpan>
                                        </FieldSet>
                                        <FieldSet>
                                            <InputBox type="text" placeholder="Email"
                                            name="registerEmail" onChange={this.handleChange} value={registerEmail}/>
                                            <ErrorSpan>{this.state.registerErrors.registerEmail}</ErrorSpan>
                                        </FieldSet>
                                        <FieldSet>
                                            <InputBox type="password" placeholder="Password"
                                            name="registerPassword" onChange={this.handleChange} value={registerPassword}/>
                                            <ErrorSpan>{this.state.registerErrors.registerPassword}</ErrorSpan>
                                        </FieldSet>
                                        <FieldSet>
                                            <InputBox type="password" placeholder="Confirm Password"
                                            name="registerCPassword" onChange={this.handleChange} value={registerCPassword}/>
                                            <ErrorSpan>{this.state.registerErrors.registerCPassword}</ErrorSpan>
                                        </FieldSet>
                                        <TermsText>By signing up you agree to <TermsLink as="a" href="#">Terms and conditions</TermsLink></TermsText>
                                        <FieldSet>
                                            <SubmitButton 
                                            as="button"
                                            disabled={formSubmitted}
                                            onClick={this.submitRegister}>
                                                Register
                                            </SubmitButton>
                                            <ErrorSpan>{this.state.registerErrors.registrationFailed}</ErrorSpan>
                                        </FieldSet>

                                        <OrLayout>
                                            <OrDivider/>
                                            {/* <OrText>Or Sign Up Using</OrText> */}
                                            <OrDivider/>
                                        </OrLayout>
                                        
                                        <RegisterLayout>
                                            <CommonText>Already Registered?</CommonText>
                                            <RegisterButton href="javascript:void(0)" onClick={()=>{this.setState({showLogin:true,showForgotPassword:false,showRegister:false,})}}>Login</RegisterButton>
                                        </RegisterLayout>
                                    </LoginLayout>
                                </LoginCard>
                                <BottomLinksLayout>
                                    <BottomLink href="#">Home</BottomLink>
                                    <BottomLink href="#">Privacy</BottomLink>
                                    <BottomLink href="#">Terms</BottomLink>
                                    <BottomLink href="#">Contact</BottomLink>
                                </BottomLinksLayout>
                                </LoginLayoutWrapper>
                            }
                            {
                                this.state.showForgotPassword && 
                                <LoginLayoutWrapper>
                                    <LoginCard>
                                        {
                                            this.state.showLoader &&
                                            <LoaderLayout>
                                                <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                            </LoaderLayout>
                                        }
                                        <LoginLayout>
                                            <a href = "https://www.radicaltest.com/">
                                            <Logo src="/assets/radicaltest-logo-dark2.png" />
                                            </a>
                                            <LoginHeading>Forgot Password? </LoginHeading>

                                            <FieldSet>
                                                <InputBox type="text" placeholder="Email"
                                                name="forgotEmail" onChange={this.handleChange} value={forgotEmail}/>
                                                <ErrorSpan>{this.state.forgotErrors.forgotEmail}</ErrorSpan>
                                            </FieldSet>

                                            <FieldSet>
                                                <SubmitButton as="button"
                                                    disabled={formSubmitted}
                                                    onClick={this.submitForgotPass}>Submit</SubmitButton>
                                                <ErrorSpan>{this.state.forgotErrors.responseMessage}</ErrorSpan>
                                            </FieldSet>

                                            <RegisterLayout>
                                                <CommonText>Go to Login</CommonText>
                                                <RegisterButton href="javascript:void(0)" onClick={()=>{this.setState({showLogin:true,showForgotPassword:false,showRegister:false,})}}>Login</RegisterButton>
                                            </RegisterLayout>
                                        </LoginLayout>
                                    </LoginCard>
                                </LoginLayoutWrapper>
                            }
                            </RightLayout>
                        </LoginSection>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleClose}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={Constants.GENERIC_WARNING}
                            proceedBtnClick={this.handleClose}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />
                </div>
            </Router>
        );
    }
}

export default Login;
