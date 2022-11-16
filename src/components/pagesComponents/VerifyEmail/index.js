import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {VerifySection,MainContainer,VerifyEmailCard,RadicalTestLogo,
    VerifyHeading,FailedIcon,SuccessIcon,MessageText,LoginBtn} from './verifyemail.style';
import {getLocalStorageVariables,isEmptyVariable,ifEmptyReturnNA} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class VerifyEmail extends Component{
    constructor(props){
        super(props);
        this.state = {
            isValidCode:false,
            componentDidMountFlag:false
        }
    }

    componentDidMount()
    {
        let code = window.location.href.split("/").pop();
        fetch(Constants.Checkemailverificationcode,
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
                    this.verifyEmail();
                }else{
                    this.setState({
                        isValidCode:false,
                        componentDidMountFlag:true,
                    });
                }
            });
    }

    verifyEmail()
    {
        let code = window.location.href.split("/").pop();
        fetch(Constants.Verifyemail,
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
                        isValidCode:true,
                        componentDidMountFlag:true,
                    });
                }else{
                    this.setState({
                        isValidCode:false,
                        componentDidMountFlag:true,
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

                    <VerifySection>

                        <MainContainer>
                            <VerifyEmailCard>
                                <RadicalTestLogo src="/assets/radicaltest-logo-dark2.png"/>
                                <VerifyHeading>Email Verification</VerifyHeading>
                                {
                                    this.state.componentDidMountFlag && this.state.isValidCode &&
                                    <Router>
                                        <SuccessIcon />
                                        <MessageText>Your email has been verified successfully.</MessageText>
                                    </Router>
                                }
                                {
                                    this.state.componentDidMountFlag && !this.state.isValidCode &&
                                    <Router>
                                        <FailedIcon />
                                        <MessageText>The link is invalid or broken. Please contact Radical Test team.</MessageText>
                                    </Router>
                                }
                                {
                                    this.state.componentDidMountFlag && 
                                    <LoginBtn href="/">Login Now</LoginBtn>
                                }
                            </VerifyEmailCard>
                        </MainContainer>
                        
                    </VerifySection>
                    
                </div>
            </Router>
        );
    
    }
}

export default VerifyEmail;