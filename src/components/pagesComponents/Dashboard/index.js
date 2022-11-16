import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {DashboardSection,MainContainer,LoaderLayout,CustomContainerEmptyLayout,
    DashboardCard,TextLayout,HeaderTitle,HeaderSubTitle,TableCardLayout,ResendMailContainer,
    TableCard,StatusSpan,EmptyCard,CustomText,EmptyCardAddNewLayout,SuccessSpan} from './dashboard.style';
import {CustomContainer,CustomRow,CustomCol,Card,CardHeadingLayout,
    CardHeading,Table,    TableAnchor,AddNewBtn} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import {Folders} from '@styled-icons/remix-fill/Folders';
import {ClipboardList} from '@styled-icons/fa-solid/ClipboardList';
import {News} from '@styled-icons/boxicons-regular/News';
import {Team} from '@styled-icons/remix-fill/Team';
import TableDropDown from '../../commonComponents/TableDropDown';
import {getLocalStorageVariables,isEmptyVariable,isEmptyArray,
    ifEmptyReturnStr,
    getLocalDateFromUTC} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {InfoCircle} from '@styled-icons/fa-solid/InfoCircle';
import {Delete} from '@styled-icons/material/Delete';
import AlertDialog from '../../commonComponents/AlertDialog';
import SpinnerLoader from 'react-loader-spinner';
import {File} from '@styled-icons/boxicons-regular/File';
import {StopCircle} from '@styled-icons/boxicons-regular/StopCircle';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

const actionInitiatedArr = [
    {
        label:"Live Logs",
        onClick:"",
        icon:<File/>
    },
    {
        label:"Abort",
        onClick:"",
        icon:<StopCircle/>
    }
];

const actionCompletedArr = [
    {
        label:"Details",
        onClick:"",
        icon:<InfoCircle/>
    },
    {
        label:"Delete",
        onClick:"",
        icon:<Delete/>
    }
];
const actionFailedArr = [
    {
        label:"Delete",
        onClick:"",
        icon:<Delete/>
    }
];
const actionAbortedArr = [
    {
        label:"Delete",
        onClick:"",
        icon:<Delete/>
    }
];

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            showLoader:false,
            dashboard:"",
            emailCardDisplay:false,
            resendMailMsg:"",
            componentDidMount:false,

            executionMasterId:"",
            showAlertDialog:false,
            alertDialogMessage:"",

            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        }
    }

    componentDidMount(){
       this.getDashboard();
    }

    onClickItem = (label,item) =>{
        if(label === "Details"){
            window.location=Constants.REPORT_DETAILS_PATH+"/"+item
        }
        else if(label === "Delete"){
            this.openDeleteDialog(item);
        }
    }

    openDeleteDialog = (executionMasterId) => {
        this.setState(
        {
            executionMasterId:executionMasterId,
            showAlertDialog:true,
            alertDialogMessage:Constants.REPORTS_DELETE_WARNING
        });
    }

    handleAlertDialogClose = () =>{
        this.setState(
        {
            executionMasterId:"",
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }

    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    getDashboard()
    {
        this.setState({
            showLoader:true
        })

        let userDetails  = getLocalStorageVariables();

        fetch(Constants.GetDashboard,
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
            let isEmailCard = false; 
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                if(!isEmptyVariable(data.data.user))
                {
                    if(data.data.user.isEmailVerified.toLowerCase() === "n")
                    {
                        isEmailCard = true;
                    }
                }
                this.setState({
                    dashboard:data.data,
                    emailCardDisplay:isEmailCard,
                    showLoader:false,
                    componentDidMount:true
                })
            }
        });
    }

    resendVerificationEmail = () =>{
        let userDetails  = getLocalStorageVariables();
        fetch(Constants.ResendVerificationEmail,
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
                   resendMailMsg:data.responseMessage
                },()=>{
                    setTimeout(function(){
                        this.setState({resendMailMsg:""});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                })
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

    deleteReport = () =>{
        let userDetails  = getLocalStorageVariables();
        let url = Constants.DeleteReport;
        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    executionMasterId:this.state.executionMasterId
                })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    executionMasterId:"",
                    showAlertDialog:false,
                    alertDialogMessage:""
                },()=>{
                    this.getDashboard();
                });
            } else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            } else {
                this.setState(
                {
                    executionMasterId:"",
                    showAlertDialog:false,
                    alertDialogMessage:"",
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage
                });
            }
        });
    }


    render(){
        const actionArr = [
            {
                label:"Details",
                icon:<InfoCircle/>
            },
            {
                label:"Delete",
                icon:<Delete/>
            }
        ];
        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <DashboardSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                title="Dashboard"
                            />
                            {
                                this.state.showLoader &&
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }
                            {
                                this.state.emailCardDisplay &&
                                <ResendMailContainer>
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    Constants.DASHBOARD_EMAIL_VER_MSG
                                                }
                                                </CustomText>
                                                <EmptyCardAddNewLayout>
                                                    <AddNewBtn
                                                        as="button"
                                                        onClick = {this.resendVerificationEmail}
                                                    >Resend Verification Email</AddNewBtn>
                                                </EmptyCardAddNewLayout>
                                                <SuccessSpan>{this.state.resendMailMsg}</SuccessSpan>
                                            </CustomCol>
                                        </CustomRow>
                                    </EmptyCard>
                                </ResendMailContainer>
                            }
                            {
                                !isEmptyVariable(this.state.dashboard) &&
                                <CustomContainer>
                                    <CustomRow>
                                        <CustomCol lg="3">
                                            <DashboardCard>
                                                <Folders />
                                                <TextLayout>
                                                    <HeaderTitle>{ifEmptyReturnStr(this.state.dashboard.projectCount,0)}</HeaderTitle>
                                                    <HeaderSubTitle>Projects</HeaderSubTitle>
                                                </TextLayout>
                                            </DashboardCard>
                                        </CustomCol>
                                        <CustomCol lg="3">
                                            <DashboardCard>
                                                <News />
                                                <TextLayout>
                                                    <HeaderTitle>{ifEmptyReturnStr(this.state.dashboard.scenariosCount,0)}</HeaderTitle>
                                                    <HeaderSubTitle>Scenarios</HeaderSubTitle>
                                                </TextLayout>
                                            </DashboardCard>
                                        </CustomCol>
                                        <CustomCol lg="3">
                                            <DashboardCard>
                                                <ClipboardList />
                                                <TextLayout>
                                                    <HeaderTitle>{ifEmptyReturnStr(this.state.dashboard.actionsCount,0)}</HeaderTitle>
                                                    <HeaderSubTitle>Custom Actions</HeaderSubTitle>
                                                </TextLayout>
                                            </DashboardCard>
                                        </CustomCol>
                                        <CustomCol lg="3">
                                            <DashboardCard>
                                                <Team />
                                                <TextLayout>
                                                    <HeaderTitle>{ifEmptyReturnStr(this.state.dashboard.teamMembersCount,0)}</HeaderTitle>
                                                    <HeaderSubTitle>Members</HeaderSubTitle>
                                                </TextLayout>
                                            </DashboardCard>
                                        </CustomCol>
                                    </CustomRow>

                                    {
                                        !isEmptyVariable(this.state.dashboard.recentProjects) &&
                                        this.state.dashboard.recentProjects.length > 0 &&
                                        <TableCardLayout>
                                            <TableCard>
                                                <CardHeadingLayout>
                                                    <CardHeading>Recent Projects</CardHeading>
                                                </CardHeadingLayout>
                                                <Table style={{marginBottom:0,borderBottomRightRadius:5,borderBottomLeftRadius:5}} lastchildcheck={true}>
                                                    <thead>
                                                        <tr>
                                                            <th width="5%">No</th>
                                                            <th width="45%">Project Name</th>
                                                            <th className = "text-center">Scenarios</th>
                                                            <th className = "text-center">Actions</th>
                                                            <th className = "text-center">Reports</th>
                                                            <th className = "text-center">Team Members</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.dashboard?.recentProjects.map((item,index) => {
                                                                return <tr>
                                                                    <td className="text-center">{++index}</td>
                                                                    <td><TableAnchor href={Constants.SCENARIO_LISTING_PATH+"/"+item.projectNo}>{item.title}</TableAnchor></td>
                                                                    <td className = "text-center">{item.scenariosCount}</td>
                                                                    <td className = "text-center">{item.actionsCount}</td>
                                                                    <td className = "text-center">{item.reportsCount}</td>
                                                                    <td className = "text-center">{item.teamMembersCount}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>

                                                </Table>
                                            </TableCard>
                                        </TableCardLayout>
                                    }
                                    {
                                        this.state.componentDidMount && isEmptyArray(this.state.dashboard.recentProjects) &&
                                        <CustomContainerEmptyLayout paddingValue={"25px 0px"} >
                                            <EmptyCard style={{padding:"100px 40px"}}>
                                                <CustomRow>
                                                    <CustomCol md={12}>
                                                        <CustomText>
                                                        {
                                                            Constants.DASHBOARD_PROJECTS_EMPTY_WARNING
                                                        }
                                                        </CustomText>
                                                            <EmptyCardAddNewLayout>
                                                                <AddNewBtn
                                                                href={Constants.PROJECTS_LISTING_PATH}
                                                                >Go to Project List</AddNewBtn>
                                                            </EmptyCardAddNewLayout>
                                                    </CustomCol>
                                                </CustomRow>
                                            </EmptyCard>
                                        </CustomContainerEmptyLayout>
                                    }
                                    
                                    {
                                        !isEmptyVariable(this.state.dashboard.recentReports) &&
                                        this.state.dashboard.recentReports.length > 0 &&
                                        <TableCardLayout>
                                            <TableCard>
                                                <CardHeadingLayout>
                                                    <CardHeading>Recent Reports</CardHeading>
                                                </CardHeadingLayout>
                                                <Table style={{marginBottom:0,borderBottomRightRadius:5,borderBottomLeftRadius:5}} lastchildcheck={true}>
                                                    <thead>
                                                        <tr>
                                                            <th width="5%">No</th>
                                                            <th width="18%">Execution ID</th>
                                                            <th>Date</th>
                                                            <th>Initiated By</th>
                                                            <th width="12%">Status</th>
                                                            <th width="7%"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.dashboard.recentReports.map((item,index) => {
                                                                let actionArr =[];
                                                                if(item.execution_status === Constants.REPORTS_STATUS_INITIATED){
                                                                    actionArr = actionInitiatedArr;
                                                                }
                                                                if(item.execution_status === Constants.REPORTS_STATUS_COMPLETED){
                                                                    actionArr = actionCompletedArr;
                                                                }
                                                                if(item.execution_status === Constants.REPORTS_STATUS_FAILED){
                                                                    actionArr = actionFailedArr;
                                                                }
                                                                if(item.execution_status === Constants.REPORTS_STATUS_ABORTED){
                                                                    actionArr = actionAbortedArr;
                                                                }
                                                                return <tr>
                                                                    <td className="text-center">{++index}</td>
                                                                    <td><TableAnchor href={Constants.REPORT_DETAILS_PATH+"/"+item.executionMasterId}>{item.executionNumber}</TableAnchor></td>
                                                                    <td>{getLocalDateFromUTC(item.executionDate)}</td>
                                                                    <td>{item.firstName}</td>
                                                                    <td>
                                                                    {
                                                                        item.execution_status === Constants.REPORTS_STATUS_COMPLETED &&
                                                                        <StatusSpan color="#4CAF50">{item.execution_status}</StatusSpan>
                                                                    }
                                                                    {
                                                                        item.execution_status === Constants.REPORTS_STATUS_FAILED &&
                                                                        <StatusSpan color="#FF0000">{item.execution_status}</StatusSpan>
                                                                    }
                                                                    {
                                                                        item.execution_status === Constants.REPORTS_STATUS_INITIATED &&
                                                                        <StatusSpan color="#38b2fe">{item.execution_status}</StatusSpan>
                                                                    }
                                                                    {
                                                                        item.execution_status === Constants.REPORTS_STATUS_ABORTED &&
                                                                        <StatusSpan color="#FF0000">{item.execution_status}</StatusSpan>
                                                                    }
                                                                    {
                                                                        item.execution_status === Constants.REPORTS_STATUS_STOPPED &&
                                                                        <StatusSpan color="#FF0000">{item.execution_status}</StatusSpan>
                                                                    }
                                                                    </td>
                                                                    <td><TableDropDown 
                                                                    actionArr={actionArr}
                                                                    onClickDropDownItem={this.onClickItem}
                                                                    item={item.executionMasterId}
                                                                    /></td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>

                                                </Table>
                                            </TableCard>
                                        </TableCardLayout>
                                    }
                                </CustomContainer>
                            }
                        </MainContainer>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type= {Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Report"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteReport}
                            proceedBtnLabel={ Constants.REPORTS_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />
                        
                    </DashboardSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Dashboard;