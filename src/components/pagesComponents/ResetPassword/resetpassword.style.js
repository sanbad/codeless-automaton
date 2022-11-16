import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,
    Card,FlexLayout,FieldSet,ErrorSpan} from '../../commonComponents/Global/common.style';


export const ResetPasswordSection = styled.section`
    display:flex;
    align-items:center;
    min-height:100vh;
    background:${process.env.REACT_APP_CONTENT_BG_COLOR};
`;

export const ResetCard = styled(Card)`
    margin:80px auto;
    position:relative;
`;

export const RadicalTestLogo = styled.img`
    width: 180px;
    margin-bottom: 30px;
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
`;

export const ResetPassHeading = styled.h5`
    text-align:center;
`;

export const SubmitButton = styled(Commonbtn)`
    box-sizing:border-box;
    width:100%;
`;

export const ResetPasswordLayout = styled.div`
    max-width:350px;
    min-width:350px;
    margin:auto;
    text-align:center;
`;
