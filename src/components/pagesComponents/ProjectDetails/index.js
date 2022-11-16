import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ProjectDetailsSection,MainContainer,LoaderLayout,CardOuterLayout,
    DetailsCard,DetailsLayout,TopLayout,HeaderTitle,DashboardCard,HeaderSubTitle,TextLayout,
    ProjectInfoLayout,TableDetails,TableRow,TableData,CustomCol,CustomRow,
    ProjectButtonsLayout,ProjectButton,ProjectAnchor,EditIcon,ProjectButtonText,DeleteIcon} from './projectDetails.style';
import {CustomContainer,CardHeadingLayout,
    CardHeading,Table,     Th} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import AlertDialog from '../../commonComponents/AlertDialog'
import Topbar from '../../commonComponents/Topbar'
import {getLocalStorageVariables,isEmptyVariable,getLocalDateFromUTC,
    ifEmptyReturnStr} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import SpinnerLoader from 'react-loader-spinner';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import {Users} from '@styled-icons/fa-solid/Users';
import {ClipboardList} from '@styled-icons/fa-solid/ClipboardList';
import {GpsFixed} from '@styled-icons/material-rounded/GpsFixed';
import {ListUl} from '@styled-icons/bootstrap/ListUl';
import {News} from '@styled-icons/boxicons-regular/News';
import {Report} from '@styled-icons/boxicons-solid/Report';
import AlertInputDialog from '../../commonComponents/AlertInputDialog';

const userDetails  = getLocalStorageVariables();

class ProjectDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            projectId:this.props.match.params.id,
            projectDetails:{},
            showLoader:false,
            projectName:"",
            actionName:"",
            actionDescription:"",
            actionCreateDate:"",
            stepsArr:[],
            componentDidMountFlag:false,
            showProjectDetail:false,

            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",

            showInputDialog:false,
            alertInputMessage:"",
            inputDialogError:"",
            inputFieldDialog:""
        }
    }

    componentDidMount(){
        this.setState({
            showLoader:true
        });
        this.getProjectDetails();
    }

    handleAlertDialogCloseInfo = () => {
        this.setState({
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    openProjectPasswordDialog = () =>{
        this.setState(
            {
                showInputDialog:true,
                alertInputMessage:Constants.PROJECTS_DELETE_WARNING +this.state.projectDetails.title+"?",
                inputDialogError:"",
                inputFieldDialog:""
            });
    }

    handleInputProjectDialogClose = () =>{
        this.setState(
        {
            showInputDialog:false,
            alertInputMessage:"",
            inputDialogError:"",
            inputFieldDialog:""
        });
    }

    handleShowEditAction = () =>{
        this.setState({
            showProjectDetail: false,
            showAddAction:true,
            isEdit:true
        }) 
    }


    //get action details from API
    getProjectDetails = () => {
        fetch(Constants.ProjectList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
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
                if(!isEmptyVariable(data.data.result[0])){
                    this.setState({
                        // projectId:data.data.actionDetails.projectNo,
                        // actionName:data.data.actionDetails.actionName,
                        // actionDescription:data.data.actionDetails.description,
                        // actionCreateDate:data.data.actionDetails.actionCreateDate,
                        // stepsArr:data.data.steps,
                        // projectName:data.data.actionDetails.title,
                        projectDetails:data.data.result[0],
                        showLoader:false,
                        componentDidMountFlag:true,
                        showProjectDetail:true,
                    })
                }else{
                    this.setState({
                        showLoader:false,
                        componentDidMountFlag:true,
                        showProjectDetail:false,
                    })
                }
            } else {
                this.setState({
                    stepsArr:[],
                    showLoader:false,
                    componentDidMountFlag:true,
                    showProjectDetail:false,
                })
            }
        });
    }

    deleteProject = () =>{
        if(isEmptyVariable(this.state.inputFieldDialog))
        {
            this.setState(
            {
                inputDialogError:"Please enter value to proceed."
            },()=>{
                setTimeout(function(){
                    this.setState({inputDialogError:""});
                }.bind(this),Constants.WRNG_MSG_TIMEOUT);
            });
        }
        else
        {
            fetch(Constants.DeleteProject,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                    {
                        email:userDetails.email,
                        accessToken:userDetails.accessToken,
                        projectNo:this.state.projectId,
                        password:this.state.inputFieldDialog
                    })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
                {
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showInputDialog:false,
                        alertInputMessage:"",
                    },()=>{
                        window.location=Constants.PROJECTS_LISTING_PATH;
                    });
                }else{
                    this.setState({
                        showInputDialog:false,
                        inputFieldDialog:"",
                        alertInputMessage:"",
                        showAlertDialogInfo:true,
                        alertDialogMessageInfo:data.responseMessage
                    });
                }
            });
        }
    }

    render(){
        const {projectDetails} = this.state;
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
                                this.state.componentDidMountFlag && projectDetails &&
                                <CustomContainer>
                                    
                                    <CardOuterLayout>
                                        <DetailsCard>
                                            <CardHeadingLayout showBottomBorder>
                                                <CardHeading>Project Details</CardHeading>
                                            </CardHeadingLayout>
                                            <DetailsLayout>
                                                <TopLayout>
                                                    <ProjectInfoLayout>
                                                        <TableDetails>
                                                            <TableRow>
                                                                <TableData>Name</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{projectDetails.title}</TableData>
                                                            </TableRow>
                                                            {/* <TableRow>
                                                                <TableData>Project No.</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{projectDetails.projectNo}</TableData>
                                                            </TableRow> */}
                                                            
                                                            <TableRow>
                                                                <TableData>Created</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{getLocalDateFromUTC(projectDetails.createDate)}</TableData>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableData>Description</TableData>
                                                                <TableData>:</TableData>
                                                                <TableData>{ifEmptyReturnStr(projectDetails.description,"-")}</TableData>
                                                            </TableRow>
                                                        </TableDetails>
                                                    </ProjectInfoLayout>

                                                    {
                                                        userDetails.userType === Constants.USER_TYPE_OWNER &&
                                                        <ProjectButtonsLayout>
                                                            {/* <ProjectAnchor onClick={this.handleShowEditAction}>
                                                                <ProjectButton>
                                                                    <EditIcon/>
                                                                    <ProjectButtonText>Edit</ProjectButtonText>
                                                                </ProjectButton>
                                                            </ProjectAnchor> */}

                                                            <ProjectButton onClick={this.openProjectPasswordDialog}>
                                                                <DeleteIcon/>
                                                                <ProjectButtonText>Delete Project</ProjectButtonText>
                                                            </ProjectButton>
                                                        </ProjectButtonsLayout>
                                                    }
                                                </TopLayout>
                                                <CustomRow>
                                                    <CustomCol lg="2">
                                                        <DashboardCard>
                                                            <News />
                                                            <TextLayout>
                                                                <HeaderTitle>{ifEmptyReturnStr(projectDetails.scenariosCount,0)}</HeaderTitle>
                                                                <HeaderSubTitle>Scenarios</HeaderSubTitle>
                                                            </TextLayout>
                                                        </DashboardCard>
                                                    </CustomCol>
                                                    <CustomCol lg="2">
                                                        <DashboardCard>
                                                            <ClipboardList />
                                                            <TextLayout>
                                                                <HeaderTitle>{ifEmptyReturnStr(projectDetails.actionsCount,0)}</HeaderTitle>
                                                                <HeaderSubTitle>Actions</HeaderSubTitle>
                                                            </TextLayout>
                                                        </DashboardCard>
                                                    </CustomCol>
                                                    <CustomCol lg="2">
                                                        <DashboardCard>
                                                            <GpsFixed />
                                                            <TextLayout>
                                                                <HeaderTitle>{ifEmptyReturnStr(projectDetails.elementsCount,0)}</HeaderTitle>
                                                                <HeaderSubTitle>Elements</HeaderSubTitle>
                                                            </TextLayout>
                                                        </DashboardCard>
                                                    </CustomCol>
                                                    <CustomCol lg="2">
                                                        <DashboardCard>
                                                            <ListUl />
                                                            <TextLayout>
                                                                <HeaderTitle>{ifEmptyReturnStr(projectDetails.steps,0)}</HeaderTitle>
                                                                <HeaderSubTitle>Steps</HeaderSubTitle>
                                                            </TextLayout>
                                                        </DashboardCard>
                                                    </CustomCol>
                                                    <CustomCol lg="2">
                                                        <DashboardCard>
                                                            <Report />
                                                            <TextLayout>
                                                                <HeaderTitle>{ifEmptyReturnStr(projectDetails.reportsCount,0)}</HeaderTitle>
                                                                <HeaderSubTitle>Reports</HeaderSubTitle>
                                                            </TextLayout>
                                                        </DashboardCard>
                                                    </CustomCol>
                                                    <CustomCol lg="2">
                                                        <DashboardCard>
                                                            <Users />
                                                            <TextLayout>
                                                                <HeaderTitle>{ifEmptyReturnStr(projectDetails.teamMembersCount,0)}</HeaderTitle>
                                                                <HeaderSubTitle>Team</HeaderSubTitle>
                                                            </TextLayout>
                                                        </DashboardCard>
                                                    </CustomCol>
                                                </CustomRow>
                                            </DetailsLayout>
                                            
                                        </DetailsCard>
                                    </CardOuterLayout>
                                </CustomContainer>
                            }
                            {/* {
                                !this.state.showProjectDetail && this.state.isEdit &&
                                <EditAction
                                    actionId={this.state.actionId}
                                    history={this.props.history}
                                    isEdit = {this.state.isEdit}
                                    handleHideAddEditAction={this.handleHideAddEditAction}
                                />
                            } */}
                                    
                        </MainContainer>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                        <AlertInputDialog 
                            showAlertDialog={this.state.showInputDialog}
                            handleAlertDialogClose={this.handleInputProjectDialogClose}
                            alertDialogHeading={Constants.PROJECTS_DELETE_HEADING}
                            alertDialogMessage={this.state.alertInputMessage}
                            alertDialogInputLabel={Constants.ALERT_TYPE_PASSWORD}
                            handleChange = {this.handleChange}
                            inputFieldValue = {this.state.inputFieldDialog}
                            errorSpan = {this.state.inputDialogError}
                            proceedBtnClick={this.deleteProject}
                            proceedBtnLabel={ Constants.PROJECTS_DELETE_BUTTON }
                        />

                    </ProjectDetailsSection>


                </div>
            </Router>
        )
    }
}

export default ProjectDetails;