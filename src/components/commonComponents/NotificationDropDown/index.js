import React from 'react';
import {DropdownWrapper,NotificationIcon,NotificationBadge,DropdownListWrapper,
    CustomUl,CustomLi,Heading,DropdownText,DropdownLink,DropdownImg,DropdownTextLayout,
    DropdownDate,FooterWrapper,FooterText} from './notification.style';
import {getLocalStorageVariables,isEmptyVariable,getLocalDateFromUTC} from '../commonFunctions';
import * as Constants from '../constants';

class NotificationDropdown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayMenu: false,
            notificationBadge:false,
            notifications:"",
            notificationTotalCount:0,
            notificationUnreadCount:0,
        };
   };

   componentDidMount()
   {
       let userDetails  = getLocalStorageVariables();

       fetch(Constants.NotificationsList,
           {
               method: "POST",
               mode:'cors',
               body: new URLSearchParams({
                   email:userDetails.email,
                   accessToken:userDetails.accessToken,
                   pageNo:1,
                   resultsize:20,
               })
           })
           .then(response => { return response.json(); } )
           .then(data =>
           {
               if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                   this.setState({
                       notifications:data.data.result,
                       notificationTotalCount:data.data.count,
                       notificationUnreadCount:data.data.unreadCount,
                       notificationBadge:(data.data.unreadCount > 0)?true:false
                   })
               }else{
                   this.setState({
                       notifications:"",
                       notificationTotalCount:0,
                       notificationUnreadCount:0
                   })
               }
           });
   }


    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
            this.readNotification();
        });
    }

    hideDropdownMenu = () => {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    readNotification = () => {
        let userDetails  = getLocalStorageVariables();
        this.setState({
            notificationBadge:false
        })
        fetch(Constants.ReadNotifications,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            
        });
    }

    render() {
        return (
            <DropdownWrapper>
                <NotificationIcon onClick={this.showDropdownMenu} isActive={this.state.displayMenu}/>
                {
                    this.state.notificationBadge && 
                    <NotificationBadge>{this.state.notificationUnreadCount}</NotificationBadge>
                }
                { 
                    this.state.displayMenu ? (
                        <DropdownListWrapper>
                            <Heading>Notifications</Heading>
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
                            {
                                (this.state.notificationTotalCount > this.state.notifications.length) &&
                                <FooterWrapper href="/notifications">
                                    <FooterText>View All</FooterText>
                                </FooterWrapper>
                            }
                        </DropdownListWrapper>
                    ):
                    (
                        null
                    )
                }
            </DropdownWrapper>
        );
    }
}

export default NotificationDropdown;