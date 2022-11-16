import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {FieldSetRound, Card, InputFieldRound,AddNewBtn,CustomContainer,CardHeadingLayout,
    CancelBtn,FlexLayout,CardHeading} from '../../commonComponents/Global/common.style';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {FilterCircleFill} from '@styled-icons/bootstrap/FilterCircleFill';
import {CheckCircle} from '@styled-icons/boxicons-solid/CheckCircle';
import {CircleWithCross} from '@styled-icons/entypo/CircleWithCross';
import {Check} from '@styled-icons/boxicons-regular/Check';
import {Minus} from '@styled-icons/boxicons-regular/Minus';
import {Video} from '@styled-icons/entypo/Video';
import {Modal} from 'react-bootstrap';

export const ActionDetailsSection = styled.div`
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
    max-height:100vh;
    align-items: center;
    justify-content: center;
    top:0;
    left:0;
    background:rgba(0,0,0,0.05);
    z-index:1000;
`;

export const CardOuterLayout = styled.div`
`;

export const DetailsCard = styled(Card)`
    padding:0px;
    margin-top:${props => props.marginTop?"20px":"0px"};

    .topSticky{
        position:sticky;
        top:0;
    }
`;

export const ActionListLayout = styled.div`
    padding:0px 20px 20px;
    margin-top:${props => props.marginTop?"20px":"0px"}
`;

export const DetailsLayout = styled(FlexLayout)`
    padding:16px 20px 20px;
    align-items:flex-start;
`;

export const TopLeftLayout = styled.div`
    flex-grow:1;
`;

export const ActionInfoLayout = styled.div`
padding-bottom:${props => props.paddingBottom===true?"10px":"0px"}
`;

export const TableDetails = styled.table`

`;

export const TableRow = styled.tr`

`;

export const TableData = styled.td`
    padding:2px;
    font-size:14px;
`;


export const ActionButtonsLayout = styled.div`
    display:flex;
`;

export const ActionAnchor = styled.a`
    :hover{
        text-decoration:none;
    }
`;

export const ActionButton = styled(FlexLayout)`
    border:1px solid #666;
    border-radius:5px;
    padding:5px 15px;
    margin-left:10px;
    cursor:pointer;
`;

export const ActionButtonText = styled.p`
    line-height:1;
    margin:0;
    margin-left:5px;
    
    ${ActionButton}:hover &{
        color:#38b2fe;
    }
`;

export const EditIcon = styled(EditAlt)`
    height:25px;
    width:25px;
    color:#666;
    ${ActionButton}:hover &{
        color:#38b2fe;
    }
`;

export const DeleteIcon = styled(Delete)`
    height:25px;
    width:25px;
    color:#666;
    ${ActionButton}:hover &{
        color:#38b2fe;
    }
`;

export const TableLayout = styled.div`

`;

export const FaqRow = styled.div`
    margin-bottom:0px;
`;
export const RadioLayout = styled(FlexLayout)`
    margin-bottom:10px;
    margin-left:${props => props.marginLeft?props.marginLeft:0};
`;

export const RadioButton = styled.input.attrs(props => ({
        type: 'radio',
        size: props.small ? 5 : undefined,
    }))`

    border-radius: 3px;
    border: 1px solid palevioletred;
    margin: 0;
    width:18px;
    height:18px;
    padding: ${props => props.padding};
  
    ::placeholder {
      color: palevioletred;
    }
  `;

export const RadioLabel = styled.label`
    line-height:1;
    margin:0;
    margin-left:10px;
    font-size:16px;
    color:#666;
    cursor:pointer;
`;

export const GraphLayout = styled(FlexLayout)`
    justify-content:center;
    width:400px;
`;

export const BottomLayout = styled(FlexLayout)`
    padding: 0px 20px 20px;
`;
export const ButtonsCountLayout = styled(FlexLayout)`
    justify-content:space-between;
    margin-top:10px;
    width:100%;
`;

export const ActionButtonsCountLayout = styled(FlexLayout)`
`;

export const ScenarioCountLayout = styled(FlexLayout)`
    margin-top:10px;
`;

export const ScenarioIconTextLayout = styled(FlexLayout)`
    margin-right:20px;
`;

export const ActionIconTextLayout = styled(FlexLayout)`
    margin-right:15px;
`;

export const VideoIconTextLayout = styled(FlexLayout)`
    margin-right:15px;
    background:#fff;
    border:none;
    box-shadow:none;
`;

export const TotalScenarios = styled(FilterCircleFill)`
    width:60px;
    height:60px;
    color:#666;
    flex-shrink:0;
    padding:5px;
`;

export const TotalSuccessScenarios = styled(CheckCircle)`
    color:green;
    width:60px;
    height:60px;
    flex-shrink:0;
`;

export const TotalFailedScenarios = styled(CircleWithCross)`
    color:red;
    width:60px;
    height:60px;
    flex-shrink:0;
`;

export const ScenarioCountTextLayout = styled.div`
    margin-left:5px;
`;

export const ScenarioCountText = styled.h5`
    margin-bottom:2px;
    line-height:1;
`;

export const ActionCountText = styled.h6`
    margin-bottom:0;
    line-height:1;
    margin-top:2px;
`;

export const ScenarioTextBottom = styled.p`
    margin-bottom:0;
    line-height:1;
`;

export const TotalActions = styled(FilterCircleFill)`
    width:25px;
    height:25px;
`;

export const TotalSuccessActions = styled(Check)`
    width:25px;
    height:25px;
    color:green;
`;

export const TotalSkippedActions = styled(Minus)`
    width:25px;
    height:25px;
    color:#666;
`;
export const VideoAction = styled(Video)`
    width:25px;
    height:25px;
    color:#666;
    flex-shrink:0;
    margin-right:5px;
`;

export const ButtonContainer = styled(FlexLayout)`
`;

export const DownloadBtn = styled(AddNewBtn)`
    border:none;
    margin-right:10px;
    display:flex;
    align-items:center;
`;

export const BtnLoaderLayout = styled.div`
    margin-left:5px;
`;

export const MailBtn = styled(AddNewBtn)`
    border:none;
    background:#fff;
    color:#666;
    border:1px solid #666;

    :hover{
        background:#fff;
        color:#38b2fe;
        border:1px solid #38b2fe;
    }
`;

export const MailBtnScenario = styled(AddNewBtn)`
    border:none;
    background:#fff;
    color:#666;
    border:1px solid #666;
    padding:5px 15px;

    :hover{
        background:#fff;
        color:#38b2fe;
        border:1px solid #38b2fe;
    }
`;


export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const BootstrapModal = styled(Modal)`

    .close{
        outline:0;
    }
`;

export const StatusSpan = styled.span`
    color:#fff;
    background:${props => props.color};
    padding: 3px 15px;
    border-radius:3px;
    font-size:14px;
    display:inline-block;
    margin-top:5px;
`;

export const ScenarioFilterLayout = styled.div`
    padding:0px;
    margin-top:15px;
`;

export const PassFailLayout = styled(FlexLayout)`

`;

export const FilterHeading = styled.h6`
    margin-bottom:10px;
`;

export const PlatformsLayout = styled.div`
    margin-bottom:10px;
`;

export const SceanrioFilterLayout = styled.div`

`;

export const CardHeadingLayoutCustom = styled(CardHeadingLayout)`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px 20px;
    background:#fff;
    z-index:2;
`;

export const CardHeadingCustom = styled(CardHeading)`
    font-weight:500;
`;

//need to change it in faq.style.js also
export const CrossLayout = styled.div`
    width:25px;
    height:25px;
    position:relative;

    .lineWrapper{
    }

    .firstLine{
        width:18px;
        height:2.5px;
        background:red;
        transform: rotate(45deg);
        position:absolute;
        top: 12px;
        left: 2px;
    }
    .secondLine{
        width:18px;
        height:2.5px;
        background:red;
        transform: rotate(135deg);
        position:absolute;
        top: 12px;
        left: 2px;
    }
`;