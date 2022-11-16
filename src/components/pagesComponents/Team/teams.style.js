import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,InputLabel,FieldSet,FieldSetRound,InputFieldRound,
    Card,FlexLayout,CancelBtn,AddNewBtn} from '../../commonComponents/Global/common.style';
import {CheckCircle} from '@styled-icons/boxicons-solid/CheckCircle';
import {CircleWithCross} from '@styled-icons/entypo/CircleWithCross';
import {Modal} from 'react-bootstrap';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Search} from '@styled-icons/evaicons-solid/Search';

export const TeamSection = styled.div`
    display:flex;
`;

export const MainContainer = styled.div`
    background:${process.env.REACT_APP_CONTENT_BG_COLOR};
    flex:1 1 auto;
    margin-left:250px;
    height:100%;
    min-height:100vh;
    position:relative;
`;

export const LoaderLayout = styled.div`
    width: 100%;
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    background:rgba(0,0,0,0.05);
    z-index:1000;
`;

export const CardOuterLayout = styled.div`
    margin-top:20px;
    margin-bottom:20px;
`;

export const TeamCard = styled(Card)`
    padding:0px;
`;

export const TeamMemberLayout = styled.div`
    padding:20px;
    border-bottom:1px solid #eaeaea;
`;

export const TopLayout = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
`;

export const MemberDetailsLayout = styled.div`
    display:flex;
    align-items:flex-start;
    margin-bottom:10px;
`;

export const TableDetails = styled.table`

`;

export const TableRow = styled.tr`

`;

export const TableData = styled.td`
    padding:2px;
`;

export const ProfileImage = styled.img`
    width:85px;
    height:85px;
    border-radius:5px;
    object-fit:cover;
`;

export const MemberDetailsTextLayout = styled.div`
    margin-left:10px;
`;

export const TextLayout = styled.div`
    margin-left:10px;
`;

export const ActionButtonsLayout = styled.div`
    display:flex;
`;

export const ActionButton = styled(FlexLayout)`
    border:1px solid #666;
    border-radius:5px;
    padding:5px 15px;
    margin-left:10px;
    cursor:pointer;

    :hover{
        border:1px solid ${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const ActionButtonText = styled.p`
    line-height:1;
    margin:0;
    margin-left:5px;
    
    ${ActionButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const PrivilegeSingleLayout = styled.div`
    display:flex;
    align-items:center;
    margin-top:5px;
    margin-left:15px;

    :first-child{
        margin-left:0px;
    }
`;

export const TableText = styled.h6`
    font-size:14px;
    margin:0;
    line-height:1;
    margin-left:8px;
`;

export const StatusSpan = styled.span`
    font-size:12px;
    background:${props => props.alertflag?"#e60000":"#d5ceff"};
    color:${props => props.alertflag?"#fff":"#282828"};
    padding:2px 5px;
    margin-left: 10px;
    margin-top: 3px;
    display: inline-block;
    border-radius: 3px;
`;

export const PrivilegeText = styled.h6`
    font-size:16px;
    margin:0;
    line-height:1;
    margin-left:5px;
`;

export const AddNewLayout = styled.div`
    text-align:right;
`;

export const CheckSpan = styled(CheckCircle)`
    color:green;
    width:25px;
    height:25px;
`;

export const CrossSpan = styled(CircleWithCross)`
    color:red;
    width:25px;
    height:25px;
`;

export const ButtonLayout = styled.div`
    display:flex;
    align-items:center;
    border:1px solid #666;
`;

export const EditIcon = styled(EditAlt)`
    height:20px;
    width:20px;
    color:#666;
    ${ActionButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const DeleteIcon = styled(Delete)`
    height:20px;
    width:20px;
    color:#666;
    ${ActionButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const ButtonText = styled.p`
    margin:0;
    margin-left:10px;
`;

export const BootstrapModal = styled(Modal)`

    .close{
        outline:0;
    }
`;
export const InputLabelEmail = styled(InputLabel)`
    margin-bottom:5px;
    line-height:1;
`;
export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const FormHeading = styled.h6`

`;
export const CheckboxLayout = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:${props => props.marginBottom?"20px":"0px"};
`;
export const InputFieldCheckBox = styled.input`
    height:25px;
    width:25px;
    margin-right:10px;
    cursor:pointer;
`;

export const CheckBoxLabel = styled.label`
    font-size:14px;
    color:#666;
    margin:0;
    line-height:1;
    cursor:pointer;
`;

export const SearchLayout = styled(FlexLayout)`
`;

export const FieldSetRoundSearch = styled(FieldSetRound)`
    max-width:320px;
    flex:1 1 auto;
`;

export const InputFieldRoundSearch = styled(InputFieldRound)`
    min-width:none;
    max-width:320px;
    padding: 9px 45px 9px 10px;
    height: 40px;
`;
export const ClearSearchText = styled.p`
    cursor:pointer;
    color:#016eb2;
    margin:0px 0px 0px 10px;

    :hover{
        text-decoration:underline;
    }
`;
export const SearchIcon = styled(Search)`
    color:#666;
    height:26px;
    width:26px;
    padding: 7px;
    box-sizing: content-box;
    cursor:pointer;
    position:absolute;
    top:0;
    right:0;
`;