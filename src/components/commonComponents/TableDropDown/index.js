import React from 'react';
import {DropdownWrapper,DownArrow,
    DropdownText,DropdownLink,DropdownNew} from './tabledropdown.style';
import {isEmptyVariable} from '../../commonComponents/commonFunctions';
import {Dropdown} from 'react-bootstrap';

class DropdownRegular extends React.Component {
    constructor(props){
        super(props);

   };

    onClickDropDownItem = (label,e) => {
        // e.stopPropagation();
        this.props.onClickDropDownItem(label,this.props.item);
    }

    render() {
        return (
            <DropdownWrapper>
                <Dropdown>
                    <Dropdown.Toggle>
                        <DownArrow />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            !isEmptyVariable(this.props.actionArr) && 
                            this.props.actionArr.map((item)=>{
                                return <Dropdown.Item href="javascript:void(0);">
                                    <DropdownLink 
                                    onClick={this.onClickDropDownItem.bind(this,item.label)}>
                                        {item.icon}
                                        <DropdownText>{item.label}</DropdownText>
                                    </DropdownLink>
                                </Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </DropdownWrapper>
        );
    }
}

export default DropdownRegular;