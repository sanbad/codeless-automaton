import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {FieldSetRound, Card, InputFieldRound,AddNewBtn,CustomContainer,
    CancelBtn,FlexLayout} from '../../commonComponents/Global/common.style';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {Warning} from '@styled-icons/icomoon/Warning';
import {InfoOutline} from '@styled-icons/evaicons-outline/InfoOutline';
import {Modal} from 'react-bootstrap';

export const ActionSection = styled.div`
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

export const AccordianLayout = styled.div`
    margin-top:20px;
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

export const ActionTags = styled.span`
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