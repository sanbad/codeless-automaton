import React, { Component } from 'react';
import { matchPath,withRouter } from 'react-router-dom';
import {SidebarWrapper,TopLayout,Logo,ProfileLayout,Name, Email,
    ImageHolder,ProfileImg,NavLayout,MenuHeading,MenuHolder,NavLink,CountSpanSidebar
} from './sidebar.style';
// import {Dashboard} from '@styled-icons/material-outlined/Dashboard';
import {Dashboard} from '@styled-icons/material-outlined/Dashboard';

import {Assignment} from '@styled-icons/material-outlined/Assignment';
// import {Team} from '@styled-icons/remix-line/Team';
import {Group} from '@styled-icons/material-outlined/Group';

// import {Folder} from '@styled-icons/material-outlined/Folder';
import {Folder} from '@styled-icons/material-rounded/Folder';
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
                    <Logo src='/assets/radicaltest-logo-dark2.png' />
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
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </MenuHolder>

                        <MenuHolder isActive={matchPath(this.props.history.location.pathname, { path: "/projects" }) ? true : false}>
                            <NavLink href="/projects">
                                <Assignment />
                                <p>
                                    Projects
                                </p>
                                {/* <CountSpanSidebar>{!isEmptyVariable(this.state.projectsCount)?this.state.projectsCount:0}</CountSpanSidebar> */}
                            </NavLink>
                        </MenuHolder>

                        <MenuHolder isActive={matchPath(this.props.history.location.pathname, { path: "/teams" }) ? true : false}>
                            <NavLink href="/teams">
                                <Group />
                                <p>
                                    Team
                                </p>
                                {/* <CountSpanSidebar>{!isEmptyVariable(this.state.teamMembersCount)?this.state.teamMembersCount:0}</CountSpanSidebar> */}
                            </NavLink>
                        </MenuHolder>

                        {/* <MenuHolder isActive={matchPath(this.props.history.location.pathname, { path: "/archived" }) ? true : false}>
                            <NavLink href="/archivedprojects">
                                <ArchiveIn />
                                <p>
                                    Archived
                                </p>
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
                                        <div className="char-layout">
                                            {item.title.charAt(0)}
                                        </div>
                                        <p>
                                            {item.title}
                                        </p>
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