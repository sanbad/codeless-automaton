import React, { Component } from 'react';
import {BootstrapModal,BootstrapModalAddDialog,OptionsLayout,ButtonLayout,SaveBtnDialog,
    CancelBtnDialog,InfoSpan,
    ValueContainerLayout} from './searchdialog.style';
import {Modal} from 'react-bootstrap';
import {
	isEmptyVariable,
    getLocalStorageVariables
} from "../commonFunctions";
import Select, { components } from "react-select";
import {Search} from '@styled-icons/evaicons-solid/Search';
// import {Refresh} from '@styled-icons/evaicons-solid/Refresh';
import {FieldSet,InputLabel,InputFieldBorder,ErrorSpan} from '../Global/common.style';
import * as Constants from '../constants';

const userDetails  = getLocalStorageVariables();
const {Option,Control} = components;
const epicCustomStyles = {
	placeholder: (provided, state) => ({
		...provided,
		fontSize: 14,
	}),
	valueContainer: (provided, state) => ({
		...provided,
		padding:"8px 8px 8px 4px",
	}),
	option: (provided, state) => ({
		...provided,
		fontSize: 12,
	}),
	singleValue: (provided, state) => ({
		...provided,
		fontSize: 13,
	}),
	input: (provided, state) => ({
		...provided,
		fontSize: 14,
	}),
	control: (provided, state) => ({
		...provided,
		// border: "1px solid transparent",
		minHeight: 36,
        border: "none",
        borderBottom: "1px solid #ccc",
        borderRadius: 0,
        borderTopRightRadius: "4px",
        borderTopLeftRadius: "4px"
        // boxShadow:state.isFocused?"#017ecb":"none"

		// ":hover": {
		// 	border: "1px solid red",
		// },
	}),
    menuList: (provided, state) => ({
		...provided,
		maxHeight:300,
        paddingTop:0,
        paddingBottom:0,
	}),
    menu: (provided, state) => ({
		...provided,
		position:"relative",
        border: "none",
        boxShadow:"none",
        borderRadius: 0,
        margin:0,
	}),
};
const returnNullComponent = () => null;
const ElementNameValueOption = (props) => {
	return <Option {...props}>
        <OptionsLayout>
            <p>{props.data.elementName}</p>
            <p className="ele-value">{props.data.elementValue}</p>
        </OptionsLayout>
    </Option>;
};
const TestParamValueOption = (props) => {
	return <Option {...props}>
        <OptionsLayout>
            <p>{props.data.testParamName}</p>
            <p className="ele-value">{props.data.testParamValue}</p>
        </OptionsLayout>
    </Option>;
};

const CustomControl = (props) => {
    return <Control {...props}>
        <ValueContainerLayout>
            <Search />
            {props.children}
        </ValueContainerLayout>
    </Control>
}

class SearchElementTestParamDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
			showLoader: false,
			selectedValues: [],

            showAddDialog:false,
            varName:'',
            varValue:'', 
            errors:{},
		};
        this.selectRef = React.createRef();  
    }

    handleAddElementClose = () => this.setState({showAddDialog:false});
    
    handleShowAddDialog = () => this.setState({
        showAddDialog:true,
        varName:'',
        varValue:'', 
        errors:{},
    });

    //Handle Change of action name
    handleChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            [name]:value
        })
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props) && 
        this.props.showReactSelectSearchDialog){
            let selectedValues = [];
            if(!isEmptyVariable(this.props.selectedDDObj)){
                selectedValues = this.props.selectedDDObj;
            }
            this.setState({
                componentDidMountFlag:false,
                showLoader:false,
                selectedValues:selectedValues,
            },()=>{
                this.selectRef.current.focus();
            })
        }
    }

    handleOnChangeSelectedOption = (newValueObj, actionMeta) => {
		this.setState({
			selectedValues: newValueObj,
        },()=>{
            this.props.handleReactSelectSaveClose(this.state.selectedValues,this.props.dropDownId,this.props.dialogType,this.props.inputType);
        });
	};

    refreshList = () => {
        this.props.dialogType === "testParam"?this.props.getTestParamsList():this.props.getElementList();
    }

    addElement = (e) =>{
        e.preventDefault();

        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.varName))
        {
            error_flag = true;
            errors['varName'] = this.props.dialogType === "testParam"?"Please enter test parameter name":"Please enter element name";
        }
        if(isEmptyVariable(this.state.varValue))
        {
            error_flag = true;
            errors['varValue'] = this.props.dialogType === "testParam"?"Please enter test parameter value":"Please enter element value";
        }

        if (error_flag) {
            this.setState({
                errors: errors
            });

            setTimeout(function(){
                this.setState({errors:{}});
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }
        else
        {
            let url = Constants.AddElement;
            let postParams = {
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.props.projectId,
                elementName:this.state.varName,
                elementValue:this.state.varValue,
            }
            if(this.props.dialogType === "testParam"){
                url = Constants.AddTestParam;
                postParams = {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.props.projectId,
                    testParamName:this.state.varName,
                    testParamValue:this.state.varValue,
                }
            }
            fetch(url,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(postParams)
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showAddDialog:false
                    },()=> {
                        if(this.props.dialogType === "testParam"){
                            this.props.getTestParamsList();
                        }else{
                            this.props.getElementList();
                        }
                    })
                }else{
                    errors['addElementError'] = data.responseMessage;

                    this.setState({
                        errors: errors
                    });
        
                    setTimeout(function(){
                        this.setState({errors:{}});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }
            });
        }
    }

    render(){
        return(
            <div>
                <div>
                <BootstrapModal show={this.props.showReactSelectSearchDialog} onHide={this.props.handleReactSelectSearchDialogClose}>
                    {/* <Modal.Header closeButton>
                    <Modal.Title>{this.state.isEdit?"Edit":"Add"} Project</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                        <div>
                            <Select
                                value={this.state.selectedValues}
                                onChange={this.handleOnChangeSelectedOption}
                                options={this.props.selectDropdownArr}
                                placeholder={!isEmptyVariable(this.props.placeholder)?this.props.placeholder:"Please select"}
                                getOptionLabel={(option) => option[this.props.label]}
                                getOptionValue={(option) => option[this.props.value]}
                                styles={epicCustomStyles}
                                menuIsOpen={true}
                                tabSelectsValue={false}
                                ref={this.selectRef}
                                classNamePrefix="element-select"
                                components={{
                                    DropdownIndicator: returnNullComponent,
                                    IndicatorSeparator: returnNullComponent,
                                    Option: this.props.dialogType === "testParam"?TestParamValueOption:ElementNameValueOption,
                                    Control: CustomControl,
                                }}
                            />
                        </div>
                        <ButtonLayout>
                            <button style={{
                                borderRight:"1px solid #ddd"
                            }} 
                            onClick={this.refreshList}
                            >Refresh</button>
                            <button onClick={this.handleShowAddDialog}>Add New</button>
                        </ButtonLayout>
                        
                    </Modal.Body>
                </BootstrapModal>
                </div>
                {/* Add/Edit Element Dialog */}
                <BootstrapModalAddDialog show={this.state.showAddDialog} onHide={this.handleAddElementClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.dialogType === "testParam"?"Add Test Parameter":"Add Element"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FieldSet>
                            <InputLabel>{this.props.dialogType === "testParam"?"Parameter Name":"Element Name"}</InputLabel>
                            <InputFieldBorder 
                                placeholder={this.props.dialogType === "testParam"?"Parameter Name":"Element Name"}
                                name="varName"
                                onChange={this.handleChange}
                                value={this.state.varName}
                            />
                            {
                                !isEmptyVariable(this.state.errors.varName) &&
                                <ErrorSpan>{this.state.errors.varName}</ErrorSpan>
                            }
                        </FieldSet>
                        <FieldSet>
                            <InputLabel>{this.props.dialogType === "testParam"?"Parameter Value":"Element Value"}</InputLabel>
                            <InputFieldBorder 
                                placeholder={this.props.dialogType === "testParam"?"Parameter Value":"Element Value"}
                                name="varValue"
                                onChange={this.handleChange}
                                value={this.state.varValue}
                            />
                            {
                                this.props.dialogType === "element" &&
                                <InfoSpan>{`Please use <<data>> to parameterize element`}</InfoSpan>
                            }
                            {
                                !isEmptyVariable(this.state.errors.varValue) &&
                                <ErrorSpan>{this.state.errors.varValue}</ErrorSpan>
                            }
                        </FieldSet>
                        {
                            !isEmptyVariable(this.state.errors.addElementError) &&
                            <ErrorSpan>{this.state.errors.addElementError}</ErrorSpan>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <CancelBtnDialog
                            as="button"
                            onClick={this.handleAddElementClose}
                        >Cancel</CancelBtnDialog>
                        <SaveBtnDialog
                            as="button"
                            onClick = {this.addElement}
                        >{this.props.dialogType === "testParam"?"Save Parameter":"Save Element"}</SaveBtnDialog>
                    </Modal.Footer>
                </BootstrapModalAddDialog>
            </div>
        )
    }

}

export default SearchElementTestParamDialog;