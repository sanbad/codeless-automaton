import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import {ProjectDetailsSection,LiveLogsLayout,ScenarioLayout,MainContainer,
    LoaderLayout,
    StepRow,StepCell} from './livelogs.style';
import {CustomContainer} from '../../commonComponents/Global/common.style';
import {getLocalStorageVariables,isEmptyVariable,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SpinnerLoader from 'react-loader-spinner';
import AlertDialog from '../../commonComponents/AlertDialog';

const userDetails  = getLocalStorageVariables();

class ProjectDetails extends Component{
    constructor(props){
        super(props);
        let id = this.props.match.params.id;
        let executionMasterId = id.split("-")[0];
        let masterBrowserId = id.split("-")[1];

        this.state = {
            projectId:this.props.match.params.id,
            projectDetails:{},
            datalist:{},
            showLoader:false,
            projectName:"",
            actionName:"",
            actionDescription:"",
            actionCreateDate:"",
            stepsArr:[],
            componentDidMountFlag:false,
            showProjectDetail:false,
            refreshFlag:true,

            executionMasterId:executionMasterId,
            masterBrowserId:masterBrowserId,

            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
        }
    }

    componentDidMount(){
        this.setState({
            showLoader:true
        },()=>{
            this.getLivelogs();
        });
        
    }

    handleAlertDialogCloseInfo = () => {
        this.setState({
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        })
    }


    //get action details from API
    getLivelogs = () => {
        fetch(Constants.GetLivelogs,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                executionMasterId:this.state.executionMasterId,
                masterBrowserId:this.state.masterBrowserId,
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
                let parsedData = [];
                let runStartedMessage = "";
                let runCompletedMessage = "";
                let formattedData = {};

                try{
                    parsedData = JSON.parse(data.data);
                }catch(e){
                    parsedData = [];
                }

                let scenarioPos = 1;
                !isEmptyArray(parsedData.data) &&
                parsedData.data.forEach(item=>{
                    if(!isEmptyVariable(item.message)){
                        if(item.message.includes("started")){
                            runStartedMessage = item.message;
                        }
                        if(item.message.includes("Execution Completed")){
                            runCompletedMessage = item.message;
                        }
                    }else if(!isEmptyVariable(item.scenarioId)){

                        if(isEmptyVariable(formattedData[item.scenarioId])){
                            formattedData[item.scenarioId] = {};
                            formattedData[item.scenarioId].scenarioPos = scenarioPos++;
                            formattedData[item.scenarioId].scenario = item.scenario;
                            formattedData[item.scenarioId].scenarioId = item.scenarioId;
                            formattedData[item.scenarioId].steps = {};
                            formattedData[item.scenarioId].stepPos = 1;
                            formattedData[item.scenarioId].steps["1::"+item.scenarioActionId+"::"+item.stepId] = item;
                        }else{
                            let stepsPos = formattedData[item.scenarioId].stepPos;
                            if(isEmptyVariable(formattedData[item.scenarioId].steps[stepsPos+"::"+item.scenarioActionId+"::"+item.stepId])){
                                stepsPos++;
                                formattedData[item.scenarioId].stepPos = stepsPos;
                                formattedData[item.scenarioId].steps[stepsPos+"::"+item.scenarioActionId+"::"+item.stepId] = item;
                            }else{
                                formattedData[item.scenarioId].steps[stepsPos+"::"+item.scenarioActionId+"::"+item.stepId] = item;
                            }
                        }
                    }
                })

                // console.log("DAAAA: "+JSON.stringify(formattedData));
                const keys = Object.keys(formattedData);
                keys.sort((a, b) => {
                    let newA = formattedData[a].scenarioPos;
                    let newB = formattedData[b].scenarioPos;
                    return newA - newB;
                });

                let sortedScenarioArr = [];
                keys.forEach((scenarioIndex) => {
                    let stepsTemp = [];
                    let scenarioObj = {};
                    // now lets get the steps and sort it
                    let stepKeys = Object.keys(formattedData[scenarioIndex].steps);
                    stepKeys.sort((a, b) => {
                        let aArr = a.split("::")
                        let newA = parseInt(aArr[0]);
                        let bArr = b.split("::")
                        let newB = parseInt(bArr[0]);
                        return newA - newB;
                    });

                    // console.log("STEP STORED: "+JSON.stringify(stepKeys));
                    
                    stepKeys.forEach(stepIndex=>{
                        stepsTemp.push(formattedData[scenarioIndex].steps[stepIndex])
                    });

                    scenarioObj.scenario = formattedData[scenarioIndex].scenario;
                    scenarioObj.steps = stepsTemp;

                    sortedScenarioArr.push(scenarioObj);
                });

                let refreshFlag = false;
                console.log(runCompletedMessage);
                if(isEmptyVariable(runCompletedMessage)){
                    refreshFlag = true;
                }

                // console.log("SORTED: "+JSON.stringify(sortedScenarioArr));

                this.setState({
                    refreshFlag:refreshFlag,

                    datalist:sortedScenarioArr,
                    runCompletedMessage:runCompletedMessage,
                    runStartedMessage:runStartedMessage,
                    executionDetails:data.executionDetails,
                    projectDetails:data.projectDetails,
                    configArray:data.configArray,
                    showLoader:false,
                    componentDidMountFlag:true,
                },()=>{
                    if(refreshFlag){
                        setTimeout(() => {
                            this.getLivelogs();
                        },Constants.REFRESH_LIVELOGS_TIMEOUT);
                    }
                })
            } else {
                this.setState({
                    datalist:{},
                    showLoader:false,
                    componentDidMountFlag:true,
                })
            }
        });
    }

    render(){
        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <ProjectDetailsSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                showLeftMenu={true}
                                title={this.state.projectDetails.title}
                                projectNo={this.state.projectDetails.projectNo}
                                projectDetails={this.state.projectDetails}
                            />

                            {
                                this.state.showLoader && 
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }

                            {
                                this.state.componentDidMountFlag && this.state.projectDetails &&
                                <CustomContainer>
                                    <LiveLogsLayout>
                                    {
                                        !isEmptyVariable(this.state.runStartedMessage) &&
                                        <ScenarioLayout>
                                            <h6>{this.state.runStartedMessage}</h6>
                                        </ScenarioLayout>
                                    }
                                    {
                                        this.state.datalist.map(item=>{
                                            return <ScenarioLayout>
                                                <h6>{item.scenario}</h6>
                                                {
                                                    item.steps.map((step,index)=>{
                                                        return <StepRow>
                                                            <StepCell>
                                                                <p style={step.result === "skipped"?{opacity:0.6}:{}}>
                                                                    {""+(index+1)+". "+step.step}{isEmptyVariable(step.action)?"":" ["+step.action+"]"}
                                                                </p>
                                                                {
                                                                    !isEmptyVariable(step.element) &&
                                                                    <p style={step.result === "skipped"?{opacity:0.6}:{}}>
                                                                        &nbsp;&nbsp;{"|"}&nbsp;&nbsp;{"Element: "+step.element}
                                                                    </p>
                                                                }
                                                                {
                                                                    !isEmptyVariable(step.nameParam) &&
                                                                    <p style={step.result === "skipped"?{opacity:0.6}:{}}>
                                                                        &nbsp;&nbsp;{"|"}&nbsp;&nbsp;{"Name: "+step.nameParam}
                                                                    </p>
                                                                }
                                                                {
                                                                    !isEmptyVariable(step.data) &&
                                                                    <p style={step.result === "skipped"?{opacity:0.6}:{}}>
                                                                        &nbsp;&nbsp;{"|"}&nbsp;&nbsp;{"Data: "+step.data}
                                                                    </p>
                                                                }
                                                                {
                                                                    step.state === "running" &&
                                                                    <p className="stateblink">
                                                                        running
                                                                    </p>

                                                                }
                                                                {
                                                                    step.result === "pass" &&
                                                                    <p className="resultPass">
                                                                        Passed
                                                                    </p>
                                                                }
                                                                {
                                                                    step.result === "skipped" &&
                                                                    <p className="resultskip">
                                                                        Skipped
                                                                    </p>
                                                                }
                                                                {
                                                                    step.result === "fail" &&
                                                                    <p className="resultfail">
                                                                        Failed&nbsp;&nbsp;
                                                                        {isEmptyVariable(step.error)?"":""+step.error}
                                                                    </p>
                                                                }
                                                                
                                                            </StepCell>

                                                        </StepRow>
                                                    })
                                                }
                                            </ScenarioLayout>
                                        })
                                    }
                                    {
                                        !isEmptyVariable(this.state.runCompletedMessage) &&
                                        <ScenarioLayout>
                                            <h6>{this.state.runCompletedMessage}</h6>
                                        </ScenarioLayout>
                                    }
                                </LiveLogsLayout>
                            </CustomContainer>
                            }
                                    
                        </MainContainer>

                        

                    </ProjectDetailsSection>

                </div>
                <AlertDialog 
                    showAlertDialog={this.state.showAlertDialogInfo}
                    handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                    type= {Constants.ALERT_TYPE_ALERT}
                    alertDialogMessage={this.state.alertDialogMessageInfo}
                    proceedBtnClick={this.handleAlertDialogCloseInfo}
                    proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                />
            </Router>
        )
    }
}

export default ProjectDetails;