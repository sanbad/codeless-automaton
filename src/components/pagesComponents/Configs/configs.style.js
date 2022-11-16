import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,InputLabel,
    Card,FieldSetRound,InputFieldRound,FlexLayout,InputField,FieldSet,ErrorSpan,AddNewBtn,
    CancelBtn,CustomContainer} from '../../commonComponents/Global/common.style';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {Modal} from 'react-bootstrap';
import {PlusCircle} from '@styled-icons/boxicons-solid/PlusCircle';
import {Delete} from '@styled-icons/material/Delete';

export const ConfigSection = styled.div`
    display:flex;

`;

export const BootstrapModal = styled(Modal)`
    .modal-dialog{
        max-width:650px;
    }

    .modal-body{
        max-height:350px;
        //needed if you want to add more configs
        // overflow-y:scroll;
        // overflow-x:hidden;
    }
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

export const DashboardCard = styled(Card)`
    padding:15px;
    display:flex;
    align-items:center;

    svg{
        width:50px;
        height:50px;
        color:#777;
        flex-shrink:0;
    }
`;

export const TableCardLayout = styled.div`
    margin-top:20px;
`;

export const TableCard = styled(Card)`
    padding:0;
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


export const ClearSearchText = styled.p`
    cursor:pointer;
    color:#016eb2;
    margin:0px 0px 0px 10px;

    :hover{
        text-decoration:underline;
    }
`;

export const SearchLayout = styled(FlexLayout)`
`;

export const ConfigTags = styled.span`
    background:transparent;
    border:1px solid #38b2fe;
    padding: 2px 10px;
    color: #38b2fe;
    border-radius: 3px;
    font-weight: 600;
    font-size: 12px;
`;

export const AddNewLayout = styled.div`
    text-align:right;
`;

export const FieldSetRoundSearch = styled(FieldSetRound)`
    max-width:320px;
    flex:1 1 auto;
`;

export const InputFieldRoundSearch = styled(InputFieldRound)`
    min-width:none;
    max-width:320px;
    padding:9px 45px 9px 10px;
    height:40px;
`;

export const CustomContainerEmptyLayout = styled(CustomContainer)`
    padding:${props => props.paddingValue}
`;

export const EmptyCard = styled(Card)`
    padding:100px 40px;
`;

export const CustomText = styled.h6`
    text-align:center;
`;

export const EmptyCardAddNewLayout = styled.div`
    text-align:center;
`;

export const TdPara = styled.p`

`;

export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;


export const ConfigOuterWrapper = styled(FlexLayout)`

`;

export const ConfigIndex = styled.h6`
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

export const FieldLabelPlain = styled(InputLabel)`
    margin:0;
    line-height:1;
    margin-bottom:4px;
`;

export const FieldLabel = styled(InputLabel)`
    margin:0;
    color:#017ecb;
    line-height:1;
    margin-bottom:4px;
`;


export const AddNewConfigLayout = styled(FlexLayout)`
    display:inline-flex;
    cursor:pointer;
`;

export const AddPlusIcon = styled(PlusCircle)`
    width:25px;
    height:25px;
    color: #666;

    ${AddNewConfigLayout}:hover &{
        color:#38b2fe;
    }
`;

export const AddNewText = styled.p`
    color: #666;
    margin-bottom:0px;
    margin-left:5px;

    ${AddNewConfigLayout}:hover &{
        color:#38b2fe;
    }
`;

export const ConfigContainer = styled.div`
    margin-bottom:15px;
`;

export const ConfigDropdownLayout = styled(FlexLayout)`
    align-items:flex-end;
`;

export const FieldSetConfig = styled(FieldSet)`
    margin-bottom:15px;
`;
export const DeleteConfigLayout = styled.div`
    flex-shrink:0;
    margin-left:10px;
    width:30px;
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


export const ModalBodyWrapper = styled.div`
    // max-height:350px;
    // overflow-y:scroll;
    // overflow-x:hidden;
`;