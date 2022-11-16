import styled from 'styled-components';
import { Card, AddNewBtn,
    CancelBtn,FlexLayout} from '../../commonComponents/Global/common.style';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Modal} from 'react-bootstrap';
import {PlayCircle} from '@styled-icons/fa-regular/PlayCircle';

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
    margin-top:${props => props.marginTop?"20px":"0px"}
`;

export const ActionListLayout = styled.div`
    padding:0px;
    margin-top:${props => props.marginTop?"20px":"0px"}
`;

export const DetailsLayout = styled.div`
    padding:20px;
`;

export const TopLayout = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
`;

export const ActionInfoLayout = styled.div`

`;

export const TableDetails = styled.table`

`;

export const TableRow = styled.tr`

`;

export const TableData = styled.td`
    padding:2px;
    font-size:13px;
`;


export const ActionButtonsLayout = styled.div`
    display:flex;
`;

export const ActionAnchor = styled.a`
    text-decoration:none;
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

    :hover{
        border:1px solid ${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const ActionButtonText = styled.p`
    line-height:1;
    margin:0;
    margin-left:5px;
    
    ${ActionButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const RunIcon = styled(PlayCircle)`
    height:20px;
    width:20px;
    color:#666;
    ${ActionButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;
export const EditIcon = styled(EditAlt)`
    height:20px;
    width:20px;
    color:#666;
    ${ActionButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const DeleteIcon = styled(Delete)`
    height:20px;
    width:20px;
    color:#666;
    ${ActionButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const TableLayout = styled.div`

`;

export const FaqRow = styled.div`
    margin-bottom:10px;
`;

export const BootstrapModal = styled(Modal)`
`;

export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const TypeSpan = styled.span`
    color:#282828;
    background:${props => props.spanBg};
    // background:#d5ceff;
    font-size:10px;
    padding:2px 5px;
    line-height:1;
    border-radius:3px;
    margin-left:10px;
`;