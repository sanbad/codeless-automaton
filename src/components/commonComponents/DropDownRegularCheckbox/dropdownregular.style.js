import styled from 'styled-components';
import {ChevronThinDown} from '@styled-icons/entypo/ChevronThinDown';

export const DropdownWrapper = styled.div`
    position:relative;

    button{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:none;
        border: none;
        padding:5px;
    }
    button:hover{
        background:#f1f1f1;
        border: none;
    }
    button:focus{
        background:#f1f1f1;
        border: none;
        box-shadow:none;
    }
    button:after{
        display:none;
    }

    .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle{
        background:#f1f1f1;
        border: none;
        box-shadow:none;
    }

    .dropdown-menu{
        padding:0px;
        width:100%;
        box-shadow: 0px 0px 8px 0px #ccc;
        border:none;
        max-height:225px;
        overflow-y:scroll;
    }

    .dropdown-item{
        margin:0;
        padding:8px 15px;
        border-bottom:none;
    }

    .dropdown-item:hover{
        background:#f5f5f5;
    }
    
    .dropdown-item:active{
        background:#f5f5f5;
    }
`;

export const Placeholder = styled.p`
    line-height:1;
    margin:0;
    color:#666;
`;

export const DownArrow = styled(ChevronThinDown)`
    width:15px;
    color:#666;
`;


export const DropdownText = styled.p`
    margin:0;
    color:#282828;
    font-size:13px;
`;