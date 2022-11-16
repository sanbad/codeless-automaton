import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {BootstrapModalAddAction,CardWrapper,
    DialogLayout,FieldSetAction,InputLabelAction,InputFieldBorderAction,BootstrapModal,
    ErrorSpanAction,AddNewStepLayout,AddPlusIcon,AddNewText,CreateActionLayout,
    List, ListItem, StepsCard,InputFieldBorderStepVal,
    ActionOuterWrapper,StepIndex,FieldWrapper,FieldLabel,
    DeleteStepLayout,DeleteIconHolder,DeleteIcon,
    ChooseParameterLayout,InputLayout,ElementSelectButton,CircleWithCrossIcon,
    CancelBtnDialog,SaveBtnDialog} from './addactiondialog.style';
import {CustomRow,CustomCol,CustomRow5,CustomCol5,TextareaFieldBorder} from '../Global/common.style';
import {getLocalStorageVariables,isEmptyVariable,isEmptyArray} from '../commonFunctions';
import * as Constants from '../constants';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { animateScroll } from "react-scroll";
import CreatableSelect from "react-select/creatable";
import ReactSelectSearchDialog from '../SearchDialogs/searchelementdialog';
import ReactSelectDropdown from '../../commonComponents/DropDownSearchApi/ReactSelectDropdownWithSearch';

const epicCustomStyles = {
	placeholder: (provided, state) => ({
		...provided,
		fontSize: 14,
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
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
  
    // change background colour if dragging
    border: isDragging ? "1px solid #38b2fe" : "none",
  
    // styles we need to apply on draggables
    ...draggableStyle
});

const userDetails  = getLocalStorageVariables();

class AddActionDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            actionName:"",
            actionNameError:"",
            description:"",
            sortDir:"desc",
            stepCount:0, //Required to create unique ids for the step variable[Required for DnD]
            stepsError:"",
            stepsArr: [{
                primitiveActionId:-1,
                primitiveActionValue:"Select Action",
                isElementReq:"N",
                isElementParameterized:"N",
                isValueReq:"N",
                isNameReq:"N",
                primitiveError:"",
                elementId:-1,
                elementName:"Select Element",
                elementDataParamValue:"",
                elementTestParamId:-1,
                elementError:"",
                stepValue:"",
                stepValueTestParamId:-1,
                stepNameParam:"",
                valueError:"",
                id:"step0"
            }],
            elementsList:[],
            totalElementsCount:0,
            testParamsList:[],
            totalTestParamsCount:0,
            primitiveActionList:[],
            totalTestParamsCount:0,
            showAddElementModal:false,
            elementName:'',
            elementValue:'', 
            errors:[],
            showLoader:false,

            tagsMasterDD: [],
			tagsSelectedDD: [],

        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props) && 
        this.props.showAddActionModal){
            this.primitiveActionDDArr = this.props.primitiveActionDDArr;
            this.setState({
                actionName:"",
                actionNameError:"",
                description:"",
                stepCount:0, //Required to create unique ids for the step variable[Required for DnD]
                stepsError:"",
                stepsArr: [{
                    primitiveActionId:-1,
                    primitiveActionValue:"Select Action",
                    isElementReq:"N",
                    isElementParameterized:"N",
                    isValueReq:"N",
                    isNameReq:"N",
                    primitiveError:"",
                    elementId:-1,
                    elementName:"Select Element",
                    elementDataParamValue:"",
                    elementTestParamId:-1,
                    elementError:"",
                    stepValue:"",
                    stepValueTestParamId:-1,
                    stepNameParam:"",
                    valueError:"",
                    id:"step0"
                }],
                elementsList:[],
                totalElementsCount:0,
                primitiveActionList:[],

                showReactSelectSearchDialog:false,
                selectedIndex:"",
                selectedVarName:"",
                selectedVarId:"",
                dialogType:"element",
                inputType:"element"
            },()=>{
                this.initData();
            })
        }
    }

    //handling the change of state of step value variable. Step index is passed in name variable
    handleChangeStepValue = (e) => {
        const { name, value } = e.target;

        let tempStepsArr = this.state.stepsArr;
        tempStepsArr[name].stepValue = value;

        this.setState({
            stepsArr:tempStepsArr
        })
        
    }

    handleChangeElementDataParamValue = (e) => {
        const { name, value } = e.target;
        let tempStepsArr = this.state.stepsArr;
        tempStepsArr[name].elementDataParamValue = value;

        this.setState({
            stepsArr:tempStepsArr
        })
        
    }

    handleChangeStepNameParam = (e) => {
        const { name, value } = e.target;

        let tempStepsArr = this.state.stepsArr;
        tempStepsArr[name].stepNameParam = value;

        this.setState({
            stepsArr:tempStepsArr
        })
        
    }

    //Handle Change of action name
    handleChange = (e) => {
        const {name,value} = e.target;

        this.setState({
            [name]:value
        })
    }

    //Adding a new empty step. Create a object and initialise it, 
    //then push the object to steparr
    addNewStep = () => {
        let id = this.state.stepCount + 1;
        const step = {
            primitiveActionId:-1,
            primitiveActionValue:"Select Action",
            isElementReq:"N",
            isElementParameterized:"N",
            isValueReq:"N",
            isNameReq:"N",
            primitiveError:"",
            elementId:-1,
            elementName:"Select Element",
            elementDataParamValue:"",
            elementTestParamId:-1,
            elementError:"",
            stepValue:"",
            stepValueTestParamId:-1,
            stepNameParam:"",
            valueError:"",
            id:"step"+id,
        }

        var tempArr = this.state.stepsArr;
        tempArr.push(step)

        this.setState({
            stepsArr:tempArr,
            stepCount:id
        },() => {
            this.scrollToBottom();
        })
    }

    //Update the step when user click on primitive actions dropdown item

    onPrimitiveActionDropDownItemClick = (item,stepNo) => {
        const tempArr = this.state.stepsArr;
        let idTemp = tempArr[stepNo].id;
        let tempObj = {
            primitiveActionId:item.id,
            primitiveActionValue:item.label,
            isElementReq:item.isElement,
            isElementParameterized:"N",
            isValueReq:item.isValue,
            isNameReq:item.isName,
            primitiveError:"",
            elementId:-1,
            elementName:"Select Element",
            elementDataParamValue:"",
            elementTestParamId:-1,
            elementError:"",
            stepValue:"",
            stepValueTestParamId:-1,
            stepNameParam:"",
            namePlaceholder:item.namePlaceholder,
            valuePlaceholder:item.valuePlaceholder,
            valueError:"",
            id:idTemp
        }

        tempArr.splice(stepNo,1,tempObj);

        this.setState({
            stepsArr:tempArr,
        })
    }

    handleReactSelectSaveClose = (item,stepNo,dialogType,inputType) => {
        const tempArr = this.state.stepsArr;
        if(dialogType === "testParam"){
            if(inputType === "value"){
                tempArr[stepNo].stepValueTestParamId = item.testParamId;
                tempArr[stepNo].stepValue = item.testParamName;
            }else{
                tempArr[stepNo].elementTestParamId = item.testParamId;
                tempArr[stepNo].elementDataParamValue = item.testParamName;
            }
            
        }else{
            tempArr[stepNo].elementId = item.elementId;
            tempArr[stepNo].elementName = item.elementName;
            tempArr[stepNo].isElementParameterized = item.isElementParameterized;
        }

        this.setState({
            stepsArr:tempArr,
            
            showReactSelectSearchDialog:false,
            selectedIndex:"",
            selectedVarName:"",
            selectedVarId:"",
            dialogType:"element",
            inputType:"element",
        })
    }

    deleteStep = (index,e) => {
        e.stopPropagation();
        let tempArr = this.state.stepsArr;
        tempArr.splice(index,1);

        this.setState({
            stepsArr:tempArr
        })

    }

    clearStatesErrors = () => {
        let tempArr = this.state.stepsArr;
        for(const [index, value] of tempArr.entries()){
            tempArr[index].primitiveError = ""
            tempArr[index].elementError = ""
            tempArr[index].valueError = ""
            tempArr[index].nameParamError = ""
            tempArr[index].elementDataParamError = ""
        }

        this.setState({
            stepsArr:tempArr,
            actionNameError:"",
            stepsError:""
        })
    }

    handleActionCancel = () => {this.props.handleAddActionClose();}

    scrollToBottom = () => {
        animateScroll.scrollToBottom({
            duration: 500,
            containerId: "modalbody"
        });
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        const items = reorder(
            this.state.stepsArr,
            result.source.index,
            result.destination.index
        );
    
        this.setState({
            stepsArr:items
        });
    }

    handleTagChange = (newValueArr, actionMeta) => {

        this.setState(
            {
                tagsSelectedDD: newValueArr,
            });
    };

    handleShowElementTestParamSearchDialog = (item, index, dialogType,inputType) => {
        this.setState({
            showReactSelectSearchDialog:true,
            selectedIndex:index,
            selectedVarName:dialogType==="testParam"?item.testParamName:item.elementName,
            selectedVarId:dialogType==="testParam"?item.testParamId:item.elementId,
            dialogType:dialogType,
            inputType:inputType
        })
    }

    clearElementDataParam = (stepNo,inputType) => {
        const tempArr = this.state.stepsArr;
        if(inputType === "value"){
            tempArr[stepNo].stepValueTestParamId = -1;
            tempArr[stepNo].stepValue = "";
        }else{
            tempArr[stepNo].elementTestParamId = -1;
            tempArr[stepNo].elementDataParamValue = "";
        }
        
        this.setState({
            stepsArr:tempArr
        })

    }

    handleReactSelectSearchDialogClose = () => {
        this.setState({
            showReactSelectSearchDialog:false,
            selectedIndex:"",
            selectedVarName:"",
            selectedVarId:"",
            dialogType:"element",
            inputType:"element",
        })
    }

    listItemOnClick = (e) => {
        // event.stopPropagation();
        // event.preventDefault();
        // we used the event for dragging
        if(e.defaultPrevented) {
            return;
        }

        // e.currentTarget.focus();
        if (e.currentTarget !== e.target && e.target.tabIndex >= 0) {
            e.target.focus();
        } else {
            e.currentTarget.focus();
        }
    }

    /********************API CALLS**********************/
    handleCreateAction = () => {
        this.setState({
            showLoader:true
        })
        let tempArr = this.state.stepsArr;
        let isError = false;
        let stepsErr = "";

        if(tempArr.length > 0){
            for(const [index, value] of tempArr.entries()){
                if(value.primitiveActionId === -1){
                    tempArr[index].primitiveError = "Please select an Action"
                    isError = true;
                }else{
                    if(value.isElementReq === "Y" && value.elementId === -1){
                        tempArr[index].elementError = "Please select an Element"
                        isError = true;
                    }
                    
                    if(value.isElementParameterized === "Y" && isEmptyVariable(value.elementDataParamValue)){
                        tempArr[index].elementDataParamError = "Please enter parameter"
                        isError = true;
                    }
    
                    if(value.isValueReq === "Y" && isEmptyVariable(value.stepValue)){
                        tempArr[index].valueError = "Please enter step value"
                        isError = true;
                    }

                    if(value.isNameReq === "Y" && isEmptyVariable(value.stepNameParam)){
                        tempArr[index].nameParamError = "Please enter name"
                        isError = true;
                    }
                }
            }
        }else{
            isError = true;
            stepsErr = "Please add atleast one step"
        }

        //Check if action name is empty
        let actionErr = "";
        if(isEmptyVariable(this.state.actionName)){
            isError = true;
            actionErr = "Please enter action name"
        }
        let tagsArr=this.state.tagsSelectedDD.map((item)=>item.label);

        if(isError){
            this.setState({
                stepsArr:tempArr,
                actionNameError:actionErr,
                stepsError:stepsErr,
                showLoader:false
            });

            setTimeout(function(){
                this.clearStatesErrors();
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }else{
            //CALL ADD ACTION API
            // alert(JSON.stringify(this.state.stepsArr));
            fetch(Constants.AddAction,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.props.project_id,
                    name:this.state.actionName,
                    description:this.state.description,
                    steps:JSON.stringify(this.state.stepsArr),
                    tags:JSON.stringify(tagsArr),
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showLoader:false
                    }, ()=>{
                        this.props.onSaveClickListener();
                    });
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        stepsError:data.responseMessage,
                        showLoader:false
                    });

                    setTimeout(function(){
                        this.clearStatesErrors();
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }
            });
        }
    }

    initData = () => {
        this.setState({
            showLoader:true,
        });

        Promise.all([
            fetch(Constants.GetProjectActionTags,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.props.project_id,
                })
            })
        ])
        .then(([actionTagsRes]) => { 
            return Promise.all([actionTagsRes.json()]) 
        })
        .then(([actionTagsRes]) => {
            let tagsMasterDD = [];
            let tagsArr = [];
            
            if(actionTagsRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){

                tagsArr=actionTagsRes.data.result;
                tagsMasterDD= tagsArr.map((item)=>({value:item.actionTagName,label:item.actionTagName}));
                
            }else if(actionTagsRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }

            this.setState({
                showLoader:false,
                componentDidMountFlag:true,
                tagsMasterDD:tagsMasterDD,
            })
        });
    }
    
    handleRefreshActionElements = () =>{
        this.getElementList();
    }

    //get primitive actions from API
    getPrimitiveActionList = () => {
        fetch(Constants.ListPrimitiveActions,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.primitiveActionDDArr = [];
                for(const [index,value] of data.data.result.entries()){
                    const temp = {
                        id:value.stepMasterId,
                        label:value.stepMasterDisplayName,
                        isElement:value.isElement,
                        isValue:value.isValue,
                        isName:value.isName,
                        namePlaceholder:value.namePlaceholder,
                        valuePlaceholder:value.valuePlaceholder,
                    }
                    this.primitiveActionDDArr.push(temp);
                }
                this.primitiveActionDDArr.reverse();
                this.setState({
                    primitiveActionList:data.data.result,
                })
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                this.setState({
                    primitiveActionList:[]
                })
            }
        });
    }

    //get element list from API
    getElementList = () => {
        fetch(Constants.ElementList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.props.project_id,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    totalElementsCount:data.data.totalCount,
                    elementsList:!isEmptyArray(data.data.result)?data.data.result:[],
                })
            }else{
                this.setState({
                    elementsList:[],
                })
            }
        });
    }

    getTestParamsList = () => {
        fetch(Constants.TestParamList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.props.project_id,
                sortDir:this.state.sortDir
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                this.setState({
                    totalTestParamsCount:data.data.count,
                    testParamsList:data.data.result,
                })
            }else{
                this.setState({
                    testParamsList:[],
                })
            }
        });
    }

    render(){
        let elementsListTemp = [];
        let testParamsListTemp = [];
        
        if(isEmptyArray(this.state.elementsList)){
            elementsListTemp = this.props.elementsList;
        }else{
            elementsListTemp = this.state.elementsList;
        }
        if(isEmptyArray(this.state.testParamsList)){
            testParamsListTemp = this.props.testParamsList;
        }else{
            testParamsListTemp = this.state.testParamsList;
        }

        return(
            <DialogLayout>
            <BootstrapModalAddAction show={this.props.showAddActionModal} onHide={this.props.handleAddActionClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Action</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modalbody">
                    <CardWrapper>
                        <CreateActionLayout>
                            <CustomRow>
                                <CustomCol md={6}>
                                    <FieldSetAction>
                                        <InputLabelAction>Action Name</InputLabelAction>
                                        <InputFieldBorderAction 
                                            placeholder="Action Name"
                                            name="actionName"
                                            value={this.state.actionName}
                                            onChange={this.handleChange}
                                        />
                                        {
                                            !isEmptyVariable(this.state.actionNameError) && 
                                            <ErrorSpanAction>{this.state.actionNameError}</ErrorSpanAction>
                                        }
                                    </FieldSetAction>
                                </CustomCol>
                                <CustomCol md={6}>
                                    <FieldSetAction>
                                        <InputLabelAction>Tags</InputLabelAction>
                                        <CreatableSelect
                                            isMulti
                                            placeholder="Add Tags"
                                            styles={epicCustomStyles}
                                            classNamePrefix="action-tags"
                                            value={this.state.tagsSelectedDD}
                                            onChange={this.handleTagChange}
                                            options={this.state.tagsMasterDD}
                                            // components={{
                                            //     IndicatorsContainer: this.returnNullComponent,
                                            // }}
                                        />
                                    </FieldSetAction>
                                </CustomCol>
                            </CustomRow>
                            <CustomRow>
                                <CustomCol md={6}>
                                    <FieldSetAction>
                                        <InputLabelAction>Description</InputLabelAction>
                                        <TextareaFieldBorder 
                                            placeholder="Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                            minHeight="80px"
                                            borderColor="#bbb"
                                        />
                                    </FieldSetAction>
                                </CustomCol>
                            </CustomRow>

                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <List
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        >

                                        {
                                            this.state.stepsArr.map((item, index) => {
                                                return <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <ListItem
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                            onClick = {this.listItemOnClick}
                                                        >
                                                        <StepsCard>
                                                            <CustomRow5>
                                                                <CustomCol5 md="4">
                                                                    <ActionOuterWrapper>
                                                                        <StepIndex>{(index+1)}.</StepIndex>
                                                                        <FieldWrapper marginLeft={"10px"}>
                                                                            <FieldLabel>Action</FieldLabel>
                                                                            <ReactSelectDropdown
                                                                                placeholder={item.primitiveActionValue}
                                                                                selectedDDObj= {{
                                                                                    label:item.primitiveActionValue,
                                                                                    id:item.primitiveActionId
                                                                                }}
                                                                                handleReactSelectClose={this.onPrimitiveActionDropDownItemClick}
                                                                                selectDropdownArr={this.primitiveActionDDArr}
                                                                                label={"label"}
                                                                                value={"id"}
                                                                                dropDownId = {index}
                                                                            />
                                                                            {
                                                                                !isEmptyVariable(item.primitiveError) &&
                                                                                <ErrorSpanAction>{item.primitiveError}</ErrorSpanAction>
                                                                            }
                                                                        </FieldWrapper>
                                                                    </ActionOuterWrapper>
                                                                </CustomCol5>

                                                                {
                                                                    item.isElementReq === "Y" &&
                                                                    <CustomCol5 md="4">
                                                                        <ActionOuterWrapper
                                                                            style={{marginBottom:item.isElementParameterized === "Y"?10:0}}
                                                                        >
                                                                            <FieldWrapper>
                                                                                <FieldLabel>Elements</FieldLabel>
                                                                                <ElementSelectButton
                                                                                    onClick = {this.handleShowElementTestParamSearchDialog.bind(this,item,index,"element")}
                                                                                >
                                                                                    <p>{item.elementName}</p>
                                                                                </ElementSelectButton>
                                                                                {
                                                                                    !isEmptyVariable(item.elementError) &&
                                                                                    <ErrorSpanAction>{item.elementError}</ErrorSpanAction>
                                                                                }
                                                                            </FieldWrapper>
                                                                        </ActionOuterWrapper>
                                                                        {
                                                                            item.isElementParameterized === "Y" &&
                                                                            <ActionOuterWrapper>
                                                                                <FieldWrapper>
                                                                                    <FieldLabel>Parameter Value</FieldLabel>
                                                                                    <InputLayout>
                                                                                        <InputFieldBorderStepVal 
                                                                                            placeholder={"Enter Parameter Value"}
                                                                                            value={item.elementTestParamId !== -1?"{"+item.elementDataParamValue+"}":item.elementDataParamValue}
                                                                                            name={index}
                                                                                            onChange={this.handleChangeElementDataParamValue}
                                                                                            style={{
                                                                                                minWidth:160,
                                                                                                fontSize:13,
                                                                                                color:item.elementTestParamId !== -1?"#2e8c03":"#333"
                                                                                            }}
                                                                                            disabled={item.elementTestParamId !== -1}
                                                                                        />
                                                                                        {
                                                                                            item.elementTestParamId !== -1 &&
                                                                                            <CircleWithCrossIcon 
                                                                                                onClick = {this.clearElementDataParam.bind(this,index,"element")}
                                                                                            />
                                                                                        }
                                                                                    </InputLayout>
                                                                                    <ChooseParameterLayout>
                                                                                        <button
                                                                                        onClick = {this.handleShowElementTestParamSearchDialog.bind(this,item,index,"testParam","element")}
                                                                                        >Choose Parameter</button>
                                                                                    </ChooseParameterLayout>
                                                                                    {
                                                                                        !isEmptyVariable(item.elementDataParamError) &&
                                                                                        <ErrorSpanAction>{item.elementDataParamError}</ErrorSpanAction>
                                                                                    }
                                                                                </FieldWrapper>
                                                                            </ActionOuterWrapper>
                                                                        }
                                                                    </CustomCol5>
                                                                }

                                                                {
                                                                    (item.isNameReq === "Y" || item.isValueReq === "Y") &&
                                                                    <CustomCol5 md="4">
                                                                        {
                                                                            item.isNameReq === "Y" &&
                                                                            <ActionOuterWrapper
                                                                                style={{marginBottom:item.isValueReq === "Y"?10:0}}
                                                                            >
                                                                                <FieldWrapper>
                                                                                    <FieldLabel>Name</FieldLabel>
                                                                                    <InputFieldBorderStepVal 
                                                                                        placeholder={item.namePlaceholder}
                                                                                        value={item.stepNameParam}
                                                                                        name={index}
                                                                                        onChange={this.handleChangeStepNameParam}
                                                                                        style={{minWidth:160,fontSize:13}}
                                                                                    />
                                                                                    {
                                                                                        !isEmptyVariable(item.nameParamError) &&
                                                                                        <ErrorSpanAction>{item.nameParamError}</ErrorSpanAction>
                                                                                    }
                                                                                </FieldWrapper>
                                                                            </ActionOuterWrapper>
                                                                        }
                                                                        {
                                                                            item.isValueReq === "Y" &&
                                                                            <ActionOuterWrapper>
                                                                                <FieldWrapper>
                                                                                    <FieldLabel>Value</FieldLabel>
                                                                                    <InputLayout>
                                                                                        <InputFieldBorderStepVal 
                                                                                            placeholder={item.valuePlaceholder}
                                                                                            value={item.stepValueTestParamId !== -1?"{"+item.stepValue+"}":item.stepValue}
                                                                                            name={index}
                                                                                            onChange={this.handleChangeStepValue}
                                                                                            style={{
                                                                                                minWidth:160,
                                                                                                fontSize:13,
                                                                                                color:item.stepValueTestParamId !== -1?"#2e8c03":"#333"
                                                                                            }}
                                                                                            disabled={item.stepValueTestParamId !== -1}
                                                                                        />
                                                                                        {
                                                                                            item.stepValueTestParamId !== -1 &&
                                                                                            <CircleWithCrossIcon 
                                                                                                onClick = {this.clearElementDataParam.bind(this,index,"value")}
                                                                                            />
                                                                                        }
                                                                                    </InputLayout>
                                                                                    <ChooseParameterLayout>
                                                                                        <button
                                                                                        onClick = {this.handleShowElementTestParamSearchDialog.bind(this,item,index,"testParam","value")}
                                                                                        >Choose Parameter</button>
                                                                                    </ChooseParameterLayout>
                                                                                    {
                                                                                        !isEmptyVariable(item.valueError) &&
                                                                                        <ErrorSpanAction>{item.valueError}</ErrorSpanAction>
                                                                                    }
                                                                                </FieldWrapper>
                                                                            </ActionOuterWrapper>
                                                                        }
                                                                    </CustomCol5>
                                                                }
                                                            </CustomRow5>

                                                            <DeleteStepLayout>
                                                                <DeleteIconHolder onClick={this.deleteStep.bind(this, index)}>
                                                                    <DeleteIcon />
                                                                </DeleteIconHolder>
                                                            </DeleteStepLayout>
                                                        </StepsCard>
                                                        </ListItem>
                                                    )}
                                                </Draggable>
                                            })
                                        }
                                        {provided.placeholder}
                                        </List>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            
                            <AddNewStepLayout onClick={this.addNewStep}>
                                <AddPlusIcon />
                                <AddNewText>Add New Step</AddNewText>
                            </AddNewStepLayout>
                            {
                                !isEmptyVariable(this.state.stepsError) && 
                                <ErrorSpanAction
                                    style={{
                                        display:"block"
                                    }}
                                >{this.state.stepsError}</ErrorSpanAction>
                            }

                        </CreateActionLayout>
                    </CardWrapper>
                </Modal.Body>
                <Modal.Footer>
                    <CancelBtnDialog
                        as="button"
                        onClick={this.handleActionCancel}
                    >Cancel</CancelBtnDialog>
                    <SaveBtnDialog
                        as="button"
                        onClick = {this.handleCreateAction}
                    >Save Action</SaveBtnDialog>
                </Modal.Footer>
            </BootstrapModalAddAction>

            <ReactSelectSearchDialog
                placeholder={this.state.selectedVarName}
                selectDropdownArr = {this.state.dialogType === "testParam"?testParamsListTemp:elementsListTemp}
                selectedDDObj= {{
                    elementName:this.state.selectedVarName,
                    elementId:this.state.selectedVarId,
                }}
                dropDownId = {this.state.selectedIndex}
                dialogType = {this.state.dialogType}
                inputType = {this.state.inputType}
                projectId = {this.props.project_id}
                label={this.state.dialogType === "testParam"?"testParamName":"elementName"}
                value={this.state.dialogType === "testParam"?"testParamId":"elementId"}
                handleReactSelectSaveClose={this.handleReactSelectSaveClose}
                getElementList={this.getElementList}
                getTestParamsList={this.getTestParamsList}

                showReactSelectSearchDialog = {this.state.showReactSelectSearchDialog}
                handleReactSelectSearchDialogClose = {this.handleReactSelectSearchDialogClose}
                
            />
            
            </DialogLayout>
        )
    }
}


export default AddActionDialog;