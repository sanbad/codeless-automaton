import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,CommonbtnType2,
    Card,FlexLayout,CancelBtn} from '../../commonComponents/Global/common.style';
import {CheckCircle} from '@styled-icons/boxicons-solid/CheckCircle';
import {Modal} from 'react-bootstrap';
// import {backgroundImg} from '/assets/login-image.jpg';

export const LoginSection = styled.section`
    display:flex;
    align-items:flex-start;
    min-height: 100vh;
    background-image: url("/assets/login-image.jpg");
`;

export const LeftLayout = styled.div`
    width:40%;
    background-size: cover;
    padding-top:80px;
    padding-bottom:80px;

    @media ${device.minlaptopL} {
        padding-left: calc(50% - 660px);
        padding-right:50px;
    }

    @media ${device.laptopL} {
        padding-left: calc(50% - 570px);
        // padding-right: calc(50% - 570px);
        padding-right:50px;
    }
    
    @media ${device.laptopM} {
        padding-left: calc(50% - 480px);
        // padding-right: calc(50% - 480px);
        padding-right:50px;
    }

    @media ${device.laptop} {
        display:none;
    }
`;

export const TextLayout = styled.div`

`;

export const TextLayoutHeading = styled.h4`
    color:#fff;
    font-size:26px;
    line-height:32px;

    @media ${device.laptopM} {
        font-size:24px;
        line-height:30px;
    }
`; 

export const ListLayout = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
`;

export const TickMark = styled(CheckCircle)`
    color:#fff;
    height:30px;
    width:30px;
    opacity:0.9;
    flex-shrink:0;
`;

export const ListText = styled.h6`
    color:#fff;
    opacity:0.9;
    margin:0;
    margin-left:10px;
    font-size:16px;
    line-height:22px;
`;

export const RightLayout = styled.div`
    width:60%;
    min-height:100vh;
    flex-shrink:0;
    display:flex;
    align-items:flex-start;
    background:${process.env.REACT_APP_CONTENT_BG_COLOR};
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
    z-index:99;
`;

export const LoginCard = styled(Card)`
    border:1px solid #ddd;
    position:relative;
`;

export const LoginLayout = styled.div`
    max-width:350px;
    min-width:350px;
    margin:auto;
    text-align:center;
`;

export const Logo = styled.img`
    width:120px;
    height:auto;
    margin-bottom:15px;
`;

export const LoginHeading = styled.h5`
    text-align:center;
`;

export const FieldSet = styled.fieldset`
    margin-bottom:15px;
    text-align:left;
`;

export const InputBox = styled.input`
    display: block;
    padding: 12px 10px;
    font-size: 14px;
    border: none;
    background-color: #eee;
    width:100%;
    outline:0;
    box-sizing:border-box;
    border-radius:3px;
`;

export const SubmitButton = styled(Commonbtn)`
    box-sizing:border-box;
    width:100%;
    border-radius:3px;
`;

export const ForgotPasswordText = styled.p`
    text-align:right;
    margin:0;
    margin-top:10px;
    cursor:pointer;
    line-height:1;

    :hover{
        text-decoration:underline;
    }
`;

export const TermsText = styled.p`
    line-height:1;
    text-align:center;
`;

export const TermsLink = styled.p`
    color:#0056b3;
    font-size:14px;
`;

export const OrLayout = styled(FlexLayout)`
    margin:20px 0px;
`;

export const OrDivider = styled.hr`
    opacity:0.5;
    margin:0;
    width:100%;
`;

export const OrText = styled.div`
    flex-shrink:0;
    margin:0px 5px;
    opacity:0.5;
    font-size:12px;
    line-height:1;
`;

export const SocialLoginLayout = styled.div`
    display:flex;
    align-items:center;

    .google-signin{
        padding: 10px 17px !important;
        border-radius: 5px  !important;
        justify-content: center;
        width:50%;
        margin-right:10px;
        // border:1px solid #bbb !important;
        box-shadow:none !important;
        box-shadow:inset 0px 0px 0px 1px #bbb !important;
    }
    .google-signin span{
        padding:0px !important;
        width:auto;
    }
    .google-signin div{
        padding:0px  !important;
        position: relative;
    }
    span {
        width:50%;
    }
    .facebook-signin{
        background:#1878f2;
        border: none;
        color:#fff;
        font-size: 14px;
        padding: 10px 20px;
        border-radius:5px;
        width:100%;
        cursor:pointer;
        margin-left:10px;
    }
    .facebook-signin i{
        margin-right:10px;
    }
`;

export const RegisterLayout = styled.div`
    margin-top:15px;
    display:flex;
    align-items:center;
    justify-content:center;
`;

export const CommonText = styled.p`
    margin:0;
`;

export const RegisterButton = styled(CommonbtnType2)`
    box-sizing:border-box;
    padding:5px 20px;
    font-size:14px;
    margin-left:10px;
    border-radius:3px;
`;


export const RegisterSection = styled.section`
    display:flex;
    align-items:center;
    min-height: 100vh;
`;

export const ErrorSpan = styled.span`
    font-size:12px;
    color:red;
    margin:0;
`;

export const BootstrapModal = styled(Modal)`

`;

export const ModalSpan = styled.span`
    font-size:14px;
    margin:0;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const LoginLayoutWrapper = styled.div`
    margin:80px auto;
    position:relative;
`;

export const BottomLinksLayout = styled(FlexLayout)`
    justify-content:center;
    margin:8px 5px 0px;
`;

export const BottomLink = styled.a`
    font-size:13px;
    color:#666;
    margin:0px 10px;

    :hover{
        text-decoration:underline;
    }
`;