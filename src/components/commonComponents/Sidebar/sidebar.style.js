import styled from 'styled-components';
import {device} from '../Global/device';
import {CountSpan} from '../Global/common.style';

const bgColor = "#282c340f";
const topBgColor = "transparent";
const topTextColor = process.env.REACT_APP_HEADING_COLOR;
const bottomBgColor = "transparent";
const imageBorderColor = process.env.REACT_APP_PRIMARY_DARK_COLOR;

const menuHeadingColor = process.env.REACT_APP_HEADING_COLOR;
//Menu Item + Hover
const menuItemBgColor = "none";
const menuItemTextContentColor = process.env.REACT_APP_HEADING_COLOR;
const menuItemIconContentColor = process.env.REACT_APP_PRIMARY_COLOR;
const menuItemBgHoverColor = process.env.REACT_APP_PRIMARY_COLOR_HOVER;
const menuItemTextContentHoverColor = process.env.REACT_APP_PRIMARY_TEXT_COLOR;
const menuItemIconContentHoverColor = process.env.REACT_APP_PRIMARY_TEXT_COLOR;

//Acive Menu Item + Hover
const menuItemBgActiveColor = process.env.REACT_APP_PRIMARY_COLOR;
const menuItemTextContentActiveColor = process.env.REACT_APP_PRIMARY_TEXT_COLOR;
const menuItemIconContentActiveColor = process.env.REACT_APP_PRIMARY_TEXT_COLOR;

const menuItemBgActiveHoverColor = process.env.REACT_APP_PRIMARY_COLOR;

export const SidebarWrapper = styled.div`
    width: 250px;
    height:100vh;
    overflow:auto;
    background:${bgColor};
    position: fixed;
    z-index: 1000;
`;

export const TopLayout = styled.div`
    background:${topBgColor};
    padding:20px;
    text-align:center;
`;

export const Logo = styled.img`
    width:120px;
    height:auto;
    margin-bottom:20px;
`;

export const ProfileLayout = styled.div`
    box-sizing: border-box;
    display:flex;
    flex-direction:column;
    justify-content:center;
`;

export const Name = styled.h6`
    color:${topTextColor};
    line-height:1;
    margin-bottom:5px;
`;

export const Email = styled.p`
    color:${topTextColor};
    line-height:1;
    opacity:0.6;
`;

export const ImageHolder = styled.div`
    text-align:center;
    border-radius:100%;
    margin-bottom:-65px;
`;

export const ProfileImg = styled.img`
    width:70px;
    height:70px;
    object-fit:cover;
    border-radius:100%;
    border:5px solid ${imageBorderColor};
`;


export const NavLayout = styled.div`
    background:${bottomBgColor};
    padding:35px 0px 20px;
    // height:100%;
`;

export const MenuHeading = styled.span`
    display:flex;
    font-size:12px;
    opacity:0.6;
    line-height:1;
    text-transform:uppercase;
    color:${menuHeadingColor};
    font-weight:600;
    padding-left:25px;
    padding-right:25px;
    padding-top:15px;
    padding-bottom:5px;
`;

export const MenuHolder = styled.div`
    background:${props => props.isActive?menuItemBgActiveColor:menuItemBgColor};
    margin:0px 10px;
    border-radius:6px;
    
    :hover{
        background:${props => props.isActive?menuItemBgActiveHoverColor:menuItemBgHoverColor};

        svg{
            color:${menuItemIconContentHoverColor};
        }
        p{
            color:${menuItemTextContentHoverColor};
        }

        .char-layout{
            border:2px solid ${menuItemIconContentHoverColor};
            color:${menuItemIconContentHoverColor};
        }
    }

    svg{
        width:22px;
        height:22px;
        color:${props => props.isActive?menuItemIconContentActiveColor:menuItemIconContentColor};
        flex-shrink:0;
    }

    p{
        color:${props => props.isActive?menuItemTextContentActiveColor:menuItemTextContentColor};
        line-height:1;
        margin-bottom:0;
        margin-left:7px;
        flex:1 1 auto;
    }
`;

export const NavLink = styled.a`
    padding:8px 12px;
    text-decoration:none;
    display:flex;
    align-items:center;

    :hover{
        text-decoration:none;
    }

    .char-layout{
        display:flex;
        align-items:center;
        justify-content:center;
        width:22px;
        height:22px;
        border-radius:100%;
        border:2px solid ${menuItemIconContentColor};
        color:${menuItemIconContentColor};
        font-size:13px;
        font-weight:bold;
    }
`;

export const CountSpanSidebar = styled(CountSpan)`

`;