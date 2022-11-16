import React from 'react';
import {DropdownWrapper,Placeholder,DownArrow,DropdownScrollable,
    DropdownText,SearchInputLayout,SearchInputField,
    SearchIcon} from './dropdownsearchca.style';
import {isEmptyVariable,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import {Dropdown} from 'react-bootstrap';

//API based search and pagination is not implemented
class DropDownSearchCA extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchCustomActionKey:"",
            searchArray:[]
        };
    };

    handleChange = (e) => {
        const { name, value } = e.target;

        let items = this.props.customActionList.filter(item => item.actionName.includes(value));
        this.setState({ 
            [name]: value,
            searchArray:items
        });
    }

    onClickListItem = (item,e) => {
        e.stopPropagation();
        this.props.onDropDownItemClick(item,this.props.dropDownId);
    }

    render() {
        let dropdownArray = [];
        const {searchCustomActionKey,searchArray} = this.state;

        if(isEmptyVariable(searchCustomActionKey) && isEmptyArray(searchArray)){
            dropdownArray = this.props.customActionList;
        }else{
            dropdownArray = searchArray;
        }

        return (
            <DropdownWrapper>
                <Dropdown>

                    <Dropdown.Toggle>
                        <Placeholder>{this.props.placeholder}</Placeholder>
                        <DownArrow />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <SearchInputLayout>
                            <SearchInputField 
                                placeholder="Search"
                                autoFocus
                                onChange = {this.handleChange}
                                name="searchCustomActionKey"
                                value={this.state.searchCustomActionKey}
                            />
                            <SearchIcon />
                        </SearchInputLayout>
                        <DropdownScrollable>
                        {
                            dropdownArray && dropdownArray.map((item)=>{
                                return <Dropdown.Item onClick={this.onClickListItem.bind(this,item)}>
                                    <DropdownText>{item.actionName}</DropdownText>
                                </Dropdown.Item>
                            })
                        }
                        </DropdownScrollable>
                    </Dropdown.Menu>
                </Dropdown>
            </DropdownWrapper>
        );
    }
}

export default DropDownSearchCA;