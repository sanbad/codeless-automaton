import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,CardHeadingLayout,CardHeading,
    Card,FlexLayout,CountSpan,AnchorLink,AddNewBtn,
    CancelBtn} from '../../commonComponents/Global/common.style';
import {Modal} from 'react-bootstrap';

export const NotificationSection = styled.div`
    display:flex;

`;
export const MainContainer = styled.div`
    background:${process.env.REACT_APP_CONTENT_BG_COLOR};
    flex:1 1 auto;
    margin-left:250px;
    height:100%;
    min-height:100vh;
`;

export const TableCardLayout = styled.div`
    position:relative;
    margin-bottom:20px;
`;

export const DropdownListWrapper = styled(Card)`
    padding:0;
    max-width: 500px;
`;

export const HeadingLayout = styled(CardHeadingLayout)``;
export const Heading = styled(CardHeading)``;

export const CustomUl = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
`;

export const CustomLi = styled.li`
    margin:0;
`;

export const DropdownLink  = styled(AnchorLink)`
    padding:10px 15px;
    display:flex;
    align-items:flex-start;
    border-bottom:1px solid #eee;

    :hover{
        background:${process.env.REACT_APP_CONTENT_BG_COLOR};
    }

    svg{
        height:18px;
        width:18px;
        color:#666;
        flex-shrink:0;
    }
`;

export const DropdownImg = styled.img`
    height:50px;
    width:50px;
    object-fit:cover;
    border-radius:3px;
    flex-shrink:0;
`;

export const DropdownTextLayout = styled.div`
`;


export const DropdownText = styled.span`
    margin:0;
    // margin-left:10px;
    color:#282828;
    line-height:1.25;
    display:flex;
    font-weight:400;
    font-size:13px;
    margin-bottom:5px;
`;


export const DropdownDate = styled.span`
    margin:0;
    // margin-left:10px;
    color:#666;
    font-size:12px;
    display: block;
    line-height: 1;
`;

export const FooterWrapper = styled(AnchorLink)`
    padding:0;
    display:block;
    border-top:1px solid #ddd;

    :hover{
        text-decoration:underline;
    }
`;

export const FooterText = styled.p`
    margin:0;
    padding:5px 15px;
    color:#38b2fe;
    font-weight:600;
    text-align:center;
`;


export const BootstrapModal = styled(Modal)`
   
`;

export const BootstrapModalImg = styled.img`
    height:200px;
    margin-bottom:20px;
`;

export const BootstrapModalHeading = styled.h4`

`;

export const BootstrapModalPara = styled.p`

`;


export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;
