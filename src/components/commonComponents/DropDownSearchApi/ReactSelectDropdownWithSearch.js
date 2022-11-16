import React, { Component } from "react";
import {
	isEmptyVariable,
} from "../commonFunctions";
import Select from "react-select";

const epicCustomStyles = {
	placeholder: (provided, state) => ({
		...provided,
		fontSize: 13,
	}),
	option: (provided, state) => ({
		...provided,
		fontSize: 12,
	}),
	singleValue: (provided, state) => ({
		...provided,
		fontSize: 13,
        overflow:"unset"
	}),
	input: (provided, state) => ({
		...provided,
		fontSize: 13,
	}),
	control: (provided, state) => ({
		...provided,
		// border: "1px solid transparent",
		minHeight: 36,
        // boxShadow:state.isFocused?"#017ecb":"none"

		// ":hover": {
		// 	border: "1px solid red",
		// },
	}),
    menuList: (provided, state) => ({
		...provided,
		maxHeight:220
	}),
};

class ReactSelectDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: false,
			selectedValues: [],

		};
	}

	componentDidMount() {	
		let selectedValues = [];
		if(!isEmptyVariable(this.props.selectedDDObj)){
			selectedValues = this.props.selectedDDObj;
		}
		this.setState({
			componentDidMountFlag:false,
			showLoader:false,
			selectedValues:selectedValues,
		})
	}

	// handleDialogClose = () => {
	// 	this.props.handleReactSelectClose(this.state.selectedValues);
	// };

	handleOnChangeSelectedOption = (newValueObj, actionMeta) => {
		// if (actionMeta.action === "select-option") {
		// 	
		// } else if (actionMeta.action === "create-option") {
		// 	
		// } else if (actionMeta.action === "remove-value") {
		// 	
		// }

		this.setState({
            selectedValues: newValueObj,
        },()=>{
            this.props.handleReactSelectClose(this.state.selectedValues,this.props.dropDownId);
        });
	};

    returnNullComponent = () => null;

    stopPropagation = (e) => {
        e.stopPropagation();
    }

	render() {
		return (
			<div style={{cursor:"pointer"}} onClick={this.stopPropagation}>
				<Select
					value={this.state.selectedValues}
					onChange={this.handleOnChangeSelectedOption}
					options={this.props.selectDropdownArr}
					placeholder={!isEmptyVariable(this.props.placeholder)?this.props.placeholder:"Please select"}
					getOptionLabel={(option) => option[this.props.label]}
					getOptionValue={(option) => option[this.props.value]}
					styles={epicCustomStyles}
                    // menuIsOpen={true}
                    components={{
                        // DropdownIndicator: this.returnNullComponent,
                        IndicatorSeparator: this.returnNullComponent,
                    }}
				/>
			</div>
		);
	}
}

export default ReactSelectDropdown;
