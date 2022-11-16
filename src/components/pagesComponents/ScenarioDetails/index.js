import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ActionDetailsSection,MainContainer,LoaderLayout,CardOuterLayout,
    DetailsCard,DetailsLayout,TopLayout,ActionListLayout,
    ActionInfoLayout,TableDetails,TableRow,TableData,BootstrapModal,
    ActionButtonsLayout,ActionButton,ActionAnchor,EditIcon,ActionButtonText,DeleteIcon,
    FaqRow,CancelBtnDialog,SaveBtn,RunIcon} from './scenariodetails.style';
import {CustomContainer,CardHeadingLayout,CardHeading,Table,
    FieldSet,InputLabel,ErrorSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import AlertDialog from '../../commonComponents/AlertDialog'
import Topbar from '../../commonComponents/Topbar'
import {getLocalStorageVariables,getLocalDateFromUTC,isEmptyArray,ifEmptyReturnStr,isJsonString,
    isEmptyVariable} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import SpinnerLoader from 'react-loader-spinner';
import TableRowCustom from './tableRowCustom';
import {Modal} from 'react-bootstrap';
import DropDownRegular from '../../commonComponents/DropDownRegularV2'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import EditScenario from '../AddScenario';

const userDetails  = getLocalStorageVariables();
const ConfigDropdownDefaultText = "Select Config"

class ScenarioDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            project_id:"",
            scenarioId:this.props.match.params.id,
            showLoader:false,
            projectDetails:"",
            scenarioName:"",
            scenarioDescription:"",
            scenarioCreateDate:"",
            actionsArr:[],
            componentDidMountFlag:false,
            showScenarioDetails:false,
            scenarioTags:"",

            showAlertDialog:false,
            alertDialogMessage:"",
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",

            showRunScenariosModal:false,
            selectedConfigName:ConfigDropdownDefaultText,
            selectedConfigId:"",
            configArr:[],
            configErrors:{},

            allExpandFlag:false
        }
    }

    componentDidMount(){
        this.setState({
            showLoader:true
        });
        this.getScenarioDetails();
    }

    //get scenario details from API
    getScenarioDetails = () => {
        fetch(Constants.ScenarioDetails,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                scenarioId:this.state.scenarioId,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                if(!isEmptyVariable(data.data.scenarioDetails)){
                    this.setState({
                        project_id:data.data.projectDetails.projectNo,
                        scenarioName:data.data.scenarioDetails.scenarioName,
                        scenarioDescription:data.data.scenarioDetails.scenarioDescription,
                        scenarioCreateDate:data.data.scenarioDetails.scenarioCreateDate,
                        createdByfullName:data.data.scenarioDetails.createdByfullName,
                        scenarioUpdateDate:data.data.scenarioDetails.scenarioUpdateDate,
                        updatedByfullName:data.data.scenarioDetails.updatedByfullName,
                        scenarioTags:data.data.scenarioDetails.scenarioTags,
                        actionsArr:data.data.scenarioDetails.actionArr,
                        projectDetails:data.data.projectDetails
                    },()=>{
                        this.setState({
                            showLoader:false,
                            componentDidMountFlag:true,
                            showScenarioDetails:true,
                        });
                    })
                }
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            } else {
                this.setState({
                    actionsArr:[],
                    projectDetails:"", //TODO - API is not returning this value
                    componentDidMountFlag:true,
                    showLoader:false,
                    showScenarioDetails:false,
                })
            }
        });
    }

    openDeleteDialog =()=>{
        this.setState({
            showAlertDialog:true,
            alertDialogMessage:Constants.SCENARIOS_DELETE_WARNING
        });
    }

    handleAlertDialogClose = () =>{
        this.setState({
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }

    handleAlertDialogCloseInfo = () => {
        this.setState({
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        })
    }

    handleShowEditScenario = () =>{
        this.setState({
            showScenarioDetails: false,
            showAddScenario:true,
            isEdit:true,
        }) 
    }

    hideAddEditScenario = (refreshFlag)=>{
        this.setState({
            showScenarioDetails: true,
            isEdit:false,
            showAddScenario:false,
            deleteEditScenarioId:""
            
        },()=>{
            if(refreshFlag){
                this.getScenarioDetails();
            }
        });
    }

    onClickRunScenarios = () => {
        this.setState({
            showLoader:true,
        });

        fetch(Constants.ConfigList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.project_id,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                let configArr = data.data?.result;
                let configArrNew = configArr.map((item)=>{
                    item.nameWithBrowser = item.name + "(" + 
                                            item.browsers + ", " + item.resolutions+ ")";
                    return item;
                })
                this.setState({
                    showLoader:false,
                    configArr:configArrNew,
                    totalSelectionCount:1,
                    showRunScenariosModal:true
                })
            }else{
                this.setState({
                    showLoader:false,
                    configArr:[],
                    showRunScenariosModal:true
                })
            }
        });
    }

    runScenariosApi = () => {
        //TODO validation is required.
        let scenarioIds = [];
        if(isEmptyVariable(this.state.scenarioId)){
        }else{
            scenarioIds.push(this.state.scenarioId)
            fetch(Constants.RunScenarios,
                {
                    method: "POST",
                    mode:'cors',
                    body: new URLSearchParams(
                        {
                            email:userDetails.email,
                            accessToken:userDetails.accessToken,
                            projectNo:this.state.project_id,
                            scenarioIds:JSON.stringify(scenarioIds),
                            masterConfigId:this.state.selectedConfigId
                        })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.props.history.push('/projects/reports/'+this.state.project_id);
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    })
                }
            });
        }

    }

    handleRunScenariosModalClose = () => {
        this.setState({
            showRunScenariosModal:false,
            selectedConfigName:ConfigDropdownDefaultText,
            selectedConfigId:"",
            configArr:[],
            configErrors:{}
        })
    }

    configDropdownClick = (item) =>{
        this.setState({
            selectedConfigName:item.name,
            selectedConfigId:item.masterConfigId
        })
    }

    deleteScenario = () =>{
        fetch(Constants.DeleteScenario,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    scenarioId:this.state.scenarioId,
                    projectNo:this.state.project_id
                })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState(
                {
                    showAlertDialog:false,
                    alertDialogMessage:""
                },() => {
                    window.location = Constants.SCENARIO_LISTING_PATH+"/"+this.state.project_id;
                });
            } else {
                this.setState(
                {
                    showAlertDialog:false,
                    alertDialogMessage:"",
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage
                });
            }
        });
    }

    render(){
        const {projectDetails} = this.state;
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
                                title={projectDetails.title}
                                projectDetails={projectDetails}
                                projectNo={this.state.project_id}
                            />

                            {
                                this.state.showLoader &&
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }

                            {
                                this.state.componentDidMountFlag && this.state.showScenarioDetails &&
                                <CustomContainer>
                                    <CardOuterLayout>
                                        <DetailsCard>
                                            <CardHeadingLayout showBottomBorder>
                                                <CardHeading>Scenario Details</CardHeading>
                                            </CardHeadingLayout>
                                            <DetailsLayout>
                                                <TopLayout>
                                                    <ActionInfoLayout>
                                                        <TableDetails>
                                                            <TableRow>
                                                                <TableData>Name</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{this.state.scenarioName}</TableData>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Tags</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{
                                                                    isJsonString(this.state.scenarioTags)
                                                                    ?
                                                                    JSON.parse(this.state.scenarioTags).join(", ")
                                                                    :
                                                                    "-"
                                                                }</TableData>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Created</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{getLocalDateFromUTC(this.state.scenarioCreateDate)+" ("+this.state.createdByfullName+ ")"}</TableData> 
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Last updated</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>
                                                                    {
                                                                        !isEmptyVariable(this.state.scenarioUpdateDate)
                                                                        ?
                                                                        getLocalDateFromUTC(this.state.scenarioUpdateDate)+" ("+this.state.updatedByfullName+ ")"
                                                                        :
                                                                        "-"
                                                                    }
                                                                </TableData> 
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Description</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{ifEmptyReturnStr(this.state.scenarioDescription,"-")}</TableData>
                                                            </TableRow>
                                                        </TableDetails>
                                                    </ActionInfoLayout>

                                                    {
                                                        projectDetails.writeScenariosAndAction === "Y" &&
                                                        <ActionButtonsLayout>
                                                            <ActionAnchor onClick={this.onClickRunScenarios} >
                                                                <ActionButton>
                                                                <RunIcon/>
                                                                    <ActionButtonText>Run</ActionButtonText>
                                                                </ActionButton>
                                                            </ActionAnchor>
                                                            <ActionAnchor onClick={this.handleShowEditScenario} >
                                                                <ActionButton>
                                                                    <EditIcon/>
                                                                    {/* <ActionButtonText>Edit</ActionButtonText> */}
                                                                </ActionButton>
                                                            </ActionAnchor>

                                                            <ActionButton onClick={this.openDeleteDialog.bind(this)}>
                                                                <DeleteIcon/>
                                                                {/* <ActionButtonText>Delete</ActionButtonText> */}
                                                            </ActionButton>
                                                        </ActionButtonsLayout>
                                                    }
                                                </TopLayout>
                                                
                                            </DetailsLayout>
                                        </DetailsCard>

                                        <ActionListLayout marginTop>
                                            <Table>
                                                <thead>
                                                    <tr className="topSticky">
                                                        <th width={"5%"} style={{fontSize:12}}>No</th>
                                                        <th width={"20%"} style={{fontSize:12}}>Action</th>
                                                        <th width={"30%"} style={{fontSize:12}}>Element</th>
                                                        <th width={"18%"} style={{fontSize:12}}>Name</th>
                                                        <th style={{fontSize:12}}>Value</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    this.state.actionsArr.map((item,index)=>{
                                                        return <TableRowCustom
                                                            title={item.type === "primitive"?item.steps[0].stepMasterDisplayName:item.customActionName}
                                                            type={item.type}
                                                            description={item.steps}
                                                            actionArrIndex={index}
                                                            customActionId = {item.customActionId}
                                                            allExpandFlag = {this.state.allExpandFlag}
                                                        />
                                                    })
                                                }
                                            </Table>
                                            <FaqRow>
                                            
                                            </FaqRow>
                                            
                                        </ActionListLayout>
                                    </CardOuterLayout>
                                </CustomContainer>
                            }
                            {
                                !this.state.showScenarioDetails && this.state.isEdit &&
                                <EditScenario
                                    scenarioId={this.state.scenarioId}
                                    projectId={this.state.project_id}
                                    history={this.props.history}
                                    isEdit = {true}
                                    hideAddEditScenario={this.hideAddEditScenario}
                                />
                            }
                                    
                        </MainContainer>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type={Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Scenario"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteScenario}
                            proceedBtnLabel={Constants.SCENARIOS_DELETE_BUTTON}
                        />
                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                        <BootstrapModal show={this.state.showRunScenariosModal} onHide={this.handleRunScenariosModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Run Scenarios</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h6>{this.state.totalSelectionCount+(this.state.totalSelectionCount === 1?" Scenario selected":" Scenarios selected")}</h6>
                                <FieldSet>
                                    <InputLabel>Select Config</InputLabel>
                                    <DropDownRegular 
                                        placeholder={this.state.selectedConfigName}
                                        itemsArr = {this.state.configArr}
                                        onDropDownItemClick = {this.configDropdownClick}
                                        dropDownId = {""}
                                        name={"name"}
                                    />
                                    {
                                        !isEmptyVariable(this.state.configErrors.selectedConfig) &&
                                        <ErrorSpan>{this.state.configErrors.selectedConfig}</ErrorSpan>
                                    }
                                </FieldSet>
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleRunScenariosModalClose}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.runScenariosApi}
                                >Run Scenarios</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                    </ActionDetailsSection>


                </div>
            </Router>
        )
    }
}

export default ScenarioDetails;