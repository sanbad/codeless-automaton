import styled from 'styled-components';
import {device} from '../Global/device';
import {Commonbtn,
    Card,FlexLayout,CountSpan} from '../Global/common.style';

export const SidebarWrapper = styled.div`
    width: 250px;
    height:100vh;
    overflow:auto;
    background:#151515;
    position: fixed;
    z-index: 1000;
`;

export const TopLayout = styled.div`
    background:#222;
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
    color:#fff;
    line-height:1;
    margin-bottom:5px;
`;

export const Email = styled.p`
    color:#fff;
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
    border:5px solid #151515;
`;


export const NavLayout = styled.div`
    background:#151515;
    padding:35px 0px 20px;
    // height:100%;
`;

export const MenuHeading = styled.span`
    display:flex;
    font-size:12px;
    opacity:0.6;
    line-height:1;
    text-transform:uppercase;
    color:#fff;
    font-weight:600;
    padding-left:25px;
    padding-right:25px;
    padding-top:15px;
    padding-bottom:15px;
`;

export const MenuHolder = styled.div`
    background:${props => props.isActive?"#38b2fe":"none"};

    :hover{
        background:${props => props.isActive?"#38b2fe":"#222"};
    }

    svg{
        width:16px;
        height:16px;
        color:#fff;
        flex-shrink:0;
    }
`;

export const NavLink = styled.a`
    padding:12px 25px;
    text-decoration:none;
    display:flex;
    align-items:center;

    :hover{
        text-decoration:none;
    }
`;

export const MenuItem = styled.p`
    color:#fff;
    line-height:1;
    margin-bottom:0;
    margin-left:12px;
    flex:1 1 auto;
`;

export const MenuItemNoMargin = styled.p`
    color:#fff;
    line-height:1;
    margin:0;
`;

export const CountSpanSidebar = styled(CountSpan)`

`;