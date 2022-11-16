import styled from 'styled-components';
import {AnchorLink} from '../Global/common.style';
import {Notifications} from '@styled-icons/material-rounded/Notifications';

export const DropdownWrapper = styled.div`
    position:relative;
`;

export const NotificationIcon = styled(Notifications)`
    width:30px;
    height:30px;
    color:#666;
    margin:0px 10px;
    padding:8px;
    border-radius:100%;
    cursor:pointer;
    background:${props => props.isActive?process.env.REACT_APP_PRIMARY_COLOR+"20":"none"};
    box-sizing:content-box;

    :hover{
        background:${process.env.REACT_APP_PRIMARY_COLOR+"20"};
    }
`;

export const NotificationBadge = styled.span`
    font-size: 10px;
    position: absolute;
    background-color: #fee535;
    border-radius: 100%;
    color: #000;
    padding: 7px;
    right: 10px;
    top: 4px;
    line-height: 5px;
`;

export const DropdownListWrapper = styled.div`
    position:absolute;
    top:calc(100% + 8px);
    right:0;
    background:#fff;
    box-shadow:0px 0px 10px 1px #ccc;
    min-width:120px;
    width:400px;
    z-index:1000;
    border-radius:4px;
`;

export const CustomUl = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    max-height:350px;
    overflow:auto;
`;

export const CustomLi = styled.li`
    margin:0;
`;

export const Heading = styled.p`
    margin:0;
    padding:5px 15px;
    border-bottom:1px solid #ccc;
    color:#666;
    font-weight:600;
`;

export const DropdownLink  = styled(AnchorLink)`
    padding:10px 15px;
    display:flex;
    align-items:flex-start;
    border-bottom:1px solid #eee;

    :hover{
        background:#f5f5f5;
    }

    svg{
        height:18px;
        width:18px;
        color:#666;
        flex-shrink:0;
    }
`;

export const DropdownImg = styled.img`
    height:40px;
    width:40px;
    object-fit:cover;
    border-radius:3px;
    flex-shrink:0;
`;

export const DropdownTextLayout = styled.div`
`;


export const DropdownText = styled.span`
    margin:0;
    // margin-left:10px;
    color:#282828;
    line-height:1.25;
    display:flex;
    font-weight:400;
    font-size:13px;
    margin-bottom:5px;
`;


export const DropdownDate = styled.span`
    margin:0;
    // margin-left:10px;
    color:#666;
    font-size:12px;
    display:block;
    line-height:1;
`;

export const FooterWrapper = styled(AnchorLink)`
    padding:0;
    display:block;
    border-top:1px solid #ddd;

    :hover{
        text-decoration:underline;
    }
`;

export const FooterText = styled.p`
    margin:0;
    padding:5px 15px;
    color:${process.env.REACT_APP_PRIMARY_DARK_COLOR};
    font-weight:600;
    text-align:center;
`;