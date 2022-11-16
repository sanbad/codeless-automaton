import styled from 'styled-components';
import {device} from '../Global/device';
import {
    Card,FlexLayout,CustomContainer,FieldSetRound,AddNewBtn,ErrorSpan,
    CancelBtn,InputFieldRound} from '../Global/common.style';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {Modal} from 'react-bootstrap';


export const BootstrapModal = styled(Modal)`
    .modal-dialog{
        max-width:350px;
    }
    .modal-body{
        padding:0px;

        button{
            // position:absolute;
            // top:0;
        }
    }

    .element-select__option--is-selected p {
        color:#fff;
    }
`;

export const BootstrapModalAddDialog = styled(Modal)`
`;

export const ValueContainerLayout = styled.div`
    display:flex;
    align-items:center;
    width:100%;

    svg{
        width:25px;
        color:#333;
        flex-shrink:0;
        margin-left:3px;
    }

    button{
        background:none;
        border:none;
    }
`;

export const OptionsLayout = styled.div`
    p{
        font-size:13px;
        color:#333;
        margin-bottom:5px;
        line-height:1;
    }

    .ele-value{
        color:#777;
        margin:0;
        font-size:11px;
    }
`;

export const ButtonLayout = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    border-top:1px solid #ccc;

    button{
        width:50%;
        background:none;
        border:none;
        color:#017ecb;
        font-size:13px;
        padding:7px;

        :hover{
            background:#eee;
        }
    }
`;

export const SaveBtnDialog = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const InfoSpan = styled(ErrorSpan)`
    color:#aaa;
`;