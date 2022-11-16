import React from 'react';
import {DropdownWrapper,DropdownLayout,ProfileImg,ProfileName,DownArrow,
    CustomUl,CustomLi,DropdownText,DropdownLink} from './accountdropdown.style';
import {isEmptyVariable} from '../../commonComponents/commonFunctions';
import * as Constants from '../constants';

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
                <DropdownLayout onClick={this.showDropdownMenu}>
                    <ProfileImg src = {isEmptyVariable(this.props.profilePic)?'/assets/default-propic.png':Constants.ImageBaseUrl+this.props.profilePic}/>
                    {/* <ProfileName>{this.props.profileName}</ProfileName>
                    <DownArrow /> */}
                </DropdownLayout>
                { 
                    this.state.displayMenu ? (
                        <CustomUl>
                            {
                                this.props.accountArr.map((item)=>{
                                    return <CustomLi>
                                        <DropdownLink 
                                        href={item.href} 
                                        onClick={this.onClickListDropdown.bind(this,item.label)}
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
            </DropdownWrapper>
        );
    }
}

export default DropdownRegular;