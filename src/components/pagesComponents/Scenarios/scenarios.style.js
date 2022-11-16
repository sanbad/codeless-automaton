import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,CustomContainer,
    Card,FieldSetRound,InputFieldRound,FieldSet,CancelBtn,FlexLayout,AddNewBtn} from '../../commonComponents/Global/common.style';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {Modal} from 'react-bootstrap';

export const ScenarioSection = styled.div`
    display:flex;
`;

export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const BootstrapModal = styled(Modal)`
`;

export const MainContainer = styled.div`
    background:#fff;
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
    margin-top:15px;
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

export const ScenarioTags = styled.span`
    background:transparent;
    // border:1px solid #228B22;
    padding: 2px 10px;
    color: ${process.env.REACT_APP_PRIMARY_COLOR};
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
    margin-right:3px;
    cursor:pointer;
    background:${process.env.REACT_APP_PRIMARY_COLOR+"11"};
    display:inline-flex;
    margin-bottom:2px;
`;

export const AddNewLayout = styled.div`
    text-align:right;
`;

export const FieldSetRoundSearch = styled(FieldSetRound)`
    max-width:300px;
    flex:1 1 auto;
`;

export const InputFieldRoundSearch = styled(InputFieldRound)`
    min-width:none;
    max-width:300px;
    padding: 9px 45px 9px 10px;
    height: 40px;

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #ccc;
        opacity: 1; /* Firefox */
    }
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

export const SelectionCheckboxWrapper = styled(FlexLayout)`
    background: #fff;
    align-self: stretch;
    margin-right: 10px;
    padding: 8px;
    height:40px;
    border-radius: 5px;
    border:1px solid #ddd;
`;

export const CheckboxLayout = styled(FlexLayout)`
`;

export const InputFieldCheckBox = styled.input`
    height:22px;
    width:22px;
    margin-right:2px;
    cursor:pointer;
`;

export const TableRowCheckBox = styled.input`
    height:20px;
    width:20px;
    cursor:pointer;
`;

export const SelectionInfoLayout = styled(FlexLayout)`
    justify-content: center;
    background: #eee;
    padding: 8px;
    margin-top: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;  

export const SelectionInfoText = styled.p`
    line-height:1;
    margin-bottom:0;
    margin-right:15px;
`;

export const RunScenarioBtn = styled(AddNewBtn)`
    padding:5px 20px;
`;

export const SelectTagsDropdownLayout = styled.div`
    margin-left:10px;
    font-size:14px;
    min-width:120px;


    .tagChecklist{
        font-family: 'Poppins', sans-serif !important;
    }
    
    .e-multiselect{
        font-family: 'Poppins', sans-serif !important;
        margin:0 !important;
        border:none !important;
        border-radius:5px;
        min-width:190px;
    }
    .e-multiselect:before{
        display:none !important;
    }
    .e-multiselect:after{
        display:none !important;
    }
    .e-multi-select-wrapper{
        background:#fff;
        padding:6px 0px 6px 10px !important; 
        border-radius:5px;
        box-shadow:inset 0px 0px 0px 1px #ddd;
    }
    .e-remain{
        padding-left:0px !important;
    }

    .e-filter-parent{
        border:none;
        box-shadow:none;
    }

    .e-multi-select-wrapper input[type="text"]{
        ::placeholder{
            color:ccc !important;
            opacity:1 !important;
        }
    }
`;