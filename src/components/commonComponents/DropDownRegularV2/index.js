import React from 'react';
import {DropdownWrapper,Placeholder,DownArrow,
    DropdownText} from './dropdownregular.style';
import {Dropdown} from 'react-bootstrap';

class DropDownRegular extends React.Component {
    constructor(props){
        super(props);
    };

    onClickListDropdown = (item,e) => {
        // e.stopPropagation();
        this.props.onDropDownItemClick(item,this.props.dropDownId);
    }

    render() {
        return (
            <DropdownWrapper>
                <Dropdown>
                    <Dropdown.Toggle>
                        <Placeholder>{this.props.placeholder}</Placeholder>
                        <DownArrow />
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu>
                        {
                            this.props.itemsArr && this.props.itemsArr.map((item)=>{
                                return <Dropdown.Item onClick={this.onClickListDropdown.bind(this,item)}>
                                    <DropdownText>{item[this.props.name]}</DropdownText>
                                </Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </DropdownWrapper>
        );
    }
}

export default DropDownRegular;