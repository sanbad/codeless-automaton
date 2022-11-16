import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {AddNewBtn,CancelBtn,
    FlexLayout} from '../../commonComponents/Global/common.style';
import {Warning} from '@styled-icons/icomoon/Warning';
import {InfoOutline} from '@styled-icons/evaicons-outline/InfoOutline';
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

export const WarningDialogInfoIcon = styled(InfoOutline)`
    height:60px;
    width:60px;
    color:#016eb2;
    margin:0px auto 20px;
`;


export const WarningDialogHeading = styled.h5`
    line-height:1;
    margin-bottom:15px;
`;

export const WarningDialogPara = styled.p`

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