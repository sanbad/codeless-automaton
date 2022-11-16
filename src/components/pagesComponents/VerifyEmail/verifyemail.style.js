import styled from 'styled-components';
import {Commonbtn,Card} from '../../commonComponents/Global/common.style';
import {CheckCircle} from '@styled-icons/boxicons-solid/CheckCircle';
import {CircleWithCross} from '@styled-icons/entypo/CircleWithCross';

export const VerifySection = styled.div`
    display:flex;
`;

export const MainContainer = styled.div`
    background:${process.env.REACT_APP_CONTENT_BG_COLOR};
    flex:1 1 auto;
    height:100%;
    min-height:100vh;
    padding:30px;
    text-align:center;
`;

export const VerifyEmailCard = styled(Card)`
    text-align:center;
    display:inline-block;
    padding:50px;
`;

export const RadicalTestLogo = styled.img`
    width: 230px;
    margin-bottom: 30px;
`;

export const VerifyHeading = styled.h2`
    margin-bottom:10px;
    line-height:1;
`;

export const FailedIcon = styled(CircleWithCross)`
    height:150px;
    margin-bottom:10px;
    color:#9E0C0F;
`;

export const SuccessIcon = styled(CheckCircle)`
    height:150px;
    margin-bottom:10px;
    color: green;
`;

export const MessageText = styled.h6``;

export const LoginBtn = styled(Commonbtn)``;