import React, {Component} from 'react';
import {CardWrapper,ActionHeadingLayout,LoaderLayout,
    CreateActionHeading,
    FieldSetScenario,InputLabelScenario,InputFieldBorderScenario,BootstrapModal,
    ErrorSpanAction,AddNewStepLayout,AddPlusIcon,AddNewText,CreateActionLayout,
    List, ListItem, StepsCard,InputFieldBorderStepVal,TopCard,ButtonsLayouts,
    ActionOuterWrapper,StepIndex,FieldWrapper,FieldLabel,AddButtonsLayouts,
    DeleteStepLayout,DeleteIconHolder,DeleteIcon,SaveBtn,CancelBtnAction,
    BackButtonIcon,ElementSelectButton,
    InputLayout,CircleWithCrossIcon,ChooseParameterLayout} from './addscenario.style';

import {CustomContainer,CustomRow,CustomCol,CustomRow5,CustomCol5,TextareaFieldBorder} from '../../commonComponents/Global/common.style';
import AddActionDialog from '../../commonComponents/AddActionDialog'
import {getLocalStorageVariables,isEmptyVariable,isEmptyArray} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SpinnerLoader from 'react-loader-spinner';
import { animateScroll } from "react-scroll";
import CreatableSelect from "react-select/creatable";
import ReactSelectDropdown from '../../commonComponents/DropDownSearchApi/ReactSelectDropdownWithSearch';
import ReactSelectSearchDialog from '../../commonComponents/SearchDialogs/searchelementdialog';

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
// Sample Tags 
// const sampleTagsMasterDD=["UAT","Smoke","API","Integration"];

class AddScenario extends Component{
    constructor(props){
        super(props);
        this.state = {
            // project_id:"this.props.match.params.id",
            project_id:"",
            projectName:"",
            scenarioName:"",
            scenarioNameError:"",
            scenarioTags:"",
            description:"",
            stepCount:-1, //Required to create unique ids for the step variable[Required for DnD]
            stepsError:"",
            stepsArr: [],
            customActions:[],
            elementsList:[],
            totalElementsCount:0,
            testParamsList:[],
            totalTestParamsCount:0,
            primitiveActionList:[],
            showAddElementModal:false,
            elementName:'',
            elementValue:'', 
            errors:[],
            showLoader:false,

            showAddActionModal:false,
            tagsMasterDD: [],
			tagsSelectedDD: [],
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount(){
        this.setState({
            // project_id:"this.props.match.params.id",
            project_id:this.props.projectId,
            projectName:"",
            scenarioName:"",
            scenarioNameError:"",
            scenarioTags:"",
            description:"",
            sortDir:"desc",
            stepCount:-1, //Required to create unique ids for the step variable[Required for DnD]
            stepsError:"",
            stepsArr: [],
            elementsList:[],
            customActions:[],
            totalElementsCount:0,
            primitiveActionList:[],
            showAddElementModal:false,
            elementName:'',
            elementValue:'', 
            errors:[],
            showLoader:true,
            componentDidMountFlag:false,

            showAddActionModal:false,

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
            type:"primitive",
            primitiveActionId:-1,
            primitiveActionValue:"Select Action",
            isElementReq:"N",
            isElementParameterized:"N",
            isValueReq:"N",
            primitiveError:"",
            elementId:-1,
            elementName:"Select Element",
            elementDataParamValue:"",
            elementTestParamId:-1,
            elementError:"",
            stepValue:"",
            stepValueTestParamId:-1,
            valueError:"",
            id:"step"+id,

            customActionName:"",
            customActionId:-1,
            customActionError:"",
        }

        var tempArr = this.state.stepsArr;
        tempArr.push(step)

        this.setState({
            stepsArr:tempArr,
            stepCount:id
        }, () => {
            this.scrollToBottom();
        })
    }

    //Update the step when user click on primitive actions dropdown item

    onPrimitiveActionDropDownItemClick = (item,stepNo) => {
        const tempArr = this.state.stepsArr;
        let idTemp = tempArr[stepNo].id;
        let tempObj = {
            type:"primitive",
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
            valueError:"",
            id:idTemp,
            customActionName:"",
            customActionId:-1,
            customActionError:"",
            namePlaceholder:item.namePlaceholder,
            valuePlaceholder:item.valuePlaceholder,
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
            tempArr[index].customActionError = ""
        }

        this.setState({
            stepsArr:tempArr,
            scenarioNameError:"",
            stepsError:""
        })
    }

    handleCreateScenarioClose = () => {
        this.props.hideAddEditScenario(false);
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
		// let newTagLabel = "";
		// let operationType = "";
		// console.log(newValueArr);
		// console.log(actionMeta);

		// if (actionMeta.action === "select-option") {
		// 	newTagLabel = actionMeta.option.label;
		// 	operationType = actionMeta.action;
		// } else if (actionMeta.action === "create-option") {
		// 	newTagLabel = newValueArr[newValueArr.length - 1].label;
		// 	operationType = actionMeta.action;
		// } else if (actionMeta.action === "remove-value") {
		// 	newTagLabel = actionMeta.removedValue.label;
		// 	operationType = actionMeta.action;
		// }
		this.setState({
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

    addCustomAction = () => {
        let id = this.state.stepCount + 1;
        const step = {
            type:"custom",
            primitiveActionId:-1,
            primitiveActionValue:"Select Action",
            isElementReq:"N",
            isValueReq:"N",
            primitiveError:"",
            elementId:-1,
            elementName:"Select Element",
            elementError:"",
            stepValue:"",
            valueError:"",
            id:"step"+id,

            customActionName:"Select Custom Action",
            customActionId:-1,
            customActionError:"",
        }

        var tempArr = this.state.stepsArr;
        tempArr.push(step)

        this.setState({
            stepsArr:tempArr,
            stepCount:id
        }, () => {
            this.scrollToBottom();
        })
    }

    onCustomActionDropDownItemClick = (item,stepNo) => {
        const tempArr = this.state.stepsArr;
        tempArr[stepNo].customActionName = item.actionName;
        tempArr[stepNo].customActionId = item.actionId;

        this.setState({
            stepsArr:tempArr,
        })
    }

    handleAddActionClose = () => {
        this.setState({
            showAddActionModal:false
        })
    }

    showAddActionModalFunc = () => {
        this.setState({
            showAddActionModal:true
        })
    }

    onSaveClickListener = () => {
        this.getCustomActionList();
        this.handleAddActionClose();
    }

    scrollToBottom = () => {
        animateScroll.scrollToBottom({
            duration: 500,
        });
    }
    /***********************API CALLS **************************/
    initData = () => {
        if(this.props.isEdit){
            this.initScenarioEdit();
        }else{
            this.getAllListsFromApi();
        }
    }

    initScenarioEdit = () => {
        Promise.all([
            fetch(Constants.ElementList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                })
            }),
            fetch(Constants.TestParamList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                    sortDir:this.state.sortDir
                })
            }),
            fetch(Constants.ActionList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                })
            }),
            fetch(Constants.ListPrimitiveActions,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                })
            }),
            fetch(Constants.ScenarioDetails,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    scenarioId:this.props.scenarioId,
                })
            }),
            fetch(Constants.GetProjectScenarioTags,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                })
            })
            
        ])
        .then(([elementRes,testParamsRes,customActionRes,primitiveActionRes,scenarioRes,scenarioTagsRes]) => { 
            return Promise.all([elementRes.json(),testParamsRes.json(),customActionRes.json(),primitiveActionRes.json(),scenarioRes.json(),scenarioTagsRes.json()]) 
        })
        .then(([elementRes,testParamsRes,customActionRes,primitiveActionRes,scenarioRes,scenarioTagsRes]) => {
            let totalElementCountTemp = 0;
            let elementListTemp = [];
            let totalTestParamsCount=0;
            let testParamsList=[];

            if(elementRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                totalElementCountTemp = elementRes.data.count;
                elementListTemp = elementRes.data.result;
            }else if(elementRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                elementListTemp = [];
            }

            if(testParamsRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(testParamsRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                totalTestParamsCount=testParamsRes.data.count;
                testParamsList=testParamsRes.data.result;
            }else{
            }

            let customActionsTotalCountTemp = 0;
            let customActionsTemp = [];

            if(customActionRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                customActionsTemp = customActionRes.data.result;
                customActionsTotalCountTemp = customActionRes.data.count;
            }else if(customActionRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                customActionsTemp = [];
            }

            this.primitiveActionDDArr = [];

            if(primitiveActionRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                if(!isEmptyArray(primitiveActionRes.data.result)){
                    for(const [index,value] of primitiveActionRes.data.result.entries()){
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
                }
            }else if(primitiveActionRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }

            //Scenario Details
            let scenarioName = "";
            let scenarioTags = "";
            let description = "";
            let scenarioCreateDate = "";
            let stepsArrTemp = [];
            let projectName = "";
            let stepCountTemp = 0;
            let scenarioTagsArr = [];
            let tagsSelectedDD = [];

            if(scenarioRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(scenarioRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                if(!isEmptyVariable(scenarioRes.data.scenarioDetails)){
                    scenarioName = scenarioRes.data.scenarioDetails.scenarioName;
                    scenarioTags = scenarioRes.data.scenarioDetails.scenarioTags;
                    description = scenarioRes.data.scenarioDetails.scenarioDescription;
                    scenarioCreateDate = scenarioRes.data.scenarioDetails.createDate;
                    try{
                        scenarioTagsArr = JSON.parse(scenarioRes.data.scenarioDetails.scenarioTags);
                    }catch(e){
                        scenarioTagsArr = [];
                    }
                    tagsSelectedDD= scenarioTagsArr.map((item)=>({value:item,label:item}));

                    if(!isEmptyArray(scenarioRes.data.scenarioDetails.actionArr)){
                        for(const [index, stepObj] of scenarioRes.data.scenarioDetails.actionArr.entries()){
                            let stepTemp = {};
                            stepCountTemp++;
                            if(stepObj.type === "primitive"){
                                let elementDataParamValue = "";
                                //parameter is not chosen
                                if(stepObj.steps[0].elementTestParamId === -1){
                                    //if parameter is required and hardcoded
                                    if(stepObj.steps[0].isElementParameterized === "Y"){
                                        elementDataParamValue = stepObj.steps[0].elementTestData;
                                    }else{
                                        elementDataParamValue = "";
                                    }
                                }else{
                                    elementDataParamValue = stepObj.steps[0].elementTestParamName;
                                }

                                let stepValue = "";
                                //parameter is not chosen
                                if(stepObj.steps[0].valueTestParamId === -1){
                                    stepValue = stepObj.steps[0].value;
                                }else{
                                    stepValue = stepObj.steps[0].valueTestParamName;
                                }

                                stepTemp = {
                                    type:"primitive",
                                    primitiveActionId:stepObj.steps[0].stepMasterId,
                                    primitiveActionValue:stepObj.steps[0].stepMasterDisplayName,//name required
                                    isElementReq:stepObj.steps[0].isElement,
                                    isElementParameterized:stepObj.steps[0].isElementParameterized,
                                    isValueReq:stepObj.steps[0].isValue,
                                    isNameReq:stepObj.steps[0].isName,
                                    primitiveError:"",
                                    elementId:isEmptyVariable(stepObj.steps[0].elementId)?"-1":stepObj.steps[0].elementId,
                                    elementName:isEmptyVariable(stepObj.steps[0].elementName)?"Select Element":stepObj.steps[0].elementName,
                                    elementDataParamValue:elementDataParamValue,
                                    elementTestParamId:stepObj.steps[0].elementTestParamId,
                                    elementError:"",
                                    stepValue:stepValue,
                                    stepValueTestParamId:stepObj.steps[0].valueTestParamId,
                                    stepNameParam:stepObj.steps[0].nameParam,
                                    namePlaceholder:stepObj.steps[0].namePlaceholder,
                                    valuePlaceholder:stepObj.steps[0].valuePlaceholder,
                                    valueError:"",
                                    id:"step"+index,

                                    customActionName:"Select Custom Action",
                                    customActionId:-1,
                                    customActionError:"",
                                };
                            }else{
                                stepTemp = {
                                    type:"custom",
                                    primitiveActionId:-1,
                                    primitiveActionValue:"Select Action",
                                    isElementReq:"N",
                                    isValueReq:"N",
                                    primitiveError:"",
                                    elementId:-1,
                                    elementName:"Select Element",
                                    elementError:"",
                                    stepValue:"",
                                    valueError:"",
                                    id:"step"+index,

                                    customActionName:stepObj.customActionName,
                                    customActionId:stepObj.customActionId,
                                    customActionError:"",
                                }
                            }
                            stepsArrTemp.push(stepTemp);
                        }
                    }
                }
            } else {
            }
            console.log(stepsArrTemp);

            let tagsMasterDD = [];
            let tagsArr = [];
            if(scenarioTagsRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){

                tagsArr=scenarioTagsRes.data.result;
                tagsMasterDD= tagsArr.map((item)=>({value:item.scenarioTagName,label:item.scenarioTagName}));
                
            }else if(scenarioTagsRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }

            this.setState({
                totalElementsCount:totalElementCountTemp,
                elementsList:elementListTemp,
                totalTestParamsCount:totalTestParamsCount,
                testParamsList:testParamsList,

                customActions:customActionsTemp,
                customActionsTotalCount:customActionsTotalCountTemp,

                scenarioName:scenarioName,
                scenarioTags:scenarioTags,
                description:description,
                scenarioCreateDate:scenarioCreateDate,
                stepsArr:stepsArrTemp,
                projectName:projectName,
                stepCount:stepCountTemp,
                
                showLoader:false,
                componentDidMountFlag:true,

                tagsMasterDD:tagsMasterDD,
                tagsSelectedDD:tagsSelectedDD
            })
        });
    }

    getAllListsFromApi = () => {
        Promise.all([
            fetch(Constants.ElementList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                })
            }),
            fetch(Constants.TestParamList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                    sortDir:this.state.sortDir
                })
            }),
            fetch(Constants.ActionList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                })
            }),
            fetch(Constants.ListPrimitiveActions,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                })
            }),
            fetch(Constants.GetProjectScenarioTags,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.project_id,
                })
            })
            
        ])
        .then(([elementRes,testParamsRes,customActionRes,primitiveActionRes,scenarioTagsRes]) => { 
            return Promise.all([elementRes.json(),testParamsRes.json(),customActionRes.json(),primitiveActionRes.json(),scenarioTagsRes.json()]) 
        })
        .then(([elementRes,testParamsRes,customActionRes,primitiveActionRes,scenarioTagsRes]) => {
            let totalElementCountTemp = 0;
            let elementListTemp = [];
            let totalTestParamsCount=0;
            let testParamsList=[];

            if(elementRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                totalElementCountTemp = elementRes.data.count;
                elementListTemp = elementRes.data.result;
            }else if(elementRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                elementListTemp = [];
            }

            if(testParamsRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(testParamsRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4)
            {
                totalTestParamsCount=testParamsRes.data.count;
                testParamsList=testParamsRes.data.result;
            }else{
            }

            let customActionsTotalCountTemp = 0;
            let customActionsTemp = [];

            if(customActionRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                customActionsTemp = customActionRes.data.result;
                customActionsTotalCountTemp = customActionRes.data.count;
            }else if(customActionRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                customActionsTemp = [];
            }

            this.primitiveActionDDArr = [];

            if(primitiveActionRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                if(!isEmptyArray(primitiveActionRes.data.result)){
                    for(const [index,value] of primitiveActionRes.data.result.entries()){
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
                }
            }else if(primitiveActionRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }
           
            let tagsMasterDD = [];
            let tagsArr = [];
            if(scenarioTagsRes.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){

                tagsArr=scenarioTagsRes.data.result;
                tagsMasterDD= tagsArr.map((item)=>({value:item.scenarioTagName,label:item.scenarioTagName}));
                
            }else if(scenarioTagsRes.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
            }
            console.log(testParamsList);
            this.setState({
                totalElementsCount:totalElementCountTemp,
                elementsList:elementListTemp,
                totalTestParamsCount:totalTestParamsCount,
                testParamsList:testParamsList,

                customActions:customActionsTemp,
                customActionsTotalCount:customActionsTotalCountTemp,

                tagsMasterDD:tagsMasterDD,

                showLoader:false,
                componentDidMountFlag:true
            })
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
                projectNo:this.state.project_id,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    totalElementsCount:data.data.count,
                    elementsList:data.data.result,
                })
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
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
                projectNo:this.state.project_id,
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
    //get custom action list from API
    getCustomActionList = () => {
        fetch(Constants.ActionList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.project_id,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    customActions:data.data.result,
                    customActionsTotalCount:data.data.count,
                })
            }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else{
                this.setState({
                    customActions:"",
                })
            }
        });
    }

    handleCreateScenario = () => {
        this.setState({
            showLoader:true
        })
        
        let tempArr = this.state.stepsArr;
        let isError = false;
        let stepsErr = "";
        
        let tagsArr=[];
        if (!isEmptyArray(this.state.tagsSelectedDD)) {
            tagsArr=this.state.tagsSelectedDD.map((item)=>item.label);
        }
        console.log("=- ",tagsArr)
        
        if(tempArr.length > 0){
            for(const [index, value] of tempArr.entries()){

                if(value.type === "custom"){
                    if(value.customActionId === -1){
                        tempArr[index].customActionError = "Please select a Custom Action"
                        isError = true;
                    }
                }else{
                    if(value.primitiveActionId === -1){
                        tempArr[index].primitiveError = "Please select an Action"
                        isError = true;
                    }else{
                        if(value.isElementReq === "Y" && value.elementId+"" === "-1"){
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
            }
        }else{
            isError = true;
            stepsErr = "Please add atleast one step"
        }

        //Check if action name is empty
        let scenarioErr = "";
        if(isEmptyVariable(this.state.scenarioName)){
            isError = true;
            scenarioErr = "Please enter scenario name"
        }

        if(isError){
            this.setState({
                stepsArr:tempArr,
                scenarioNameError:scenarioErr,
                stepsError:stepsErr,
                showLoader:false
            });

            setTimeout(function(){
                this.clearStatesErrors();
            }.bind(this),Constants.WRNG_MSG_TIMEOUT);
        }else{
            let url = Constants.AddScenario;
            let postParams = {
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.project_id,
                name:this.state.scenarioName,
                // tags:this.state.scenarioTags,
                tags:JSON.stringify(tagsArr),
                description:this.state.description,
                actions:JSON.stringify(this.state.stepsArr),
            }

            if(this.props.isEdit){
                url = Constants.EditScenario;
                postParams.scenarioId = this.props.scenarioId;
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
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.props.hideAddEditScenario(true);
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    this.setState({
                        stepsError:data.responseMessage,
                        showLoader:false
                    });

                    setTimeout(function(){
                        this.setState({stepsError:""});
                    }.bind(this),Constants.WRNG_MSG_TIMEOUT);
                }
            });
        }
    }

    handleRefreshActionElements = () =>{
        this.getElementList();
    }

    render(){
        return(
            <div  id="scrollLayout">
                <CustomContainer>
                    {
                        this.state.showLoader && 
                        <LoaderLayout>
                            <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                        </LoaderLayout>
                    }
                    {
                        this.state.componentDidMountFlag &&
                        <CardWrapper>
                            <ActionHeadingLayout>
                                <BackButtonIcon onClick={this.handleCreateScenarioClose}/> 
                                <CreateActionHeading>
                                    {this.props.isEdit?"Edit Scenario":"Create New Scenario"}
                                </CreateActionHeading>
                            </ActionHeadingLayout>

                            <CreateActionLayout>
                                <TopCard>
                                    <CustomRow>
                                        <CustomCol md={6}>
                                            <FieldSetScenario>
                                                <InputLabelScenario>Scenario Name</InputLabelScenario>
                                                <InputFieldBorderScenario 
                                                    placeholder="Scenario Name"
                                                    name="scenarioName"
                                                    value={this.state.scenarioName}
                                                    onChange={this.handleChange}
                                                />
                                                {
                                                    !isEmptyVariable(this.state.scenarioNameError) && 
                                                    <ErrorSpanAction>{this.state.scenarioNameError}</ErrorSpanAction>
                                                }
                                            </FieldSetScenario>
                                        </CustomCol>

                                        <CustomCol md={6}>
                                            <FieldSetScenario>
                                                <InputLabelScenario>Tags</InputLabelScenario>
                                                {/* <InputFieldBorderScenario 
                                                    placeholder="Tags"
                                                    name="scenarioTags"
                                                    value={this.state.scenarioTags}
                                                    onChange={this.handleChange}
                                                /> */}
                                                <CreatableSelect
                                                    isMulti
                                                    placeholder="Add Tags"
                                                    styles={epicCustomStyles}
                                                    value={this.state.tagsSelectedDD}
                                                    onChange={this.handleTagChange}
                                                    options={this.state.tagsMasterDD}
                                                    classNamePrefix = "scenario-tags"
                                                    // components={{
                                                    //     IndicatorsContainer: this.returnNullComponent,
                                                    // }}
                                                />
                                            </FieldSetScenario>
                                        </CustomCol>
                                    </CustomRow>
                                    <CustomRow>
                                    <CustomCol md={6}>
                                        <FieldSetScenario>
                                            <InputLabelScenario>Description</InputLabelScenario>
                                            <TextareaFieldBorder 
                                                placeholder="Description"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                                minHeight="80px"
                                                borderColor="#bbb"
                                            />
                                        </FieldSetScenario>
                                    </CustomCol>
                                </CustomRow>
                                </TopCard>

                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided) => (
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
                                                                    {
                                                                        item.type === "custom" &&
                                                                        <CustomCol5 md="5">
                                                                            <ActionOuterWrapper>
                                                                                <StepIndex>{(index+1)}</StepIndex>
                                                                                <FieldWrapper marginLeft={"10px"}>
                                                                                    <FieldLabel>Custom Action</FieldLabel>
                                                                                    {/* <DropDownSearchCA 
                                                                                        placeholder={item.customActionName}
                                                                                        customActionList = {this.state.customActions}
                                                                                        onDropDownItemClick = {this.onCustomActionDropDownItemClick}
                                                                                        dropDownId = {index}
                                                                                        project_id = {this.state.project_id}
                                                                                    /> */}
                                                                                    <ReactSelectDropdown
                                                                                        placeholder={item.customActionName}
                                                                                        selectedDDObj= {{
                                                                                            actionName:item.customActionName,
                                                                                            actionId:item.customActionId
                                                                                        }}
                                                                                        handleReactSelectClose={this.onCustomActionDropDownItemClick}
                                                                                        selectDropdownArr={this.state.customActions}
                                                                                        label={"actionName"}
                                                                                        value={"actionId"}
                                                                                        dropDownId = {index}
                                                                                    />
                                                                                    {
                                                                                        !isEmptyVariable(item.customActionError) &&
                                                                                        <ErrorSpanAction>{item.customActionError}</ErrorSpanAction>
                                                                                    }
                                                                                </FieldWrapper>
                                                                            </ActionOuterWrapper>
                                                                        </CustomCol5>
                                                                    }
                                                                    {
                                                                        item.type === "primitive" &&
                                                                        <CustomCol5 md="4">
                                                                            <ActionOuterWrapper>
                                                                                <StepIndex>{(index+1)}</StepIndex>
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
                                                                    }
                                                                    {
                                                                        item.type === "primitive" && item.isElementReq === "Y" &&
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
                                                                        item.type === "primitive" && (item.isNameReq === "Y" || item.isValueReq === "Y") &&
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
                                
                                <ButtonsLayouts>
                                    <AddButtonsLayouts>
                                        <AddNewStepLayout onClick={this.addNewStep}>
                                            <AddPlusIcon />
                                            <AddNewText>Add New Step</AddNewText>
                                        </AddNewStepLayout>
                                        <AddNewStepLayout style={{marginLeft:"20px"}} onClick={this.addCustomAction}>
                                            <AddPlusIcon />
                                            <AddNewText>Add Custom Action</AddNewText>
                                        </AddNewStepLayout>
                                    </AddButtonsLayouts>
                                    <AddNewStepLayout style={{marginLeft:"20px"}} onClick={this.showAddActionModalFunc}>
                                        <AddPlusIcon />
                                        <AddNewText>Create New Custom Action</AddNewText>
                                    </AddNewStepLayout>
                                </ButtonsLayouts>

                                {
                                    !isEmptyVariable(this.state.stepsError) && 
                                    <ErrorSpanAction
                                        style={{
                                            display:"block"
                                        }}
                                    >{this.state.stepsError}</ErrorSpanAction>
                                }

                            </CreateActionLayout>
                            <CancelBtnAction  as="button" onClick={this.handleCreateScenarioClose}>Cancel</CancelBtnAction>
                            <SaveBtn as="button" onClick={this.handleCreateScenario}>Save Scenario</SaveBtn>
                        </CardWrapper>
                    }

                </CustomContainer>

                <AddActionDialog 
                    showAddActionModal={this.state.showAddActionModal}
                    handleAddActionClose={this.handleAddActionClose}
                    project_id = {this.state.project_id}
                    elementsList = {this.state.elementsList}
                    testParamsList = {this.state.testParamsList}
                    primitiveActionDDArr = {this.primitiveActionDDArr}
                    onSaveClickListener = {this.onSaveClickListener}
                />

                <ReactSelectSearchDialog
                    placeholder={this.state.selectedVarName}
                    selectDropdownArr = {this.state.dialogType === "testParam"?this.state.testParamsList:this.state.elementsList}
                    selectedDDObj= {{
                        elementName:this.state.selectedVarName,
                        elementId:this.state.selectedVarId,
                    }}
                    dropDownId = {this.state.selectedIndex}
                    dialogType = {this.state.dialogType}
                    inputType = {this.state.inputType}
                    projectId = {this.state.project_id}
                    label={this.state.dialogType === "testParam"?"testParamName":"elementName"}
                    value={this.state.dialogType === "testParam"?"testParamId":"elementId"}
                    handleReactSelectSaveClose={this.handleReactSelectSaveClose}
                    getElementList={this.getElementList}
                    getTestParamsList={this.getTestParamsList}

                    showReactSelectSearchDialog = {this.state.showReactSelectSearchDialog}
                    handleReactSelectSearchDialogClose = {this.handleReactSelectSearchDialogClose}
                    
                />
            </div>
        );
    }
}

export default AddScenario;