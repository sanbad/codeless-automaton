import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import {DashboardSection,MainContainer,
    LoaderLayout,PricingCard,TopHeading,
    PricingCardTopLayout,PricingFeatureListLayout,
    PricingBottomLayout
} from './pricing.style';
import {CustomContainer,CustomRow,CustomCol,
    AddNewBtn} from '../../commonComponents/Global/common.style';
import * as Constants from '../../commonComponents/constants';
import {getLocalStorageVariables, ifEmptyReturnStr, isEmptyVariable, isJsonString} from '../../commonComponents/commonFunctions';
import SpinnerLoader from 'react-loader-spinner';
import {CheckCircleFill} from "@styled-icons/bootstrap/CheckCircleFill";
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import AlertDialog from '../../commonComponents/AlertDialog';
let userDetails  = getLocalStorageVariables();

const resetAlertDialog = {
    showAlertDialog:false,
    alertDialogMessage:"",
    handleAlertDialogClose:()=>{},
    proceedBtnClick:()=>{},
    alertType:Constants.ALERT_TYPE_ALERT,
    proceedBtnLabel:Constants.ALERT_TYPE_OKAY_LABEL
}

class Pricing extends Component{
    constructor(props){
        super(props);
        this.state = {
            profile:{},
            showLoader:true,
            componentDidMount:false,
            toSubscription:"",

            ...resetAlertDialog
        }
    }

    componentDidMount(){
        this.getProfile();
    }

    getProfile()
    {
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
                let profileObj = data.data.result;
                this.setState({
                    profile:profileObj,
                    componentDidMountFlag:true,
                    toSubscription:"",
                    showLoader:false
                })
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location = Constants.WINDOW_LOCATION;
            } else{
                this.setState({
                    profile:"",
                    componentDidMountFlag:true,
                    showLoader:false
                })
            }
        });
    }

    handleAlertDialogCloseInfo = () => {
        this.setState({
            ...resetAlertDialog
        })
    }

    upgradeDowngradeSubscription = (toSubscription) => {
        this.setState({
            showAlertDialog:true,
            alertDialogMessage:"Are you sure you want to change your subscription to "+toSubscription+"?",
            handleAlertDialogClose:this.handleAlertDialogCloseInfo,
            proceedBtnClick:this.upgradeDowngradeSubscriptionApi,
            alertType:Constants.ALERT_TYPE_ALERT,
            proceedBtnLabel:"Yes",
            toSubscription:toSubscription
        })
    }

    upgradeDowngradeSubscriptionApi = () => {
        this.setState({
            ...resetAlertDialog,
            showLoader:true
        })

        fetch(Constants.UpgradeDowngradeSubscription,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                toSubscription:this.state.toSubscription
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){

                if(!isEmptyVariable(data.data?.subscriptionId) && 
                !isEmptyVariable(data.data?.planId)){
                    //now show the razorpay payment dialog
                    // console.log(JSON.stringify(data));
                    this.handlePayment(data.data.subscriptionId, data.data.planId);
                }else{
                    this.getProfile();
                }
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                this.setState({
                    showLoader:false,
                    showAlertDialog:true,
                    alertDialogMessage:data.responseMessage,
                    handleAlertDialogClose:this.handleAlertDialogCloseInfo,
                    proceedBtnClick:this.handleAlertDialogCloseInfo,
                    alertType:Constants.ALERT_TYPE_ALERT,
                    proceedBtnLabel:Constants.ALERT_TYPE_OKAY_LABEL
                })
            }
        })
    }

    handlePayment = (subscriptionId,planId) => {
        userDetails  = getLocalStorageVariables();
        this.setState({
            showLoader:false,
        })
        const options = {
            key: Constants.RAZOR_PAY_KEY,
            subscription_id:subscriptionId,
            name: Constants.RAZORPAY_STD_SUBSCRIPTION,
            description: Constants.RAZORPAY_STD_SUBSCRIPTION,
            theme: {
                "color": "#e5514b"
            },
    
            "handler": (response) => {
                console.log(JSON.stringify(response))
                let post = {
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_subscription_id:response.razorpay_subscription_id,
                    razorpay_signature:response.razorpay_signature,
                    planId:planId,
                    email:userDetails.email,
                    accessToken:userDetails.accessToken
                }
                this.verifySubscription(post);
            },
            
            prefill: {
                name: userDetails.fullName,
                email: userDetails.email
            },
            notes: {
                address: '',
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    verifySubscription = (post) => {
        this.setState({
            showLoader:true
        })
        fetch(Constants.VerifySubscription,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(post)
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.getProfile();
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }
        })
    }

    render(){
        const {chosenPlanDetails} = this.state.profile;
        let chosenPlanDetailsObj = {};
        if(isJsonString(chosenPlanDetails)){
            chosenPlanDetailsObj = JSON.parse(chosenPlanDetails);
        }
        return(
            <Router>
                <div>
                    <Helmet>
                        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                    </Helmet>
                    <GlobalStyle />
                    <Fonts />

                    <DashboardSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                title="Pricing"
                            />
                            {
                                this.state.showLoader &&
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }
                            {
                                !this.state.componentDidMount &&
                                <CustomContainer>
                                    <CustomRow>
                                        <CustomCol lg="4" md="4">
                                            <PricingCard>
                                                <TopHeading>Free</TopHeading>
                                                <PricingCardTopLayout>
                                                    <img src="/assets/free-lisence.svg" />
                                                    <h4>Free</h4>
                                                    <p>Free forever</p>
                                                    {
                                                        (this.state.profile.plan === "STANDARD" || 
                                                        this.state.profile.plan === "CUSTOM") &&
                                                        <AddNewBtn as="button" onClick={this.upgradeDowngradeSubscription.bind(this,"FREE")}>Downgrade</AddNewBtn>
                                                    }
                                                    {
                                                        this.state.profile.plan === "FREE" &&
                                                        <span>Your Current Plan</span>
                                                    }
                                                    
                                                </PricingCardTopLayout>
                                                <PricingFeatureListLayout>
                                                    <ul>
                                                        <li><CheckCircleFill />2 Projects</li>
                                                        <li><CheckCircleFill />1 User</li>
                                                        {/*<li>50 Automation Steps</li> */}
                                                        <li><CheckCircleFill />Live Execution Logs</li>
                                                        <li><CheckCircleFill />Download PDF reports</li>
                                                        <li><CheckCircleFill />Platforms: </li>
                                                        <li>
                                                            <ul
                                                                style={{
                                                                    marginLeft:50,
                                                                }}
                                                            >
                                                                <li style={{fontSize:13}}>Linux - Firefox Latest</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </PricingFeatureListLayout>

                                                <PricingBottomLayout>
                                                    <p>*You get one parallel run</p>
                                                </PricingBottomLayout>
                                            </PricingCard>
                                        </CustomCol>
                                        <CustomCol lg="4" md="4">
                                            <PricingCard>
                                                <TopHeading>Standard</TopHeading>
                                                <PricingCardTopLayout>
                                                    <img src="/assets/standard-lisence.svg" />
                                                    <h4>25$/month</h4>
                                                    <p>&nbsp;</p>
                                                    {
                                                        this.state.profile.plan === "FREE" &&
                                                        <AddNewBtn  onClick = {this.upgradeDowngradeSubscription.bind(this,"STANDARD")}>Upgrade</AddNewBtn>
                                                    }
                                                    {
                                                        this.state.profile.plan === "STANDARD" &&
                                                        <span>Your Current Plan</span>
                                                    }
                                                    {
                                                        this.state.profile.plan === "CUSTOM" &&
                                                        <AddNewBtn as="button" onClick={this.upgradeDowngradeSubscription.bind(this,"STANDARD")}>Downgrade</AddNewBtn>
                                                    }
                                                </PricingCardTopLayout>
                                                <PricingFeatureListLayout>
                                                    <ul>
                                                        <li><CheckCircleFill />5 Projects</li>
                                                        <li><CheckCircleFill />5 Users</li>
                                                        {/*<li>50 Automation Steps</li> */}
                                                        <li><CheckCircleFill />Live Execution Logs</li>
                                                        <li><CheckCircleFill />Download PDF reports</li>
                                                        <li>
                                                            <CheckCircleFill />
                                                            Platforms: 
                                                        </li>
                                                        <li>
                                                            <ul
                                                                style={{
                                                                    marginLeft:50,
                                                                }}
                                                            >
                                                                <li style={{fontSize:13}}>Linux - Chrome Latest</li>
                                                                <li style={{fontSize:13}}>Linux - Firefox Latest</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </PricingFeatureListLayout>

                                                <PricingBottomLayout>
                                                    <p>*You get one parallel run</p>
                                                </PricingBottomLayout>
                                            </PricingCard>
                                        </CustomCol>
                                        <CustomCol lg="4" md="4">
                                            <PricingCard>
                                                <TopHeading>Enterprise</TopHeading>
                                                <PricingCardTopLayout>
                                                    <img src="/assets/enterprise-lisence.svg" />
                                                    {
                                                        isEmptyVariable(this.state.profile.chosenRazorPayPlanId)
                                                        ?
                                                        <h4>Contact Sales</h4>
                                                        :
                                                        <h4>{isEmptyVariable(this.state.profile?.chosenPlanAmount)?"NA":this.state.profile?.chosenPlanAmount+"$/month"}</h4>
                                                    }
                                                    <p>&nbsp;</p>
                                                    {
                                                        isEmptyVariable(this.state.profile.chosenRazorPayPlanId)
                                                        ?
                                                        <AddNewBtn>Contact</AddNewBtn>
                                                        :
                                                        (
                                                            <>
                                                                {
                                                                    (this.state.profile.plan === "STANDARD" ||
                                                                    this.state.profile.plan === "FREE") &&
                                                                    <AddNewBtn as="button" onClick={this.upgradeDowngradeSubscription.bind(this,"CUSTOM")}>Upgrade</AddNewBtn>
                                                                }
                                                                {
                                                                    this.state.profile.plan === "CUSTOM" &&
                                                                    <span>Your Current Plan</span>
                                                                }
                                                            
                                                            </>
                                                        )

                                                    }
                                                    
                                                </PricingCardTopLayout>
                                                <PricingFeatureListLayout>
                                                    <ul>
                                                        <li><CheckCircleFill />{ifEmptyReturnStr(chosenPlanDetailsObj?.noOfProjects,"NA")} Projects</li>
                                                        <li><CheckCircleFill />{ifEmptyReturnStr(chosenPlanDetailsObj?.teamMembers,"NA")} Users</li>
                                                        {/*<li>{ifEmptyReturnStr(chosenPlanDetailsObj?.automationSteps,"NA")} Automation Steps</li> */}
                                                        
                                                        {
                                                            isEmptyVariable(this.state.profile.chosenRazorPayPlanId)
                                                            ?
                                                            <li><CheckCircleFill />Live Execution Logs</li>
                                                            :
                                                            chosenPlanDetailsObj?.liveExecutionLogs === "Y" &&
                                                            <li><CheckCircleFill />Live Execution Logs</li>
                                                        }
                                                        {
                                                            isEmptyVariable(this.state.profile.chosenRazorPayPlanId)
                                                            ?
                                                            <li><CheckCircleFill />Execution Videos</li>
                                                            :
                                                            chosenPlanDetailsObj?.executionVideo === "Y" &&
                                                            <li><CheckCircleFill />Execution Videos</li>
                                                        }
                                                        {
                                                            isEmptyVariable(this.state.profile.chosenRazorPayPlanId)
                                                            ?
                                                            <li><CheckCircleFill />Download PDF reports</li>
                                                            :
                                                            chosenPlanDetailsObj?.downloadReport === "Y" &&
                                                            <li><CheckCircleFill />Download PDF reports</li>
                                                        }
                                                        {
                                                            isEmptyVariable(this.state.profile.chosenRazorPayPlanId)
                                                            ?
                                                            <li><CheckCircleFill />Mail PDF reports</li>
                                                            :
                                                            chosenPlanDetailsObj?.mailReport === "Y" &&
                                                            <li><CheckCircleFill />Mail PDF reports</li>
                                                        }
                                                        <li>
                                                            <CheckCircleFill />
                                                            Platforms: 
                                                        </li>
                                                        <li>
                                                            <ul
                                                                style={{
                                                                    marginLeft:50,
                                                                }}
                                                            >
                                                                <li style={{fontSize:13}}>Linux - Chrome Latest</li>
                                                                <li style={{fontSize:13}}>Linux - Firefox Latest</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </PricingFeatureListLayout>

                                                <PricingBottomLayout>
                                                    {
                                                        isEmptyVariable(this.state.profile.chosenRazorPayPlanId)
                                                        ?
                                                        <p>*Unlimited parallel run(s)</p>
                                                        :
                                                        !isEmptyVariable(chosenPlanDetailsObj?.parallelRuns) &&
                                                        <p>*{chosenPlanDetailsObj?.parallelRuns} parallel run(s)</p>

                                                    }
                                                </PricingBottomLayout>
                                            </PricingCard>
                                        </CustomCol>
                                    </CustomRow>
                                </CustomContainer>
                            }
                        </MainContainer>
                    </DashboardSection>

                    <AlertDialog 
                        showAlertDialog={this.state.showAlertDialog}
                        alertDialogMessage={this.state.alertDialogMessage}
                        handleAlertDialogClose={this.state.handleAlertDialogClose}
                        type= {this.state.alertType}
                        proceedBtnClick={this.state.proceedBtnClick}
                        proceedBtnLabel={ this.state.proceedBtnLabel }
                    />
                </div>
            </Router>
        )
    }
}

export default Pricing;