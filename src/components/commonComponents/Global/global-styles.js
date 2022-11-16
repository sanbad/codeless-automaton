import {createGlobalStyle} from 'styled-components';
import {device} from './device';

const GlobalStyle = createGlobalStyle`
    body{
        font-family: 'Poppins', sans-serif;
        font-weight: 400;

        .ReactModal__Overlay{
            z-index:9999 !important;
        }

        .modal-backdrop{
            z-index:1050;
        }
    }

    h1,h2,h3,h4,h5,h6{
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        margin-bottom:20px;
        color:${process.env.REACT_APP_HEADING_COLOR};
    }
    h1{
        font-size:48px;
        line-height:54px;

        @media ${device.laptop} {
            font-size:42px;
            line-height:48px;
        }

        @media ${device.mobileXL} {
            font-size:38px;
            line-height:44px;
        }
    }
    h2{
        font-size: 42px;
        line-height:48px;

        @media ${device.tablet} {
            font-size:40px;
            line-height:46px;
        }
    }
    h3{
        font-size: 36px;
        line-height:42px;
    }
    h4{
        font-size:30px;
        line-height:36px;

        @media ${device.tablet} {
            font-size:28px;
            line-height:32px;
        }
    }
    h5{
        font-size:22px;
        line-height:28px;
    }
    h6{
        font-size:18px;
        line-height:24px;

        @media ${device.tablet} {
            text-align:left;
        }

        @media ${device.mobileXL} {
            font-size:17px;
            line-height:23px;
        }
    }

    p{
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        color:${process.env.REACT_APP_PARAGRAPH_COLOR};
        margin-bottom:20px;
        font-size:14px;
        line-height:1.5;
    }
    a{
        font-size:16px;
        font-family: 'Poppins', sans-serif;
        font-weight:400;
        margin:0;
    }
    img{
        margin-bottom:0px;
    }
    span{
        font-family: 'Poppins', sans-serif;
        font-weight:400;
    }
    .text-center{
        text-align:center;
    }
    .tagChecklist{
        border-radius:4px !important;
    }
    .e-content.e-dropdownbase{
        border-radius:4px !important;
    }
    .e-checkbox-wrapper .e-frame.e-check, .e-css.e-checkbox-wrapper .e-frame.e-check{
        background-color:${process.env.REACT_APP_PRIMARY_COLOR} !important;
    }
    #tagsCheckbox_popup{
        font-family: 'Poppins', sans-serif !important;
    }
    .pagination{
        margin-bottom:0;
    }
`;

export default GlobalStyle;