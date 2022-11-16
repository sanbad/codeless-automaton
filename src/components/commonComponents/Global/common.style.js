import styled from 'styled-components';
import {device} from './device';
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ArrowNarrowUp} from '@styled-icons/heroicons-outline/ArrowNarrowUp';
import {ArrowNarrowDown} from '@styled-icons/heroicons-outline/ArrowNarrowDown';

const type2ButtonBgColor = "#333333";
const type2ButtonBgHoverColor = "#666666";
const type2ButtonTextColor = "#fff";

const cancelButtonBgColor = "#aaaaaa";
const cancelButtonHoverBgColor = "#cccccc";

export const Commonbtn = styled.a`
    background: ${process.env.REACT_APP_PRIMARY_COLOR};
    color: ${process.env.REACT_APP_PRIMARY_TEXT_COLOR};
    padding: 10px 40px;
    text-decoration:none;
    display:inline-block;
    cursor:pointer;
    border:none;
    outline:0;
    border-radius:5px;

    :focus{
        outline:0;
    }

    :hover{
        background:${process.env.REACT_APP_PRIMARY_COLOR_HOVER};
        color: ${process.env.REACT_APP_PRIMARY_TEXT_COLOR_HOVER};
        text-decoration:none;
    }
`;

export const CommonbtnType2 = styled.a`
    background: ${type2ButtonBgColor};
    color: ${type2ButtonTextColor};
    padding: 10px 40px;
    text-decoration:none;
    display:inline-block;
    cursor:pointer;

    :hover{
        background:${type2ButtonBgHoverColor};
        text-decoration:none;
        color: #fff;
    }
`;

export const AddNewBtn = styled(Commonbtn)`
    padding:8px 30px;
`;

export const CancelBtn = styled(AddNewBtn)`
    background:${cancelButtonBgColor};

    :hover{
        background:${cancelButtonHoverBgColor};
    }
`;

export const FieldSet = styled.fieldset`
    margin-bottom:15px;
    text-align:left;
    position:relative;
    line-height:1;
`;

export const InputField = styled.input`
    display: block;
    padding: 12px 10px;
    font-size: 13px;
    border: none;
    color:${process.env.REACT_APP_INPUT_TEXT_COLOR}
    background-color: #fff;
    width:100%;
    outline:0;
    box-sizing:border-box;
    border-radius:5px;
`;

export const FieldSetRound = styled.fieldset`
    text-align:left;
    position:relative;
    max-width:350px;
`;

export const InputFieldRound = styled(InputField)`
    max-width:350px;
    min-width:300px;
    border:1px solid ${process.env.REACT_APP_INPUT_BORDER_COLOR};
`;

export const InputLabel = styled.label`
    color:${process.env.REACT_APP_INPUT_LABEL_COLOR};
    font-size:12px;
    margin-bottom:5px;
`;

export const InputFieldBorder= styled.input`
    display: block;
    padding: 7px 10px;
    font-size: 13px;
    border: 1px solid  ${process.env.REACT_APP_INPUT_BORDER_COLOR};
    color:${process.env.REACT_APP_INPUT_TEXT_COLOR}
    background-color: #fff;
    width:100%;
    outline:0;
    box-sizing:border-box;
    border-radius:5px;
    min-width:300px;
    min-height:38px;
`;

export const TextareaFieldBorder= styled.textarea`
    display: block;
    padding: 12px 10px;
    font-size: 13px;
    border: 1px solid ${props => props.borderColor?props.borderColor:process.env.REACT_APP_INPUT_BORDER_COLOR};
    background-color: #fff;
    width:100%;
    outline:0;
    box-sizing:border-box;
    border-radius:5px;
    min-width:300px;
    min-height:${props => props.minHeight?props.minHeight:"170px"}
`;

export const ErrorSpan = styled.span`
    font-size:12px;
    color:red;
    margin:0;
`;

export const FlexLayout = styled.div`
    display:flex;
    align-items:center;
`;

export const FlexLayoutStart = styled.div`
    display:flex;
    align-items:flex-start;
`;

export const FlexLayoutCenterCenter = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:center;
`;

export const PageCountSpan = styled.span`
    font-size:13px;
`;

export const FlexLayoutCenterJustified = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`;

export const Card = styled.div`
    background:${process.env.REACT_APP_CARD_BG_COLOR};
    // box-shadow:0px 0px 12px 1px #ddd;
    border:1px solid ${process.env.REACT_APP_CARD_BORDER_COLOR};
    padding:30px;
    margin:auto;
    border-radius:5px;
`;

export const CardHeading = styled.h6`
    line-height:1;
    margin:0;
`;

export const CountSpan = styled.div`
    font-size:12px;
    background:#555;
    padding:2px 5px;
    border-radius:5px;
    color:#fff;
    margin:0;
`;

export const AnchorLink = styled.a`
    font-size:13px;
    text-decoration:none;
    padding:8px 15px;
    font-weight:600;
    
    :hover{
        text-decoration:none;
    }
`;

export const CustomContainer = styled.div`
    width:100%;
    padding:20px 20px;
    position:relative;
`;

export const CustomRow = styled(Row)`
    margin-right:-10px;
    margin-left:-10px;
`;

export const CustomCol = styled(Col)`
    padding-right:10px;
    padding-left:10px;
`;

export const CustomRow5 = styled(Row)`
    margin-right:-5px;
    margin-left:-5px;
`;

export const CustomCol5 = styled(Col)`
    padding-right:5px;
    padding-left:5px;
`;

export const CardHeadingLayout = styled.div`
    padding:15px 20px;
    border-bottom:${props => props.showBottomBorder?"1px solid "+process.env.REACT_APP_CARD_BORDER_COLOR:"1px solid "+process.env.REACT_APP_CARD_HEADING_BORDER_COLOR};
    display:flex;
    align-items:center;
    justify-content:space-between;

    span{
        font-size: 13px;
        display: block;
        line-height: 1;
    }
`;

export const Table = styled.table`
    width:100%;
    background-color: ${process.env.REACT_APP_TABLE_BG_COLOR};
    margin-bottom:20px;

    thead{

    }

    tr{
        ${props => props.lastchildcheck && `
            :last-child{
                td{
                    box-shadow:none;

                    :last-child{
                        border-bottom-right-radius: 5px;
                        border-bottom-left-radius: 5px;
                    }
                    :first-child{
                        border-bottom-right-radius: 5px;
                        border-bottom-left-radius: 5px;
                    }
                }
            }
        `}
    }

    th{
        font-weight:500;
        background:${process.env.REACT_APP_TABLE_HEADER_BG_COLOR};
        text-transform:uppercase;
        font-size:13px;
        color:${process.env.REACT_APP_TABLE_HEADER_TEXT_COLOR};
        padding:8px 16px;
        box-shadow:inset 0 -1px ${process.env.REACT_APP_TABLE_HEADER_BORDER_COLOR};
        cursor:pointer;
        
        .sort-header{
            display: flex;
            align-items: center;
        }
        
        .sort-header span{
            margin-left:5px;
            line-height:1;
            display:block;
        }
        
        .hide-sort-arrow{
            opacity:0;
        }
        
        .c-pointer{
            cursor:pointer;
        }
    }

    tbody{

    }
    
    td{
        font-weight:400;
        font-size:13px;
        background:${process.env.REACT_APP_TABLE_DATA_BG_COLOR};
        color:${process.env.REACT_APP_TABLE_DATA_TEXT_COLOR};
        padding:8px 16px;
        box-shadow:inset 0 -1px ${process.env.REACT_APP_TABLE_DATA_BORDER_COLOR};
    
        .valueSpan{
            display:block;
            font-size:12px;
            color:#888;
        }
    
        button{
            margin:0;
            font-size: 12px;
            color: red;
            background: none;
            border: none;
            padding: 0;
            font-weight:600;
    
            :hover{
                text-decoration:underline;
            }
        }
    }

    .customaction-td{
        font-weight: bold;
        // font-style: italic;
        background: #fafafa;
    }

    .topSticky{
        position:sticky;
        top:0;
    }
    .topStickyCustomAction{
        position:sticky;
        top:34px;
    }
    .show-tr{
        display:block;
    }
    .hide-tr{
        display:none;
    }
`;

export const TableAnchor = styled.a`
    font-size:13px;
    text-decoration:none;
    color:#282828;
`;

export const ArrowUpIcon = styled(ArrowNarrowUp)`
    width: 16px;
    height: 16px;
`;
export const ArrowDownIcon = styled(ArrowNarrowDown)`
    width: 16px;
    height: 16px;
`;