import styled from 'styled-components';
import {InputFieldBorder,InputLabel, Commonbtn,
    Card,FlexLayout,FieldSet,ErrorSpan,
    CancelBtn,AddNewBtn} from '../../commonComponents/Global/common.style';
import {Modal} from 'react-bootstrap';
import {PlusCircle} from '@styled-icons/boxicons-solid/PlusCircle';
import {Delete} from '@styled-icons/material/Delete';
import {CircleWithCross} from '@styled-icons/entypo/CircleWithCross';

export const BootstrapModalAddAction = styled(Modal)`
    .modal-dialog{
        max-width:900px;
    }

    .modal-body{
        height:65vh;
        max-height:65vh;
        overflow:scroll;
    }
`;

export const DialogLayout = styled.div`
    
`;

export const BootstrapModal = styled(Modal)`
    background:#00000088;
`;

export const CardWrapper = styled.div`
`;

export const CreateActionLayout = styled.div`
`;

export const FieldSetAction = styled(FieldSet)``;

export const InputLabelAction = styled(InputLabel)`
    margin:0;
    margin-bottom:5px;
    color:#444;
`;

export const InputFieldBorderAction = styled(InputFieldBorder)`
    background:transparent;
    border:1px solid #bbb;
`;

export const ErrorSpanAction = styled(ErrorSpan)``;

export const AddNewStepLayout = styled(FlexLayout)`
    display:inline-flex;
    cursor:pointer;
    margin-top:5px;
`;

export const AddPlusIcon = styled(PlusCircle)`
    width:25px;
    height:25px;
    color: #666;

    ${AddNewStepLayout}:hover &{
        color:#38b2fe;
    }
`;

export const AddNewText = styled.p`
    color: #666;
    margin-bottom:0px;
    margin-left:5px;

    ${AddNewStepLayout}:hover &{
        color:#38b2fe;
    }
`;
export const List = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
`;

export const ListItem  = styled.li`
    margin:0 0 10px 0;
    padding:0;
    border-radius:5px;
    background:#fff;
`;

export const StepsCard = styled(Card)`
    padding:15px 12px 15px 20px;
    background:none;
    display:flex;
    align-items:center;
    box-shadow: 0px 0px 6px 0px #ddd;
    border:1px solid #ddd;

    .row{
        flex:1 1 auto;
    }
`;

export const ActionOuterWrapper = styled(FlexLayout)`

`;

export const StepIndex = styled.h6`
    margin:0;
    line-height:0;
    flex-shrink:0;
    color:#666;
`;

export const FieldWrapper = styled.div`
    width:100%;
    flex:1 1 auto;
    margin-left:${props => props.marginLeft};
    line-height:1;

`;

export const FieldLabel = styled(InputLabel)`
    margin:0;
    color:#017ecb;
    line-height:1;
    margin-bottom:4px;
`;

export const ElementSelectButton = styled.button`
    display: block;
    background: none;
    border: none;
    height: 38px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 8px;
    display:flex;
    align-items:center;
    justify-content:space-between;

    :focus{
        outline:0;
        border:1px solid #2684ff;
        box-shadow:0px 0px 0px 1px #2684ff;
    }

    p{
        margin:0;
        font-size: 13px;
        color:#333;
    }
`;
export const InputFieldBorderStepVal = styled(InputFieldBorder)`
    background:transparent;
    padding:7px;
    color:#666;
`;
export const DeleteStepLayout = styled.div`
    flex-shrink:0;
    margin-left:10px;
`;

export const DeleteIconHolder = styled.div`
    text-align:right;
    cursor:pointer;
`;

export const DeleteIcon = styled(Delete)`
    width:25px;
    height:25px;
    color:#777;

    :hover{
        color:#38b2fe;
    }
`;

export const InputLayout = styled.div`
    position:relative;
`;
export const CircleWithCrossIcon = styled(CircleWithCross)`
    width:25px;
    height:25px;
    color:#777;
    position:absolute;
    right: 5px;
    top: 6px;
    cursor: pointer;

    :hover{
        color:#38b2fe;
    }
`;

export const SaveBtnDialog = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const ChooseParameterLayout = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;

    button{
        background:none;
        border:none;
        color:#38b2fe;
        font-size: 12px;
        margin-top: 5px;
    }
`;