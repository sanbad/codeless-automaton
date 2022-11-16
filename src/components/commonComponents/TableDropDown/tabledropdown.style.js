import styled from 'styled-components';
import {DotsHorizontalRounded} from '@styled-icons/boxicons-regular/DotsHorizontalRounded';
import {FlexLayout} from '../Global/common.style';

export const DropdownWrapper = styled.div`
    position:relative;
    display:flex;
    justify-content:center;

    button{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:#fff;
        border: none;
        border-radius: 5px;
        padding:0px;
    }
    button:hover{
        background:#fff;
        border: none;
    }
    button:focus{
        background:#fff;
        border: none;
        box-shadow:none;
    }
    button:after{
        display:none;
    }

    .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle{
        background:#fff;
        border: none;
        box-shadow:none;
    }

    .dropdown-menu{
        padding:0px;
        width:100%;
        box-shadow: 0px 0px 8px 0px #ccc;
        border:none;
        max-height:225px;
        overflow-y:auto;
        min-width:120px;
    }

    .dropdown-item{
        margin:0;
        padding:0px;
    }

    .dropdown-item:hover{
        background:#f5f5f5;
    }
    
    .dropdown-item:active{
        background:#f5f5f5;
    }
`;

export const DownArrow = styled(DotsHorizontalRounded)`
    cursor:pointer;
    width:20px;
    color:#666;
    box-sizing: content-box;
    padding-left: 5px;
    padding-right: 5px;
    border-radius:20px;

    :hover{
        background:rgba(56,178,254,0.15);
    }
`;

export const DropdownLink  = styled.div`
    padding:12px 15px;
    display:flex;
    align-items:center;
    cursor:pointer;

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
    line-height:1;
`;