import styled from 'styled-components';
import {ChevronThinDown} from '@styled-icons/entypo/ChevronThinDown';
import {device} from '../Global/device';
import {Commonbtn,
    Card,FlexLayout,CountSpan,AnchorLink} from '../Global/common.style';

export const DropdownWrapper = styled.div`
`;

export const DropdownLayout = styled(FlexLayout)`
    margin-bottom:7px;
`;

export const DropDownTitleLayout = styled.div`
    display:inline-block;
    position:relative;
`;

export const Title = styled.h6`
    line-height:1;
    margin:0;
    font-weight:500;
    min-height:18px;
`;

export const DownArrow = styled(ChevronThinDown)`
    cursor:pointer;
    width:19px;
    color:#282828;
    margin-left:7px;
    padding:2px;
    border-radius:3px;

    :hover{
        background:${process.env.REACT_APP_PRIMARY_COLOR+"20"}
    }
`;

export const CustomUl = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    position:absolute;
    top:calc(100%);
    left:calc(100% - 20px);
    background:#fff;
    box-shadow:0px 0px 8px 0px #ccc;
    min-width:120px;
    width:180px;
    padding:5px 0px;
    z-index:1000;
`;

export const CustomLi = styled.li`
    margin:0;
    cursor:pointer;
`;

export const DropdownLink  = styled(AnchorLink)`
    padding:10px 15px;
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