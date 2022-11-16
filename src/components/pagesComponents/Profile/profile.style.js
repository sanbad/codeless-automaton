import styled from 'styled-components';
import {device} from '../../commonComponents/Global/device';
import {Commonbtn,
    Card,InputField} from '../../commonComponents/Global/common.style';

export const ProfileSection = styled.div`
    display:flex;
`;

export const MainContainer = styled.div`
    background:${process.env.REACT_APP_CONTENT_BG_COLOR};
    flex:1 1 auto;
    margin-left:250px;
    height:100%;
    min-height:100vh;
`;

export const DetailsCard = styled(Card)`
    padding:0px;
    margin-top:${props => props.marginTop?"20px":"0px"}
`;

export const TableCardLayout = styled.div`
    margin-top:20px;
`;

export const TableCard = styled(Card)`
    padding:0;
`;

export const EmptyCard = styled(Card)`
    padding:30px;
`;

export const ProfileImage = styled.img`
    width:100%;
    height:150px;
    object-fit:cover;
    border-radius:3px;
`;

export const ImageSpan = styled.span`

`;
export const ChangePhotoLayout = styled.div`

`;

export const ImageInput = styled.input`
    // display: block;
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`;

export const ChangePhotoLabel = styled.label`
    background: #38b2fe;
    color: #fff;
    cursor: pointer;
    padding: 5px 25px;
    border-radius: 5px;
    margin-top: 10px;
    text-align:center;

    :hover{
        background:#016eb2;
    }
`;

export const TextLayout = styled.div`
    margin-top:10px;
`;

export const HeaderTitle = styled.h6`
    margin:0;
    line-height:1;
`;

export const InputBox = styled(InputField)`
    border-radius:3px;
    border:1px solid ${process.env.REACT_APP_INPUT_BORDER_COLOR};
`;


export const SuccessSpan = styled.span`
    font-size:12px;
    color:green;
    margin:0;
`;

export const SubmitButton = styled(Commonbtn)`
    box-sizing:border-box;
    width:100%;
    border-radius:3px;
`;
