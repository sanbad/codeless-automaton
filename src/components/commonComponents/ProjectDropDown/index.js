import React from 'react';
import { isEmptyVariable } from '../commonFunctions';
import {DropdownWrapper,DropDownTitleLayout,DropdownLayout,Title,DownArrow,
    CustomUl,CustomLi,DropdownText,DropdownLink} from './projectdropdown.style';

class DropdownRegular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayMenu: false
        };
   };

    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu = () => {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    onClickListDropdown = (label, e) => {
        e.stopPropagation();
        this.props.onClickDropDownItem(label);
    }

    render() {
        return (
            <DropdownWrapper>
                <DropDownTitleLayout>
                <DropdownLayout>
                    <Title>{this.props.title}</Title>
                    <DownArrow onClick={this.showDropdownMenu}/>
                </DropdownLayout>
                { 
                    this.state.displayMenu ? (
                        <CustomUl>
                            {
                                this.props.dropdownArr.map((item)=>{
                                    return <CustomLi>
                                        <DropdownLink 
                                        href={item.href} 
                                        onClick={
                                            isEmptyVariable(item.href)?this.onClickListDropdown.bind(this,item.label):""
                                        }
                                        >
                                            {item.icon}
                                            <DropdownText>{item.label} </DropdownText>
                                        </DropdownLink>
                                    </CustomLi>
                                })
                            }
                        </CustomUl>
                    ):
                    (
                        null
                    )
                }
                </DropDownTitleLayout>
            </DropdownWrapper>
        );
    }
}

export default DropdownRegular;