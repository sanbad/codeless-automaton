import styled from 'styled-components';
import {device} from '../Global/device';
import {AddNewBtn,CancelBtn,
    FlexLayout,FieldSet,InputLabel,ErrorSpan} from '../Global/common.style';
import {Warning} from '@styled-icons/icomoon/Warning';
import {Modal} from 'react-bootstrap';

export const BootstrapModal = styled(Modal)`
`;

export const WarningDialogLayout = styled.div`
    display:flex;
    flex-direction:column;
    text-align:center;
    padding:10px;
`;

export const WarningDialogIcon = styled(Warning)`
    height:60px;
    width:60px;
    color:red;
    margin:0px auto 20px;
`;

export const WarningDialogHeading = styled.h5`
    line-height:1;
    margin-bottom:15px;
`;

export const WarningDialogPara = styled.p`

`;
export const AlertFieldSet = styled(FieldSet)`

`;
export const AlertInputLabel = styled(InputLabel)`

`;

export const WarningDialogInput = styled.input`
    display: block;
    padding: 12px 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    background-color: #fff;
    width:100%;
    outline:0;
    box-sizing:border-box;
    border-radius:5px;
    min-width:300px;
    margin-bottom:10px;
`;

export const WarningButtonLayout = styled(FlexLayout)`
    justify-content:center;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
    margin-right:10px;
`;

export const ProceedBtnDialog = styled(AddNewBtn)`
    border:none;
    margin-left:${props => props.marginLeft};
    background:${props => props.saveBtnColor};

    :hover{
        background:${props => props.saveBtnHoverColor};
    }
`;


export const ErrorSpanAlert = styled(ErrorSpan)`
`;