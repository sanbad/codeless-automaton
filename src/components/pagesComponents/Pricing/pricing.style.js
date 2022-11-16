import styled from 'styled-components';
import {Card,CustomContainer} from '../../commonComponents/Global/common.style';

export const DashboardSection = styled.div`
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


export const PricingCard = styled(Card)`
    padding:15px;

`;

export const TopHeading = styled.h6`
    text-align: center;
    margin-bottom: 0;
    background: #38b2fe22;
    margin: -15px -15px 0px -15px;
    padding: 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

export const PricingBottomLayout = styled.div`
    margin: 0px -15px -15px -15px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top:1px solid #ccc;

    p{
        line-height:1;
        padding:20px;
        margin:0;
    }
`;

export const PricingFeatureListLayout = styled.div`
    margin-top:25px;
    margin-bottom:25px;
    min-height:255px;
    ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li{
        display:flex;
        align-items:center;
        line-height:1;
        margin-bottom:10px;
        font-size:14px;

        svg{
            width:20px;
            color:#38b2fe;
            flex-shrink:0;
            margin-right:10px;
        }

        span{
            margin-left:3px;
        }
    }
`;

export const PricingCardTopLayout = styled.div`
    text-align: center;
    margin-top: 20px;

    img{
        height:70px;
        width:auto;
        margin-bottom:10px;
    }
    h4{
        margin-bottom:10px;
        line-height:1;
    }
    p{
        line-height:1;
    }
    span{
        color: #777;
        font-weight: 600;
    }
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