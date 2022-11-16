import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ActionDetailsSection,MainContainer,LoaderLayout,CardOuterLayout,
    DetailsCard,DetailsLayout,TopLayout,
    ActionInfoLayout,TableDetails,TableRow,TableData,ActionListLayout,
    ActionButtonsLayout,ActionButton,ActionAnchor,EditIcon,ActionButtonText,DeleteIcon} from './actiondetails.style';
import {CustomContainer,CardHeadingLayout,
    CardHeading,Table,     Th} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import AlertDialog from '../../commonComponents/AlertDialog'
import Topbar from '../../commonComponents/Topbar'
import {getLocalStorageVariables,isEmptyVariable,getLocalDateFromUTC,isJsonString,
    ifEmptyReturnStr} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import SpinnerLoader from 'react-loader-spinner';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import EditAction from "../AddAction";

const userDetails  = getLocalStorageVariables();

class ActionDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            projectId:"",
            actionId:this.props.match.params.id,
            projectDetails:{},
            showLoader:false,
            projectName:"",
            actionName:"",
            actionDescription:"",
            actionCreateDate:"",
            stepsArr:[],
            componentDidMountFlag:false,
            showActionDetails:false,
            actionTags:"",

            showAlertDialog:false,
            alertDialogMessage:"",
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
        }
    }

    componentDidMount(){
        this.setState({
            showLoader:true
        });
        this.getActionDetails();
    }

    openDeleteDialog =()=>{
        this.setState(
        {
            showAlertDialog:true,
            alertDialogMessage:Constants.ACTIONS_DELETE_WARNING
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

    handleShowEditAction = () =>{
        this.setState({
            showActionDetails: false,
            showAddAction:true,
            isEdit:true
        }) 
    }

    handleHideAddEditAction = (refreshFlag)=>{
        this.setState({
            showActionDetails: true,
            isEdit:false,
            showAddAction:false,
            copyEditDeleteActionId:""
            
        },()=>{
            if(refreshFlag){
                this.getActionDetails();
            }
        });
    }

    //get action details from API
    getActionDetails = () => {
        fetch(Constants.ActionDetails,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                actionId:this.state.actionId,
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
                if(!isEmptyVariable(data.data.actionDetails)){
                    this.setState({
                        projectId:data.data.actionDetails.projectNo,
                        actionName:data.data.actionDetails.actionName,
                        actionDescription:data.data.actionDetails.description,
                        actionCreateDate:data.data.actionDetails.actionCreateDate,
                        createdByfullName:data.data.actionDetails.createdByfullName,
                        actionUpdateDate:data.data.actionDetails.actionUpdateDate,
                        updatedByfullName:data.data.actionDetails.updatedByfullName,
                        stepsArr:data.data.steps,
                        projectName:data.data.actionDetails.title,
                        actionTags:data.data.actionDetails.actionTags,
                        projectDetails:data.data.projectDetails,
                        showLoader:false,
                        componentDidMountFlag:true,
                        showActionDetails:true,
                    })
                }else{
                    this.setState({
                        showLoader:false,
                        componentDidMountFlag:true,
                        showActionDetails:false,
                    })
                }
            } else {
                this.setState({
                    stepsArr:[],
                    showLoader:false,
                    componentDidMountFlag:true,
                    showActionDetails:false,
                })
            }
        });
    }

    deleteAction = () =>{
        fetch(Constants.Deleteaction,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    actionId:this.state.actionId,
                    projectNo:this.state.projectId
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
                },()=>{
                    window.location = Constants.ACTION_LISTING_PATH+"/"+this.state.projectId;
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
                                projectNo={this.state.projectId}
                                projectDetails={projectDetails}
                            />

                            {
                                this.state.showLoader && 
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }

                            {
                                this.state.componentDidMountFlag && this.state.showActionDetails &&
                                <CustomContainer>
                                    <CardOuterLayout>
                                        <DetailsCard>
                                            <CardHeadingLayout showBottomBorder>
                                                <CardHeading>Action Details</CardHeading>
                                            </CardHeadingLayout>
                                            <DetailsLayout>
                                                <TopLayout>
                                                    <ActionInfoLayout>
                                                        <TableDetails>
                                                            <TableRow>
                                                                <TableData>Name</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{this.state.actionName}</TableData>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Tags</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{
                                                                    isJsonString(this.state.actionTags)
                                                                    ?
                                                                    JSON.parse(this.state.actionTags).join(", ")
                                                                    :
                                                                    "-"
                                                                }</TableData>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Created</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{getLocalDateFromUTC(this.state.actionCreateDate)+" ("+this.state.createdByfullName+ ")"}</TableData> 
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Last updated</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>
                                                                    {
                                                                        !isEmptyVariable(this.state.actionUpdateDate)
                                                                        ?
                                                                        getLocalDateFromUTC(this.state.actionUpdateDate)+" ("+this.state.updatedByfullName+ ")"
                                                                        :
                                                                        "-"
                                                                    }
                                                                </TableData> 
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Description</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{ifEmptyReturnStr(this.state.actionDescription,"-")}</TableData>
                                                            </TableRow>
                                                        </TableDetails>
                                                    </ActionInfoLayout>

                                                    {
                                                        projectDetails.writeScenariosAndAction === "Y" &&
                                                        <ActionButtonsLayout>
                                                            <ActionAnchor onClick={this.handleShowEditAction}>
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
                                                        <th style={{fontSize:12}} width={"5%"}>No</th>
                                                        <th style={{fontSize:12}} width={"20%"}>Action</th>
                                                        <th style={{fontSize:12}} width={"30%"}>Element</th>
                                                        <th style={{fontSize:12}} width={"18%"}>Name</th>
                                                        <th style={{fontSize:12}}>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    !isEmptyVariable(this.state.stepsArr) &&
                                                    this.state.stepsArr.map((item,idx) => {
                                                        let elementTestParam = "";
                                                        if(item.isElementParameterized === "Y"){
                                                            if(item.elementTestParamId === -1){
                                                                elementTestParam = item.elementTestData;
                                                            }else{
                                                                elementTestParam = <span style={{color:"#2e8c03"}}>{"{"+item.elementTestParamName+"}"}</span>;
                                                            }
                                                        }
                                                        let valueTestParam = "";
                                                        if(item.valueTestParamId === -1){
                                                            valueTestParam = item.value;
                                                        }else{
                                                            valueTestParam = <span style={{color:"#2e8c03"}}>{"{"+item.valueTestParamName+"}"}</span>;
                                                        }
                                                        return <tr>
                                                            <td style={{fontSize:12.5}}>{idx+1}</td>
                                                            <td style={{fontSize:12.5}}>{item.stepMasterDisplayName}</td>
                                                            <td style={{fontSize:12.5}}>
                                                                {
                                                                    isEmptyVariable(item.elementName)
                                                                    ?"-"
                                                                    :item.elementName
                                                                }
                                                                {
                                                                    !isEmptyVariable(item.elementValue) &&
                                                                    <span className="valueSpan">{item.elementValue}</span>
                                                                }
                                                                {/* {
                                                                    !isEmptyVariable(elementTestParam) &&
                                                                    <br/>
                                                                } */}
                                                                {
                                                                    !isEmptyVariable(elementTestParam) &&
                                                                    elementTestParam
                                                                }
                                                            </td>
                                                            <td style={{fontSize:12.5}}>{isEmptyVariable(item.nameParam)?"-":item.nameParam}</td>
                                                            <td style={{fontSize:12.5}}>
                                                                {isEmptyVariable(valueTestParam)?"-":valueTestParam}
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                                </tbody>

                                            </Table>
                                        </ActionListLayout>
                                    </CardOuterLayout>
                                </CustomContainer>
                            }
                            {
                                !this.state.showActionDetails && this.state.isEdit &&
                                <EditAction
                                    actionId={this.state.actionId}
                                    history={this.props.history}
                                    projectId = {this.state.projectId}
                                    isEdit = {this.state.isEdit}
                                    handleHideAddEditAction={this.handleHideAddEditAction}
                                />
                            }
                                    
                        </MainContainer>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type={Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Action"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteAction}
                            proceedBtnLabel={Constants.ACTIONS_DELETE_BUTTON}
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                    </ActionDetailsSection>


                </div>
            </Router>
        )
    }
}

export default ActionDetails;