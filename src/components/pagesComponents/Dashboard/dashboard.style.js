import styled from 'styled-components';
import {Card,CustomContainer} from '../../commonComponents/Global/common.style';

export const DashboardSection = styled.div`
    display:flex;
`;

export const MainContainer = styled.div`
    background:#fff;
    flex:1 1 auto;
    margin-left:250px;
    height:100%;
    min-height:100vh;
    position:relative;
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
    font-size:16px;
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

export const StatusSpan = styled.span`
    color:#fff;
    background:${props => props.color};
    padding: 5px 12px;
    border-radius:3px;
    display:inline-block;
    font-size:12px;
    line-height:1;
`;

export const ResendMailContainer = styled.div`
    width:100%;
    padding:25px 25px 0px;
    position:relative;
`;

export const EmptyCard = styled(Card)`
    padding:30px;
`;

export const CustomText = styled.h6`
    text-align:center;
`;

export const EmptyCardAddNewLayout = styled.div`
    text-align:center;
`;

export const SuccessSpan = styled.span`
    font-size:14px;    
    color:green;
    margin:0;
    display:block;
    text-align:center;
`;


export const LoaderLayout = styled.div`
    width: 100%;
    position: fixed;
    height: 100%;
    top:0;
    left:0;
    background:rgba(0,0,0,0.1);
    z-index:1000;
    margin-left:250px;
    display:flex;
    align-items:center;

    div{
        position: absolute;
        left: calc(50% - 150px);
    }
`;

export const CustomContainerEmptyLayout = styled(CustomContainer)`
    padding:${props => props.paddingValue}
`;