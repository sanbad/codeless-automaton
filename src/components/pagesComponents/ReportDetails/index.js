import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ActionDetailsSection,MainContainer,LoaderLayout,CardOuterLayout,
    DetailsCard,DetailsLayout,TopLeftLayout,ActionListLayout,
    ActionInfoLayout,TableDetails,TableRow,TableData,
    FaqRow,RadioButton,RadioLabel,ScenarioCountText,TotalScenarios,TotalSuccessScenarios,TotalFailedScenarios,
    TotalSuccessActions,TotalSkippedActions,
    ButtonContainer,DownloadBtn,MailBtn,ScenarioFilterLayout,FilterHeading,PlatformsLayout,RadioLayout,
    BootstrapModal,CancelBtnDialog,SaveBtn,StatusSpan,SceanrioFilterLayout,ScenarioIconTextLayout,ScenarioCountTextLayout,
    ScenarioTextBottom,ScenarioCountLayout,ButtonsCountLayout,ActionIconTextLayout,ActionCountText,
    ActionButtonsCountLayout,CardHeadingLayoutCustom,MailBtnScenario,CardHeadingCustom,BtnLoaderLayout,
    CrossLayout,PassFailLayout,BottomLayout,GraphLayout, VideoIconTextLayout, VideoAction
} from './reportdetails.style';
import {Modal} from 'react-bootstrap';
import {CustomContainer,CardHeadingLayout,
    CardHeading,CustomRow,CustomCol,
    FieldSet,InputFieldBorder,TextareaFieldBorder,InputLabel,ErrorSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import {getLocalStorageVariables,isEmptyVariable,isEmptyArray, isJsonString,getLocalDateFromUTC} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import SpinnerLoader from 'react-loader-spinner';
import AccordianCustom from './AccordianCustom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import AlertDialog from '../../commonComponents/AlertDialog';
import Donutchart from './donutChart';
import VideoDialog from './videoDialog';
const axios = require('axios');

const userDetails  = getLocalStorageVariables();

class ReportDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            projectId:"",
            executionMasterId:this.props.match.params.id,
            showLoader:false,
            showDownloadLoader:false,
            platformArr:"",
            scenariosArr:"",
            componentDidMountFlag:false,
            scenarioSelection:"all",
            isMailReport:"",
            isDownloadReport:"",
            selectedPlatformIndex:0,  //starting from 0 always
            projectDetails:{},
            passedScenarios:0,
            failedScenarios:0,

            errors:[],
            mailTo:"",
            mailCC:"",
            mailBody:"",
            scenarioCounter:"",
            showAlertDialogInfo:"",
            alertDialogMessageInfo:""
        }
    }

    componentDidMount(){
        this.getReportDetails();
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        if(e.target.name === "scenarioSelection")
        {
            this.setState(
            { 
                [name]: value,
                "scenarioSelection":e.target.value
            },()=>{
                this.getReportDetails();
            });
        }
        else if(e.target.name === "selectedPlatformIndex")
        {
            this.setState(
                { 
                    [name]: parseInt(value)
                },()=>{
                    this.getReportDetails();
                });
        }
        else
        {
            this.setState({ [name]: value });
        }
    }

    showVideoDialog = (videoPath, scenarioName) => {
        this.setState({
            showVideoDialogFlag:true,
            videoPath:videoPath,
            selectedScenarioName:scenarioName
        })
    }

    handleVideoDialogClose = () => {
        this.setState({
            showVideoDialogFlag:false,
            videoPath:"",
            selectedScenarioName:"",
        })
    }

    //get report details from API
    getReportDetails = () => {
        this.setState({
            showLoader:true
        });
        fetch(Constants.ReportDetails,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    executionMasterId:this.state.executionMasterId,
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
                    let dataObj={};
                    try{
                        dataObj = JSON.parse(data.data);
                    }catch(e){
                        dataObj={};
                    }
                    let scenarios = dataObj?.scenarios;

                    //Now lets count passed and failed scenarios
                    let passedScenarios = 0;
                    let failedScenarios = 0;
                    let scenariosEditedArr = [];
                    
                    let totalPassedSteps = 0;
                    let totalFailedSteps = 0;
                    let totalSkippedSteps = 0;

                    !isEmptyArray(scenarios) &&
                    scenarios.forEach((scenario)=>{
                        if(scenario.result === "pass"){
                            passedScenarios++
                        }else{
                            failedScenarios++;
                        }

                        //now lets check the actions array, we need passed, failed and skipped steps count
                        let passedSteps = 0;
                        let failedSteps = 0;
                        let skippedSteps = 0;
                        let editedActionArr = [];

                        scenario.actionArr.forEach(action=>{
                            //if action is primitive it has only one stop or else it has muliple steps
                            let actionResult = "pass";
                            action.steps.forEach(step=>{
                                if(step.result === "pass"){
                                    passedSteps++;
                                }else if(step.result === "fail"){
                                    failedSteps++;
                                    actionResult = "fail";
                                }else{
                                    skippedSteps++;
                                    if(actionResult !== "fail"){
                                        actionResult = "skip";
                                    }
                                }
                            })
                            action.actionResult = actionResult;
                            editedActionArr.push(action);
                        })
                        scenario.actionArr = editedActionArr;

                        // lets add to the mail scenario obj
                        scenario.passedSteps = passedSteps;
                        scenario.failedSteps = failedSteps;
                        scenario.skippedSteps = skippedSteps;

                        //based on the scenario selection radio button decide whether to add this or not
                        if(this.state.scenarioSelection === "all"){
                            scenariosEditedArr.push(scenario);
                        }else if(scenario.result === "pass" && 
                        this.state.scenarioSelection === "pass"){
                            scenariosEditedArr.push(scenario);
                        }else if(scenario.result === "fail" && 
                        this.state.scenarioSelection === "fail"){
                            scenariosEditedArr.push(scenario);
                        }
                        totalPassedSteps+=passedSteps
                        totalFailedSteps+=failedSteps
                        totalSkippedSteps+=skippedSteps
                        
                    })

                    let browserArr = [];
                    let resolution = "";
                    if(data.configArray && isJsonString(data.configArray)){
                        let platforms = JSON.parse(data.configArray);
                        platforms.forEach(item=>{
                            if(isEmptyVariable(item.browserVersion)){
                                browserArr.push(item.browser);
                            }else{
                                browserArr.push(item.browser+" ("+item.browserVersion+")");
                            }
                            resolution = item.resolution;
                        })
                    }
                    let browser = browserArr.join(", ");

                    this.setState({
                        
                        executionNumber:data.executionDetails.executionNumber,
                        executionDate:data.executionDetails.executionDate,
                        executionStatus:data.executionDetails.executionStatus,
                        duration:data.executionDetails.duration,

                        // platformArr:JSON.parse(data.configArray),
                        browser:browser,
                        resolution:resolution,
                        scenariosArr:scenariosEditedArr,
                        passedScenarios:passedScenarios,
                        failedScenarios:failedScenarios,

                        projectNo:data.projectDetails.projectNo,
                        projectDetails:data.projectDetails,
                        // isMailReport:data.reports.isMailReport,
                        // isDownloadReport:data.reports.isDownloadReport,
                        showLoader:false,
                        componentDidMountFlag:true,
                        totalPassedSteps:totalPassedSteps,
                        totalFailedSteps:totalFailedSteps,
                        totalSkippedSteps:totalSkippedSteps,
                    })
                } else {
                    this.setState({
                        scenariosArr:"",
                        platformArr:"",
                        componentDidMountFlag:true,
                    })
                }
            });
    }

    downloadReport = () =>{

        this.setState({
            showDownloadLoader:true
        })

        fetch(Constants.DownloadMailReport,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                executionMasterId:this.state.executionMasterId,
                scenarioSelection:this.state.scenarioSelection,
            })
        })
        .then(response => { return response.json(); } )
        .then(response => {
            if(response.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(response.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                const link = document.createElement('a');
                link.href = response.pdf;
                var filename = "Radical Test-"+this.state.executionNumber+"-report"+'.pdf';
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.remove();

                this.setState({
                    showDownloadLoader:false
                })
            }
        })
    }

    openMailModal = (type,counter) =>{
        if(type === "all")
        {
            this.setState(
                {
                    showMailModal:true,
                    mailTo:"",
                    mailCC:"",
                    mailBody:"",
                    errors:[],
                    scenarioCounter:""
                });
        }
        else
        {
            this.setState(
                {
                    showMailModal:true,
                    mailTo:"",
                    mailCC:"",
                    mailBody:"",
                    errors:[],
                    scenarioCounter:counter
                });
        }
    }

    handleMailClose = () =>{
        this.setState(
        {
            showMailModal:false,
            mailTo:"",
            mailCC:"",
            mailBody:"",
            errors:[],
            scenarioCounter:""
        });
    }

    mailReport = (e) =>{
        e.preventDefault();
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.mailTo))
        {
            error_flag = true;
            errors['mailTo'] = "Please enter to email!";
            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }
        if(!isEmptyVariable(this.state.mailTo))
        {
            var reg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if( !reg.test( this.state.mailTo ) )
            {
                error_flag = true;
                errors['mailTo'] = "Please enter valid email!";
            }
        }
        if(!isEmptyVariable(this.state.mailCC))
        {
            var reg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if( !reg.test( this.state.mailCC ) )
            {
                error_flag = true;
                errors['mailCC'] = "Please enter valid email!";
            }
        }
        if (error_flag) {
            this.setState({
                errors: errors
            });
        }
        else
        {
            fetch(Constants.DownloadMailReport,
                {
                    method: "POST",
                    mode:'cors',
                    body: new URLSearchParams({
                        loginEmail:userDetails.email,
                        loginAccessToken:userDetails.accessToken,
                        executionMasterId:this.state.executionMasterId,
                        scenarioSelection:this.state.scenarioSelection,
                        opType:"email",
                        selectedPlatformIndex:this.state.selectedPlatformIndex,
                        toEmail:this.state.mailTo,
                        ccEmail:this.state.mailCC,
                        bodyEmail:this.state.mailBody,
                        scenarioCounter:this.state.scenarioCounter
                    })
                })
                .then(response => { return response.json(); } )
                .then(data => {
            
                if(data.responseCode === 2)
                {
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }
                else
                {
                    this.setState(
                    {
                        showMailModal:false,
                        mailTo:"",
                        mailCC:"",
                        mailBody:"",
                        errors:[],
                        scenarioCounter:"",
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    });
                }
            })
        }
    }

    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    render(){
        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <ActionDetailsSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                showLeftMenu={true}
                                title={this.state.projectDetails.title}
                                projectDetails={this.state.projectDetails}
                                projectNo={this.state.projectNo}
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
                                    <CardOuterLayout>

                                        <DetailsCard paddingBottom={this.state.executionStatus}>
                                            <CardHeadingLayout showBottomBorder>
                                                <CardHeading>Report Details</CardHeading>
                                            </CardHeadingLayout>
                                            <DetailsLayout>
                                                <TopLeftLayout>
                                                    <ActionInfoLayout paddingBottom={this.state.executionStatus === Constants.REPORTS_STATUS_INITIATED?true:false}>
                                                        <TableDetails>
                                                            <TableRow>
                                                                <TableData>Execution No</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{this.state.executionNumber}</TableData>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Execution Date</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{getLocalDateFromUTC(this.state.executionDate)}</TableData> 
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Duration</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{this.state.duration}</TableData> 
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Browser</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{this.state.browser}</TableData> 
                                                            </TableRow>
                                                            {
                                                                !isEmptyVariable(this.state.resolution) &&
                                                                <TableRow>
                                                                    <TableData>Resolution</TableData>
                                                                    <TableData>:</TableData>
                                                                    <TableData>{this.state.resolution}</TableData> 
                                                                </TableRow>
                                                            }
                                                        </TableDetails>
                                                        {
                                                            this.state.executionStatus === Constants.REPORTS_STATUS_COMPLETED &&
                                                            <StatusSpan color="#4CAF50">{this.state.executionStatus}</StatusSpan>
                                                        }
                                                        {
                                                            this.state.executionStatus === Constants.REPORTS_STATUS_FAILED &&
                                                            <StatusSpan color="#FF0000">{this.state.executionStatus}</StatusSpan>
                                                        }
                                                        {
                                                            this.state.executionStatus === Constants.REPORTS_STATUS_INITIATED &&
                                                            <StatusSpan color="#38b2fe">{this.state.executionStatus}</StatusSpan>
                                                        }
                                                        {
                                                            this.state.executionStatus === Constants.REPORTS_STATUS_ABORTED &&
                                                            <StatusSpan color="#FF0000">{this.state.executionStatus}</StatusSpan>
                                                        }
                                                        {
                                                            this.state.executionStatus === Constants.REPORTS_STATUS_STOPPED &&
                                                            <StatusSpan color="#FF0000">{this.state.executionStatus}</StatusSpan>
                                                        }
                                                    </ActionInfoLayout>
                                                    {
                                                        this.state.executionStatus !== Constants.REPORTS_STATUS_INITIATED &&
                                                        <ScenarioFilterLayout>
                                                            {/* <PlatformsLayout>
                                                                {
                                                                    !isEmptyArray(this.state.platformArr) &&
                                                                    <FilterHeading>Platforms</FilterHeading>
                                                                }
                                                                <CustomRow>
                                                                {
                                                                    !isEmptyVariable(this.state.platformArr) &&
                                                                    this.state.platformArr.map((item,index)=>{
                                                                        return  <CustomCol md={4}>
                                                                            <RadioLayout>
                                                                                <RadioButton id={"isPlatform"+index} name="selectedPlatformIndex" 
                                                                                checked={this.state.selectedPlatformIndex === index?true:false} value={index} onChange={this.handleChange}/>
                                                                                <RadioLabel for={"isPlatform"+index}>{item.browser+" ("+item.version+")"}</RadioLabel>
                                                                            </RadioLayout>
                                                                        </CustomCol>
                                                                    })
                                                                }
                                                                </CustomRow>
                                                            </PlatformsLayout> */}

                                                            <SceanrioFilterLayout>
                                                                <FilterHeading>Scenarios</FilterHeading>
                                                                <PassFailLayout>
                                                                    <RadioLayout>
                                                                        <RadioButton id="allScenarios" name="scenarioSelection" checked={this.state.scenarioSelection === "all"?true:false} value="all" onChange={this.handleChange} />
                                                                        <RadioLabel for="allScenarios">All Scenarios</RadioLabel>
                                                                    </RadioLayout>
                                                                    <RadioLayout marginLeft="15px">
                                                                        <RadioButton id="passedScenarios" name="scenarioSelection" checked={this.state.scenarioSelection === "pass"?true:false} value="pass" onChange={this.handleChange} />
                                                                        <RadioLabel for="passedScenarios">Passed</RadioLabel>
                                                                    </RadioLayout>  
                                                                    <RadioLayout marginLeft="15px">
                                                                        <RadioButton id="failedScenarios" name="scenarioSelection" checked={this.state.scenarioSelection === "fail"?true:false} value="fail" onChange={this.handleChange} />
                                                                        <RadioLabel for="failedScenarios">Failed</RadioLabel>
                                                                    </RadioLayout>
                                                                </PassFailLayout>
                                                            </SceanrioFilterLayout>
                                                        </ScenarioFilterLayout>
                                                    
                                                    }
                                                    <ScenarioCountLayout>
                                                        <ScenarioIconTextLayout>
                                                            <TotalScenarios />
                                                            <ScenarioCountTextLayout>
                                                                <ScenarioCountText>{this.state.passedScenarios+this.state.failedScenarios}</ScenarioCountText>
                                                                <ScenarioTextBottom>Total</ScenarioTextBottom>
                                                            </ScenarioCountTextLayout>
                                                        </ScenarioIconTextLayout>
                                                        <ScenarioIconTextLayout>
                                                            <TotalSuccessScenarios />
                                                            <ScenarioCountTextLayout>
                                                                <ScenarioCountText>{this.state.passedScenarios}</ScenarioCountText>
                                                                <ScenarioTextBottom>Passed</ScenarioTextBottom>
                                                            </ScenarioCountTextLayout>
                                                        </ScenarioIconTextLayout>
                                                        <ScenarioIconTextLayout>
                                                            <TotalFailedScenarios />
                                                            <ScenarioCountTextLayout>
                                                                <ScenarioCountText>{this.state.failedScenarios}</ScenarioCountText>
                                                                <ScenarioTextBottom>Failed</ScenarioTextBottom>
                                                            </ScenarioCountTextLayout>
                                                        </ScenarioIconTextLayout>
                                                    </ScenarioCountLayout>
                                                </TopLeftLayout>
                                                {
                                                    this.state.executionStatus !== Constants.REPORTS_STATUS_INITIATED &&
                                                    <div>
                                                        <GraphLayout>
                                                            {/* GRAPH HERE */}
                                                            <Donutchart
                                                                // donutData={[this.getTaskCount(item.completedTaskCountOverallList), this.getTaskCount(item.incompleteTaskCountOverallList)]}
                                                                donutData={[this.state.totalPassedSteps, this.state.totalFailedSteps,this.state.totalSkippedSteps]}
                                                                id={"totalSteps"}
                                                                labels={["Passed", "Failed","Skipped"]}
                                                            ></Donutchart>
                                                        </GraphLayout>
                                                        {
                                                            !isEmptyArray(this.state.scenariosArr) &&
                                                            <ButtonContainer 
                                                            style={{
                                                                width:"400px",
                                                                justifyContent:"center",
                                                                marginRight:0
                                                            }}>
                                                                {
                                                                    // this.state.isDownloadReport !== "Y" &&
                                                                    <DownloadBtn as="button" onClick={this.downloadReport.bind(this)}>
                                                                        Download Pdf
                                                                        {
                                                                            this.state.showDownloadLoader &&
                                                                            <BtnLoaderLayout>
                                                                                <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR_BTN} height={30} width={30} />
                                                                            </BtnLoaderLayout>
                                                                        }
                                                                    </DownloadBtn>
                                                                }
                                                                {/* {
                                                                    this.state.isMailReport !== "Y" &&
                                                                    <MailBtn  as="button" onClick={this.openMailModal.bind(this,"all","")}>Mail This Report</MailBtn>
                                                                } */}
                                                            </ButtonContainer>
                                                        }
                                                    </div>
                                                }
                                            </DetailsLayout>
                                        </DetailsCard>

                                            
                                        {
                                            !isEmptyArray(this.state.scenariosArr) &&
                                            this.state.scenariosArr.map((item,index) => {
                                            return <DetailsCard marginTop>
                                                <CardHeadingLayoutCustom className="topSticky">
                                                    <CardHeadingCustom>{(index+1)+". Scenario "+": "+item.scenarioName}</CardHeadingCustom>
                                                    <ActionButtonsCountLayout>
                                                        {
                                                            !isEmptyVariable(item.video) &&
                                                            <VideoIconTextLayout as="button"
                                                            onClick={this.showVideoDialog.bind(this,item.video,item.scenarioName)}>
                                                                <VideoAction />
                                                                <ActionCountText>Video</ActionCountText>
                                                            </VideoIconTextLayout>
                                                        }
                                                        <ActionIconTextLayout>
                                                            <TotalSuccessActions />
                                                            <ActionCountText>{item.passedSteps}</ActionCountText>
                                                        </ActionIconTextLayout>
                                                        <ActionIconTextLayout>
                                                            <CrossLayout>
                                                                <div class="lineWrapper">
                                                                    <div class="firstLine"></div>
                                                                    <div class="secondLine"></div>
                                                                </div>
                                                            </CrossLayout>
                                                            <ActionCountText>{item.failedSteps}</ActionCountText>
                                                        </ActionIconTextLayout>
                                                        <ActionIconTextLayout>
                                                            <TotalSkippedActions />
                                                            <ActionCountText>{item.skippedSteps}</ActionCountText>
                                                        </ActionIconTextLayout>

                                                        {
                                                            this.state.isMailReport === "Y" &&
                                                            <MailBtnScenario as="button" onClick={this.openMailModal.bind(this,"",index+1)}>Mail This Scenario</MailBtnScenario>
                                                        }
                                                    </ActionButtonsCountLayout>
                                                </CardHeadingLayoutCustom>

                                                <ActionListLayout>
                                                    <FaqRow>
                                                    {
                                                        item.actionArr.map((itemAction,actionIdx)=>{
                                                            return <AccordianCustom
                                                                title={itemAction.type==="custom"?itemAction.customActionName:itemAction.steps[0].stepMasterDisplayName}
                                                                actionResult={itemAction.actionResult}
                                                                description={itemAction.steps}
                                                                executionMasterId={this.state.executionMasterId}
                                                                type={itemAction.type}
                                                                eventKey={item.scenarioId+"-"+actionIdx}
                                                            />
                                                        })
                                                    }
                                                    </FaqRow>
                                                    
                                                </ActionListLayout>
                                                
                                                
                                            </DetailsCard>
                                            })
                                        }
                                        {
                                            isEmptyArray(this.state.scenariosArr) && 
                                            this.state.executionStatus !== Constants.REPORTS_STATUS_INITIATED &&
                                            <DetailsCard marginTop>
                                                <CardHeadingLayout>
                                                    <CardHeading>No Scenarios Found</CardHeading>
                                                </CardHeadingLayout>
                                            </DetailsCard>
                                        }
                                    </CardOuterLayout>
                                </CustomContainer>
                            }
                                    
                        </MainContainer>

                        {/*Mail Dialog */}
                        <BootstrapModal show={this.state.showMailModal} onHide={this.handleMailClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Send Mail</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FieldSet>
                                    <InputLabel>To</InputLabel>
                                    <InputFieldBorder 
                                        placeholder=""
                                        name="mailTo"
                                        onChange={this.handleChange}
                                        value={this.state.mailTo}
                                    />
                                    <ErrorSpan>{this.state.errors.mailTo}</ErrorSpan>
                                </FieldSet>
                                <FieldSet>
                                    <InputLabel>CC</InputLabel>
                                    <InputFieldBorder 
                                        placeholder=""
                                        name="mailCC"
                                        onChange={this.handleChange}
                                        value={this.state.mailCC}
                                    />
                                    <ErrorSpan>{this.state.errors.mailCC}</ErrorSpan>
                                </FieldSet>
                                <FieldSet>
                                    <InputLabel>Message</InputLabel>
                                    <TextareaFieldBorder 
                                        placeholder=""
                                        name="mailBody"
                                        onChange={this.handleChange}
                                        value={this.state.mailBody}
                                    />
                                    <ErrorSpan>{this.state.errors.mailBody}</ErrorSpan>
                                </FieldSet>
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleMailClose}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.mailReport}
                                >Send</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                    </ActionDetailsSection>

                    <VideoDialog
                        showVideoDialogFlag = {this.state.showVideoDialogFlag}
                        executionMasterId = {this.state.executionMasterId}
                        scenarioName = {this.state.selectedScenarioName}
                        videoPath = {this.state.videoPath}
                        handleVideoDialogClose = {this.handleVideoDialogClose}
                        isImage="N"
                    />


                </div>
            </Router>
        )
    }
}

export default ReportDetails;