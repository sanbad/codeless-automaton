import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {
    Card,FlexLayout,CustomContainer,FieldSetRound,AddNewBtn,
    CancelBtn,InputFieldRound} from '../../commonComponents/Global/common.style';
import {Search} from '@styled-icons/evaicons-solid/Search';
import {Modal} from 'react-bootstrap';

export const ProjectSection = styled.div`
    display:flex;
`;

export const BootstrapModal = styled(Modal)`
`;

export const MainContainer = styled.div`
    background:#ffffff;
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

export const HeaderTitle = styled.h2`
    line-height:1;
    margin-bottom:0px;
`;

export const HeaderSubTitle = styled.h6`
    margin:0;
    line-height:1;
`;

export const TextLayout = styled.div`
    margin-left:10px;
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
export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
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
    padding: 9px 45px 9px 10px;
    height: 40px;
`;


export const ClearSearchText = styled.p`
    cursor:pointer;
    color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
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