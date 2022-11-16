import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {FieldSetRound, Card, InputFieldRound,AddNewBtn,CustomContainer,
    CancelBtn,FlexLayout} from '../../commonComponents/Global/common.style';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Row, Col} from 'react-bootstrap';

export const ProjectDetailsSection = styled.div`
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

export const DetailsLayout = styled.div`
    padding:20px;
`;

export const TopLayout = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
`;

export const ProjectInfoLayout = styled.div`

`;

export const TableDetails = styled.table`

`;

export const TableRow = styled.tr`

`;

export const TableData = styled.td`
    padding:2px;
    font-size:14px;
`;


export const ProjectButtonsLayout = styled.div`
    display:flex;
`;

export const ProjectAnchor = styled.a`
    :hover{
        text-decoration:none;
    }
`;

export const ProjectButton = styled(FlexLayout)`
    border:1px solid #666;
    border-radius:5px;
    padding:5px 15px;
    margin-left:10px;
    cursor:pointer;
    :hover{
        border:1px solid ${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const ProjectButtonText = styled.p`
    line-height:1;
    margin:0;
    margin-left:5px;
    
    ${ProjectButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const EditIcon = styled(EditAlt)`
    height:25px;
    width:25px;
    color:#666;
    ${ProjectButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const DeleteIcon = styled(Delete)`
    height:25px;
    width:25px;
    color:#666;

    ${ProjectButton}:hover &{
        color:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
    }
`;

export const TableLayout = styled.div`

`;


export const DashboardCard = styled(Card)`
    padding:8px;
    display:flex;
    align-items:center;
    flex-direction:column;
    box-shadow:none;
    border:1px solid #ddd;

    svg{
        width:50px;
        height:50px;
        color:#777;
        flex-shrink:0;
    }
`;

export const HeaderTitle = styled.h2`
    line-height:1;
    margin-bottom:5px;
    text-align:center;
`;

export const HeaderSubTitle = styled.h6`
    margin:0;
    line-height:1;
    font-size:16px;
`;

export const TextLayout = styled.div`
    margin-top:5px;
`;

export const CustomRow = styled(Row)`
    margin-right:-10px;
    margin-left:-10px;
    margin-top:10px;
`;

export const CustomCol = styled(Col)`
    padding-right:10px;
    padding-left:10px;
`;
