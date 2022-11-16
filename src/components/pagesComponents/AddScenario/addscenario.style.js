import styled from 'styled-components';
import {InputFieldBorder,InputLabel, Commonbtn,
    Card,FlexLayout,FieldSet,ErrorSpan,
    CancelBtn,AddNewBtn} from '../../commonComponents/Global/common.style';
import {Modal} from 'react-bootstrap';
import {PlusCircle} from '@styled-icons/boxicons-solid/PlusCircle';
import {Delete} from '@styled-icons/material/Delete';
import {ArrowLeft} from '@styled-icons/heroicons-solid/ArrowLeft';
import {CircleWithCross} from '@styled-icons/entypo/CircleWithCross';

export const ActionSection = styled.div`
    display:flex;
`;

export const MainContainer = styled.div`
    background:${process.env.REACT_APP_CONTENT_BG_COLOR};
    flex:1 1 auto;
    margin-left:250px;
    height:100%;
    min-height:100vh;
`;

export const BootstrapModal = styled(Modal)`
`;

export const LoaderLayout = styled.div`
    width: 100%;
    position: absolute;
    height: 100%;
    min-height:calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3);
    z-index:1000;
`;

export const CardWrapper = styled.div`
`;
export const ActionHeadingLayout = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:15px;

    svg{
        width: 32px;
        height: 32px;
        color: #282828;
        cursor: pointer;
        padding: 5px;
        border-radius: 100%;

        :hover{
            background:#ccc;
        }
    }
`;

export const CreateActionHeading = styled.h5`
    line-height:1;
    margin-bottom:0px;
    margin-left:5px;
`;

export const CreateActionLayout = styled.div`
`;

export const FieldSetScenario = styled(FieldSet)`

`;

export const InputLabelScenario = styled(InputLabel)`
    color:#444;
    line-height:1;
`;

export const InputFieldBorderScenario = styled(InputFieldBorder)`
    background:transparent;
    border:1px solid #bbb;
`;

export const ErrorSpanAction = styled(ErrorSpan)``;

export const AddButtonsLayouts = styled(FlexLayout)`
    
`;

export const ButtonsLayouts = styled(FlexLayout)`
    justify-content:space-between;
`;

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

export const TopCard = styled(Card)`
    padding:12px 20px 0px;
    margin-bottom:15px;
`;

export const StepsCard = styled(Card)`
    padding:15px 12px 15px 20px;
    background:none;
    display:flex;
    align-items:center;
    box-shadow: 0px 0px 10px 0px #ddd;

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
    // width:30px;
    // height:30px;
    // background:#1f51ad;
    // color:#fff;
    // border-radius:100%;
    // display:flex;
    // align-items:center;
    // justify-content:center;
`;

export const FieldWrapper = styled.div`
    width:100%;
    flex:1 1 auto;
    margin-left:${props => props.marginLeft};
    line-height:1;

`;

export const FieldLabel = styled(InputLabel)`
    margin:0;
    color:#888888;
    line-height:1;
    margin-bottom:5px;
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
    background:#fff;

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
    background:#fff;
    padding:7px;
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

export const BackButtonIcon = styled(ArrowLeft)`
    
`;

export const SaveBtn = styled(Commonbtn)`
    margin-top:25px;
    margin-bottom:120px;
`;

export const CancelBtnAction  = styled(Commonbtn)`
    background:#aaa;
    margin:25px 10px 120px 0px;

    :hover{
        background:#888;
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