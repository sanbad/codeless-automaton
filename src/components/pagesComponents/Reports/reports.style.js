import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,
    Card,FlexLayout,InputField,FieldSet,ErrorSpan,AddNewBtn,CustomContainer,
    CancelBtn} from '../../commonComponents/Global/common.style';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {Modal} from 'react-bootstrap';

export const ReportSection = styled.div`
    display:flex;

`;

export const BootstrapModal = styled(Modal)`
    &.modal.right .modal-dialog {
        width:320px;
        transform: translate3d(0%, 0, 0);
        width:60%;
        max-width:60%;
        height:100%;
        margin:0;
        position:absolute;
    }

    &.modal.right.fade .modal-dialog {
        right: -320px;
        transition: opacity 0.3s linear, right 0.3s ease-out;
    }

    &.modal.right.show .modal-dialog {
        right: 0;
    }

    .modal-content{
        height:100%;
    }
`;

export const LivelogBrowsersLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:10px;
`;

export const BrowserDetailsLayout = styled.div`
    display: flex;
    align-items: center;

    h6{
        margin-bottom:0;
        text-transform: capitalize;
    }
`;

export const SaveBtnDialog = styled(AddNewBtn)`
    border:none;
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
    margin-top:5px;
`;

export const TableCard = styled(Card)`
    padding:0;
`;

export const SearchIcon = styled(Search)`
    color:#666;
    height:26px;
    width:26px;
    padding: 10px;
    box-sizing: content-box;
    cursor:pointer;
    position:absolute;
    top:0;
    right:0;
`;

export const SearchLayout = styled.div`
    // padding:20px 20px 0px;
    border:none;
    padding:0;

    .react-datepicker-wrapper{
        width:100%;
    }

    .react-datepicker__input-container input{
        width:100%;
        font-size: 14px;
        padding: 7px;
        color:#666;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
`;

export const ExecIdInput = styled(InputField)`
    padding:7px;
    background:#fff;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

export const ReportTags = styled.span`
    background:transparent;
    border:1px solid #38b2fe;
    padding: 2px 10px;
    color: #38b2fe;
    border-radius: 3px;
    font-weight: 600;
    font-size: 12px;
`;

export const StatusSpan = styled.span`
    color:#fff;
    background:${props => props.color};
    padding: 5px 9px;
    border-radius:3px;
    display:inline-block;
    font-size:11px;
    line-height:1;
`;

export const StatusSpanRunning = styled.span`
    color:#fff;
    background:${props => props.color};
    padding: 5px 9px;
    border-radius:3px;
    font-size:11px;
    line-height:1;
    display:inline-flex;
    align-items:center;

    //running symbol
    svg{
        height:18px;
        width:18px;
        margin-right: 3px;
        margin-left: -2px;
        animation: mymove 3s linear infinite;
    }

    @keyframes mymove {
        100% {transform: rotate(360deg);}
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


export const SaveBtnSearch = styled(AddNewBtn)`
    border:none;
    padding:6px 30px;
    margin-right:10px;
`;

export const CancelBtnSearch = styled(CancelBtn)`
    border:none;
    padding:6px 30px;
    margin-right:10px;
`;

export const ClearSearchText = styled.p`
    cursor:pointer;
    color:#016eb2;
    margin:0px 0px 15px;
    display:inline-block;

    :hover{
        text-decoration:underline;
    }
`;