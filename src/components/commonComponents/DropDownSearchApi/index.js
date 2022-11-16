import React from 'react';
import {DropdownWrapper,Placeholder,DownArrow,
    DropdownText,SearchInputLayout,SearchInputField,
    SearchIcon,LoadMoreText,DropdownScrollable,RefreshIcon} from './dropdownsearchapi.style';
import {isEmptyVariable,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import {Dropdown} from 'react-bootstrap';

//API based search and pagination is not implemented
class DropDownSearchApi extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchElementNameKey:"",
            searchArray:[]
        };

    };

    handleChange = (e) => {
        const { name, value } = e.target;

        let items = this.props.elementsList.filter(item => item.elementName.toLowerCase().includes(value.toLowerCase()));
        this.setState({ 
            [name]: value,
            searchArray:items
        });
    }

    onClickListItem = (item,e) => {
        e.stopPropagation();
        this.props.onDropDownItemClick(item,this.props.dropDownId);
    }

    handleAddNew = (e) => {
        e.stopPropagation();
        this.props.onClickAddNewElement();
    }
    toggleMethod = (isOpen) =>{
    }
    handleRefreshItems = () => {
        this.props.handleRefreshItems();
    }

    render() {
        let dropdownArray = [];
        const {searchElementNameKey,searchArray} = this.state;

        if(isEmptyVariable(searchElementNameKey) && isEmptyArray(searchArray)){
            dropdownArray = this.props.elementsList;
        }else{
            dropdownArray = searchArray;
        }

        return (
            <DropdownWrapper>
                <Dropdown  onToggle={this.toggleMethod}>
                    <Dropdown.Toggle>
                        <Placeholder
                        fontSize={this.props.fontStyle==="small"?"13px":"14px"}
                        >{this.props.placeholder}</Placeholder>
                        <DownArrow />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <SearchInputLayout>
                            <SearchInputField 
                                placeholder="Search"
                                onClick = {this.searchClick}
                                autoFocus
                                onChange = {this.handleChange}
                                name="searchElementNameKey"
                                value={this.state.searchElementNameKey}
                            />
                            <SearchIcon />
                            <RefreshIcon onClick={this.props.handleRefreshItems}/>
                        </SearchInputLayout>
                        <DropdownScrollable>
                        {
                            dropdownArray && dropdownArray.map((item)=>{
                                return <Dropdown.Item onClick={this.onClickListItem.bind(this,item)}>
                                    <DropdownText
                                    fontSize={this.props.fontStyle==="small"?"12px":"13px"}>
                                        {item.elementName}
                                    </DropdownText>
                                </Dropdown.Item>
                            })
                        }
                        </DropdownScrollable>
                        <LoadMoreText onClick={this.handleAddNew}>
                            Add New Element
                        </LoadMoreText>

                    </Dropdown.Menu>
                </Dropdown>
            </DropdownWrapper>
        );
    }
}

export default DropDownSearchApi;