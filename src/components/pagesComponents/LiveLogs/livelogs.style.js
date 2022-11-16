import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {FieldSetRound, Card, InputFieldRound,AddNewBtn,CustomContainer,
    CancelBtn,FlexLayout} from '../../commonComponents/Global/common.style';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Row, Col} from 'react-bootstrap';

export const ProjectDetailsSection = styled.div`
`;

export const LiveLogsLayout = styled.div`
    padding-left:20px;
    padding-top:20px;
    background:#000;
    height:calc(100vh - 106px);
    overflow:scroll;
`;

export const ScenarioLayout = styled.div`
    h6{
        color:#fff;
        font-size:14px;
        margin-bottom:5px;
        margin-top:7px;
        line-height:1;
    }
`;

export const StepRow = styled.div`
    padding-left:20px;
    display:flex; 
    align-items:center;
`;

export const StepCell = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    flex-shrink:0;
    margin-bottom:3px;
    flex-wrap: wrap;
    p{
        color:#fff;
        margin-bottom:0;
        font-size:13px;
    }
    .stateblink{
        margin-left:20px;
        color:#03d003;
        animation: blink 1s linear infinite;
    }

    .resultPass{
        margin-left:20px;
        color:#00bf00;
    }

    .resultfail{
        margin-left:20px;
        color:#ff0000;
    }

    .resultskip{
        margin-left:20px;
        color:#6c6c6c;
    }


    @keyframes blink{
        0%{opacity: 0;}
        50%{opacity: .5;}
        100%{opacity: 1;}
    }
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
