import styled from 'styled-components';
import {device} from '../Global/device';
import {FlexLayout,AnchorLink,AddNewBtn,CancelBtn} from '../Global/common.style';
import {Modal} from 'react-bootstrap';

const menuBgColor = "none";
const menuBgHoverColor = process.env.REACT_APP_PRIMARY_COLOR+"20";
const menuBgActiveColor = process.env.REACT_APP_PRIMARY_COLOR+"20";
const menuBgHoverActiveColor = process.env.REACT_APP_PRIMARY_COLOR+"20";

const menuTextColor = "#666";
const menuTextHoverColor = process.env.REACT_APP_PRIMARY_COLOR;
const menuTextActiveColor = process.env.REACT_APP_PRIMARY_COLOR;
const menuTextHoverActiveColor = process.env.REACT_APP_PRIMARY_COLOR;

const topBarBorderBottom = "#ddd";

export const TopbarInnerWrapper = styled(FlexLayout)`
    height:66px;
    justify-content:space-between;
    border-bottom:1px solid ${topBarBorderBottom};  
`;

export const TopbarWrapper = styled.div`
    padding:0px 20px;
`;

export const MenuLayout = styled(FlexLayout)`
    padding:7px 0px 6px;
`;

export const MenuInnerLayout = styled.div`

`;

export const PageHeading = styled.h6`
    line-height:1;
    margin:0;
    font-weight:500;
    margin-bottom:6px;
`;

export const TopMenuItem = styled(AnchorLink)`
    display:inline-block;
    background:${props => props.isActive?menuBgActiveColor:menuBgColor};
    color:${props => props.isActive?menuTextActiveColor:menuTextColor};
    margin-right:5px;
    border-radius:3px;
    padding:4px 10px;
    font-size:13px;

    :hover{
        background:${props => props.isActive?menuBgHoverActiveColor:menuBgHoverColor};
        color:${props => props.isActive?menuTextHoverActiveColor:menuTextHoverColor};
    }
`;

export const DropdownLayout = styled(FlexLayout)`
    .pricing-anchor{
        background: orange;
        color: white;
        padding: 8px 30px;
        line-height: 1;
        border-radius: 5px;
        margin-right:6px;
        text-decoration:none;
    }

`;

export const BootstrapModal = styled(Modal)`
`;

export const SaveBtn = styled(AddNewBtn)`
    border:none;
`;

export const CancelBtnDialog = styled(CancelBtn)`
    border:none;
`;

export const SuccessSpan = styled.span`
    font-size:12px;
    color:green;
    margin:0;
`;

export const UploadPhotoLabel = styled.label`
    background: ${process.env.REACT_APP_PRIMARY_COLOR};
    color: ${process.env.REACT_APP_PRIMARY_TEXT_COLOR};
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 10px;
    text-align:center;

    :hover{
        background:${process.env.REACT_APP_PRIMARY_COLOR};
    }
`;
export const ImageInput = styled.input`
    
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	z-index: -1;
	position: absolute;
	overflow: hidden;
`;