import styled from 'styled-components';
import {ChevronThinDown} from '@styled-icons/entypo/ChevronThinDown';
import {FlexLayout,AnchorLink} from '../Global/common.style';

export const DropdownWrapper = styled.div`
    position:relative;
`;

export const DropdownLayout = styled(FlexLayout)`
    cursor:pointer;
    padding:6px;

    :hover{
        border-radius:29px;
        background:${process.env.REACT_APP_PRIMARY_COLOR+"20"};
    }
`;

export const ProfileImg = styled.img`
    width:34px;
    height:34px;
    border-radius:100%;
    object-fit:cover;
    flex-shrink:0;
`;

export const ProfileName = styled.p`
    line-height:1;
    margin:0;
    margin-left:10px;
    font-weight:600;
    color:#666;
`;

export const DownArrow = styled(ChevronThinDown)`
    width:15px;
    color:#666;
    margin-left:10px;
`;

export const CustomUl = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    position:absolute;
    top:calc(100% + 8px);
    right:0;
    background:#fff;
    box-shadow:0px 0px 8px 0px #ccc;
    min-width:120px;
    width:200px;
    padding:0px 0px;
    z-index:1000;
`;

export const CustomLi = styled.li`
    margin:0;
`;

export const DropdownLink  = styled(AnchorLink)`
    padding:10px 20px;
    display:flex;
    align-items:center;

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

export const DropdownText = styled.p`
    margin:0;
    margin-left:10px;
    color:#282828;
`;