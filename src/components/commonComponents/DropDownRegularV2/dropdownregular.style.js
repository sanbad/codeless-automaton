import styled from 'styled-components';
import {ChevronThinDown} from '@styled-icons/entypo/ChevronThinDown';

export const DropdownWrapper = styled.div`
    position:relative;

    button{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:#fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10.2px 10px;
    }
    button:hover{
        background:#fff;
        border: 1px solid #ddd;
    }
    button:focus{
        background:#fff;
        border: 1px solid #ddd;
        box-shadow:0px 0px 3px 0px #ccc;
    }
    button:after{
        display:none;
    }

    .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle{
        background:#fff;
        border: 1px solid #ddd;
        box-shadow:0px 0px 3px 0px #ccc;
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
        padding:8px 10px;
        border-bottom: 1px solid #eee;
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
    margin-left:10px;
`;


export const DropdownText = styled.p`
    margin:0;
    color:#282828;
    font-size:13px;
`;