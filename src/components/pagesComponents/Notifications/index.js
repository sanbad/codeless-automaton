import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {NotificationSection,MainContainer,TableCardLayout,DropdownListWrapper,
    CustomUl,CustomLi,Heading,DropdownText,DropdownLink,DropdownImg,DropdownTextLayout,
    DropdownDate,HeadingLayout,FooterWrapper,FooterText} from './notifications.style';
import {CustomContainer, FlexLayoutCenterCenter} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import {getLocalStorageVariables,isEmptyVariable,getLocalDateFromUTC} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import Pagination from '../../commonComponents/pagination';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class Notifications extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            notifications:[],
            totalCount:0,
            resultsize:50,
        }
    }

    componentDidMount(){
        let userDetails  = getLocalStorageVariables();

        fetch(Constants.NotificationsList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                pageNo:this.state.currentPageNo,
                resultsize:this.state.resultsize
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    totalCount:data.data.count,
                    notifications:data.data.result
                })
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                this.setState({
                    notifications:""
                })
            }
        });
    }

    onChangePage = (page) => {
        let userDetails  = getLocalStorageVariables();
        // update state with new page of items
        if(page != this.state.currentPageNo){
            fetch(Constants.NotificationsList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                    {
                        loginEmail:userDetails.email,
                        loginAccessToken:userDetails.accessToken,
                        pageNo:page,
                        resultsize:this.state.resultsize
                    })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        currentPageNo:page,
                        totalCount:data.data.count,
                        notifications:data.data.result
                    })
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        notifications:[]
                    })
                }
            });
        }
    }

    /* COMMON FUNCTIONS FOR NOTIFICATION DIALOGS TYPE 10,20,30 
    * PRESENT IN NOTIFICATIONS DROPDOWN->INDEX.JS ALSO.
    * STARTS HERE
    */

    render(){
        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <NotificationSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar showLeftMenu={false}
                            title="Notifications"
                            />
                            {
                                !isEmptyVariable(this.state.notifications) &&
                                <CustomContainer>
                                    <TableCardLayout>
                                        <DropdownListWrapper>
                                            <HeadingLayout showBottomBorder>
                                                <Heading>Notifications</Heading>
                                            </HeadingLayout>
                                            <CustomUl>
                                            {
                                                !isEmptyVariable(this.state.notifications) &&
                                                this.state.notifications.map((item) => {
                                                    let hrefLink = "";
                                                    let targetBlank = false;
                                                    if(item.type === 10){
                                                        hrefLink = "/projects/reportdetails/"+item.dataId
                                                    }else if(item.type === 20){
                                                        hrefLink = "/projects/scenarios/"+item.dataId
                                                    }else{
                                                        hrefLink = item.dataId
                                                        targetBlank = true;
                                                    }
                                                return <CustomLi>
                                                    <DropdownLink 
                                                        href={hrefLink}
                                                        target={targetBlank?"_blank":""}
                                                    >
                                                        {/* {
                                                            !isEmptyVariable(item.imagePath)
                                                            ?
                                                            <DropdownImg src={item.imagePath} />
                                                            :
                                                            <DropdownImg src="/assets/radicaltest-logo-dark.png" />
                                                        } */}
                                                        <DropdownTextLayout>
                                                            <DropdownText>{item.notification}</DropdownText>
                                                            <DropdownDate>{getLocalDateFromUTC(item.notification_date)}</DropdownDate>
                                                        </DropdownTextLayout>
                                                    </DropdownLink>
                                                </CustomLi>
                                                })
                                            }
                                            </CustomUl>
                                        </DropdownListWrapper>
                                    </TableCardLayout>
                                    <FlexLayoutCenterCenter>
                                    {
                                        (this.state.totalCount > this.state.notifications.length) && 
                                        <Pagination 
                                            totalLength ={this.state.totalCount} 
                                            items={this.state.notifications} 
                                            onChangePage={this.onChangePage} 
                                            currentPageNo = {this.state.currentPageNo} />
                                    }
                                    </FlexLayoutCenterCenter>
                                </CustomContainer>
                            }
                        </MainContainer>
                    </NotificationSection>
                </div>
            </Router>
        );
    
    }
}

export default Notifications;