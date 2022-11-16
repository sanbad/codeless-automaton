import React, { Component } from 'react';
import { matchPath,withRouter } from 'react-router-dom';
import {SidebarWrapper,TopLayout,Logo,ProfileLayout,Name, Email,
    ImageHolder,ProfileImg,NavLayout,MenuHeading,MenuHolder,NavLink,MenuItem,CountSpanSidebar,
    MenuItemNoMargin} from './sidebar.style';
import {Dashboard} from '@styled-icons/material/Dashboard';
import {Folders} from '@styled-icons/remix-fill/Folders';
import {Team} from '@styled-icons/remix-fill/Team';
// import {ArchiveIn} from '@styled-icons/boxicons-solid/ArchiveIn';
import {Folder} from '@styled-icons/boxicons-solid/Folder';
import {getLocalStorageVariables,isEmptyVariable} from '../commonFunctions';
import * as Constants from '../constants';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            recentProjects:"",
            projectsCount:0,
            teamMembersCount:0
        }
    }

    componentDidMount()
    {
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
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    recentProjects:data.data.recentProjects,
                    projectsCount:data.data.projectCount,
                    teamMembersCount:data.data.teamMembersCount,
                })
            }else{
                this.setState({
                    recentProjects:""
                })
            }
        });
    }

    render(){
        const userDetails = getLocalStorageVariables();
        return(
            <SidebarWrapper>
                <TopLayout>
                    <Logo src='/assets/radicaltest-logo.png' />
                    <ProfileLayout>
                        <Name>
                            {userDetails.fullName}
                        </Name>
                        <Email>
                            {userDetails.email}  
                        </Email>
                        <ImageHolder>
                            <ProfileImg src={isEmptyVariable(userDetails.profilePic)?'/assets/default-propic.png':Constants.ImageBaseUrl+userDetails.profilePic} />
                        </ImageHolder>
                    </ProfileLayout>
                </TopLayout>

                <NavLayout>
                        <MenuHeading>
                            Pages
                        </MenuHeading>

                        <MenuHolder isActive={matchPath(this.props.history.location.pathname, { path: "/dashboard" }) ? true : false}>
                            <NavLink href="/dashboard">
                                <Dashboard />
                                <MenuItem>
                                    Dashboard
                                </MenuItem>
                            </NavLink>
                        </MenuHolder>

                        <MenuHolder isActive={matchPath(this.props.history.location.pathname, { path: "/projects" }) ? true : false}>
                            <NavLink href="/projects">
                                <Folders />
                                <MenuItem>
                                    Projects
                                </MenuItem>
                                <CountSpanSidebar>{!isEmptyVariable(this.state.projectsCount)?this.state.projectsCount:0}</CountSpanSidebar>
                            </NavLink>
                        </MenuHolder>

                        <MenuHolder isActive={matchPath(this.props.history.location.pathname, { path: "/teams" }) ? true : false}>
                            <NavLink href="/teams">
                                <Team />
                                <MenuItem>
                                    Team
                                </MenuItem>
                                <CountSpanSidebar>{!isEmptyVariable(this.state.teamMembersCount)?this.state.teamMembersCount:0}</CountSpanSidebar>
                            </NavLink>
                        </MenuHolder>

                        {/* <MenuHolder isActive={matchPath(this.props.history.location.pathname, { path: "/archived" }) ? true : false}>
                            <NavLink href="/archivedprojects">
                                <ArchiveIn />
                                <MenuItem>
                                    Archived
                                </MenuItem>
                            </NavLink>
                        </MenuHolder> */}

                        <MenuHeading>
                            Recent
                        </MenuHeading>
                        {
                            !isEmptyVariable(this.state.recentProjects) &&
                            this.state.recentProjects.map((item) => {
                                return <MenuHolder>
                                    <NavLink href={Constants.SCENARIO_LISTING_PATH+"/"+item.projectNo}>
                                        <Folder />
                                        <MenuItem>
                                            {item.title}
                                        </MenuItem>
                                    </NavLink>
                                </MenuHolder>
                            })
                        }
                </NavLayout>
            </SidebarWrapper>
        );
    
    }
}

export default withRouter(Sidebar);