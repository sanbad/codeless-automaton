import styled from 'styled-components';
import {Card,FlexLayout,CancelBtn} from '../../commonComponents/Global/common.style';
import {PlusCircle} from '@styled-icons/boxicons-regular/PlusCircle';
import {MinusCircle} from '@styled-icons/boxicons-regular/MinusCircle';
import {device} from '../../commonComponents/Global/device';
import {MinusCircle as MinusCircleSolid} from '@styled-icons/boxicons-solid/MinusCircle';
import {CheckCircle} from '@styled-icons/boxicons-solid/CheckCircle';
import {CircleWithCross} from '@styled-icons/entypo/CircleWithCross';
import {Modal} from 'react-bootstrap';

import {Check} from '@styled-icons/boxicons-regular/Check';
import {Minus} from '@styled-icons/boxicons-regular/Minus';

export const AccordianRow = styled(Card)`
    margin-bottom:10px;
    padding:0px;
    box-shadow:none;
    border:1px solid #ccc;

    :last-child{
        margin-bottom:0px;
    }

    .accordion-item{
        border-radius:5px !important;
    }

    .accordion-header{
        position:sticky;
        top:46px;
        z-index:1;
    }
    .accordion-button{
        padding:0px 20px 0px 0px;
        background:#fff;
        border-top-left-radius: 5px !important;
        border-top-right-radius: 5px !important;
        box-shadow:none !important;
    }    
    .accordion-body{
        padding:0px !important;
    }
    .stepTopSticky{
        position:sticky;
        top:80px;
    }
`;

export const AccordianTitleCol = styled.div`
    padding:5px 10px;
    display:flex;
    align-items:center;
    background:#fff;
    transition: all .5s;
    border-radius:5px;
`;


export const PassedIcon = styled(CheckCircle)`
    height:${props => props.size?props.size:"20px"};
    width:${props => props.size?props.size:"20px"};
    color:green;
    flex-shrink:0;
`;

export const SkippedIcon = styled(MinusCircleSolid)`
    height:${props => props.size?props.size:"20px"};
    width:${props => props.size?props.size:"20px"};
    color:#999;
    flex-shrink:0;
`;

export const FailedIcon = styled(CircleWithCross)`
    height:${props => props.size?props.size:"20px"};
    width:${props => props.size?props.size:"20px"};
    color:red;
    flex-shrink:0;
`;

export const TitleTextLayout = styled(FlexLayout)`
    padding: 0px 10px 0px 10px;
    flex-grow: 1;
`;


export const TypeSpan = styled.span`
    color:#282828;
    background:${props => props.spanBg};
    // background:#d5ceff;
    font-size:11px;
    padding:3px 5px;
    line-height:1;
    border-radius:3px;
    margin-left:10px;
`;

export const AccordianTitle = styled.p`
    // overflow:hidden;
    margin-bottom:0px;
    cursor:pointer;
    color:#282828;
    font-size:13px;

    @media ${device.tablet} {
    }
`;

export const AccordianContentCol = styled.div`
    padding: 0px;
    border-top:1px solid #ccc;

    table thead tr th {
        font-size:13px;
        font-weight:600;
        padding: 6px 16px;
    }

    table tbody tr td {
        font-size:13px;
        padding: 6px 16px;
    }
`;

export const StepLayout = styled.div`

`;

export const StepText = styled.p`
`;

export const TotalSuccessActions = styled(Check)`
    width:${props => props.size?props.size:"25px"};
    height:${props => props.size?props.size:"25px"};
    color:green;
`;

export const TotalSkippedActions = styled(Minus)`
    width:${props => props.size?props.size:"25px"};
    height:${props => props.size?props.size:"25px"};
    color:#666;
`;


//need to change it in reportdetails.style.js also
export const CrossLayout = styled.div`
    width:${props => props.size?props.size:"25px"};
    height:${props => props.size?props.size:"25px"};
    position:relative;

    .lineWrapper{
    }

    .firstLine{
        width:${props => props.barSize?props.barSize:"18px"};
        height:2.5px;
        background:red;
        transform: rotate(45deg);
        position:absolute;
        top: ${props => props.top?props.top:"12px"};
        left: 2px;
    }
    .secondLine{
        width:${props => props.barSize?props.barSize:"18px"};
        height:2.5px;
        background:red;
        transform: rotate(135deg);
        position:absolute;
        top: ${props => props.top?props.top:"12px"};
        left: 2px;
    }
`;
export const BootstrapModal = styled(Modal)`
    .modal-dialog{
        max-width: 750px;
    }
    .modal-body{
        overflow:auto;
        max-height:410px;     
    }
`; 

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;
export const TableDetails = styled.table`
`;

export const TableRow = styled.tr`
`;

export const TableData = styled.td`
    padding:2px;
    font-size:14px;
`;
export const ErrImage = styled.img`
    width:100%;
    height:auto;
    object-fit:cover;
    border-radius:3px;
    margin-top:20px;
    border: 2px solid #016eb222;
`;