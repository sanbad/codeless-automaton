import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ScenarioSection,MainContainer,LoaderLayout,TableCardLayout,BootstrapModal,CancelBtnDialog,
    TableCard,SearchIcon,ClearSearchText,SearchLayout,SaveBtn,FieldSetRoundSearch,InputFieldRoundSearch,
    AddNewLayout,EmptyCard,EmptyCardAddNewLayout,CustomText,CustomContainerEmptyLayout,InfoSpan
} from './elements.style';
import {CustomContainer,CardHeadingLayout,ErrorSpan,
    CardHeading,Table,     FieldSet,InputFieldBorder,InputLabel,
    AddNewBtn,CustomRow,CustomCol,ArrowUpIcon,ArrowDownIcon, FlexLayoutCenterJustified, PageCountSpan} from '../../commonComponents/Global/common.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'
import TableDropDown from '../../commonComponents/TableDropDown'
import ResultsizeDropDown from '../../commonComponents/DropDownRegularResultSize'
import {getLocalStorageVariables,isEmptyVariable,sortTable,
    isEmptyArray} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';
import {Delete} from '@styled-icons/material/Delete';
import {EditAlt} from '@styled-icons/boxicons-solid/EditAlt';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../../commonComponents/pagination';
import AlertDialog from '../../commonComponents/AlertDialog';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

import SpinnerLoader from 'react-loader-spinner';

const userDetails  = getLocalStorageVariables();

const sortName  = "elementName";
const sortValue = "elementValue";
const sortUseCount = "elementUseCount";

class Elements extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPageNo: 1,
            projectId:this.props.match.params.id,
            projectDetails:{},
            showLoader:false,
            elementsList:"",
            totalCount:0,
            projectName:"",
            searchElementNameKey:"",
            apiSearchKey:"",
            componentDidMountFlag:false,
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
            resultSizeArr: Constants.RESULT_SIZE_ARR,
            sort: "",
			sortDir: "",

            showAddElementModal:false,

            errors:[],
            elementName:'',
            elementValue:'',

            isEdit:false,
            elementId:"",

            showAlertDialog:false,
            alertDialogMessage:"",
            deleteElementId:"",
            showAlertDialogInfo:false,
            alertDialogMessageInfo:"",
        }
    }

    componentDidMount(){
        this.getElementList();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onEnterBtnPress = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            if(!isEmptyVariable(this.state.searchElementNameKey)){
                this.setState({currentPageNo:1},()=>{
                    this.getElementList();
                });
            }
        }
    }
    onEnterBtnPressSave = (e) => {
        var code = e.keyCode || e.which;
        if(code === 13){
            this.addElement(e);
        }
    }

    searchElementName = () => {
        if(!isEmptyVariable(this.state.searchElementNameKey)){
            this.setState({currentPageNo:1},()=>{
                this.getElementList();
            });
        }
    }

    resetFilters = () => {
        this.setState({
            currentPageNo: 1,
            searchElementNameKey:"",
            resultSize:Constants.DEFAULT_RESULT_SIZE,
            resultSizePlaceholder:Constants.DEFAULT_RESULT_SIZE,
        },()=>{
            this.getElementList();
        })
    }

    resultSizeDropdownClick = (item, selectedIndex) => {
		this.setState(
			{
                currentPageNo:1,
				resultSize: item.label,
				resultSizePlaceholder: item.label,
			},
			() => {
				this.getElementList();
			}
		);
	};

    handleAddElementClose = () => this.setState({showAddElementModal:false});
    handleAddElementShow = () => this.setState(
        {
            showAddElementModal:true,
            elementName:'',
            elementValue:'', 
            errors:[],
            isEdit:false,
            elementId:""
        });
    
    sortTableLocal = (sortColumn) => {
        let sortObj = sortTable(sortColumn, this.state.sort, this.state.sortDir);

        this.setState(
            {
                sort: sortObj.sortTemp,
                sortDir: sortObj.sortDirTemp,
            },
            () => {
                this.getElementList();
            }
        );
    };

    openEditDialog = (item) =>{
        this.setState(
        {
            showAddElementModal:true,
            elementName:item.elementName,
            elementValue:item.elementValue, 
            errors:[],
            isEdit:true,
            elementId:item.elementId
        });
    }

    onClickItem = (label,item) =>{
        if(label === "Edit"){
            this.openEditDialog(item);
        }
        else if(label === "Delete"){
            this.openDeleteDialog(item,label);
        }
    }

    openDeleteDialog =(item,label)=>{
        this.setState(
        {
            deleteElementId:item.elementId,
            showAlertDialog:true,
            alertDialogMessage:"Are you sure you want to delete "+item.elementName+"?"
        });
    }
    
    handleAlertDialogCloseInfo = () => {
        this.setState(
        {
            showAlertDialogInfo:false,
            alertDialogMessageInfo:""
        });
    }

    handleAlertDialogClose = () =>{
        this.setState(
        {
            deleteElementId:"",
            showAlertDialog:false,
            alertDialogMessage:""
        });
    }

    /********************* API CALLS **********************/
    getElementList = () => {
        this.setState({
            showLoader:true,
        });
        fetch(Constants.ElementList,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                search:this.state.searchElementNameKey,
                pageNo: this.state.currentPageNo,
                resultsize:this.state.resultSize,
                sort: this.state.sort,
                sortDir: this.state.sortDir,
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    pageNo:this.state.currentPageNo,
                    totalCount:data.data.count,
                    elementsList:data.data.result,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchElementNameKey,
                    projectDetails:data.data.projectDetails

                })
            }else{
                this.setState({
                    elementsList:"",
                    totalCount:0,
                    projectName:data.title,
                    showLoader:false,
                    componentDidMountFlag:true,
                    apiSearchKey:this.state.searchElementNameKey
                })
            }
        });
    }

    onChangePage = (page) => {
        // update state with new page of items
        if(page !== this.state.currentPageNo){
            this.setState({
                showLoader:true,
            })
            fetch(Constants.ElementList,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams(
                {
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    elementName:this.state.searchElementNameKey,
                    pageNo: page,
                    resultsize:this.state.resultSize,
                    sort: this.state.sort,
                    sortDir: this.state.sortDir,

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
                        currentPageNo:page,
                        elementsList:data.data.result,
                        totalCount:data.data.count,
                        showLoader:false,

                    });
                }else{
                    this.setState({
                        currentPageNo:page,
                        elementsList:"",
                        totalCount:0,
                        showLoader:false,
                    });
                }
            });
        }
    }

    addElement = (e) =>{
        e.preventDefault();
        var error_flag = false;
        let errors = {};

        if(isEmptyVariable(this.state.elementName))
        {
            error_flag = true;
            errors['elementName'] = "Please enter element name!";
        }

        if(isEmptyVariable(this.state.elementValue))
        {
            error_flag = true;
            errors['elementValue'] = "Please enter element value!";
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
            fetch(Constants.AddElement,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    elementName:this.state.elementName,
                    elementValue:this.state.elementValue,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    // window.location=Constants.WINDOW_LOCATION;
                }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showAddElementModal:false
                    },()=> {
                        this.getElementList();
                    })
                }else{
                    errors['elementError'] = data.responseMessage;

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

    editElement = (e) => {
        e.preventDefault();
        var error_flag = false;
        let errors = {};
        
        if(isEmptyVariable(this.state.elementName))
        {
            error_flag = true;
            errors['elementName'] = "Please enter element name!";
        }
        if(isEmptyVariable(this.state.elementValue))
        {
            error_flag = true;
            errors['elementValue'] = "Please enter element value!";
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
            fetch(Constants.EditElement,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    projectNo:this.state.projectId,
                    elementName:this.state.elementName,
                    elementValue:this.state.elementValue,
                    elementId:this.state.elementId,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    this.setState({
                        showAddElementModal:false
                    },()=> {
                        this.getElementList();
                    })
                }else{
                    errors['elementError'] = data.responseMessage;

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

    deleteElement = () =>{
        let url = Constants.DeleteElement;
        fetch(url,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams(
            {
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                projectNo:this.state.projectId,
                elementId:this.state.deleteElementId
            })
        })
        .then(response => { return response.json(); } )
        .then(data =>
        {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4)
            {
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            } else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({
                    deleteElementId:"",
                    showAlertDialog:false,
                    alertDialogMessage:""
                },()=>{
                    this.getElementList();
                });
            }else{
                this.setState({
                    deleteElementId:"",
                    showAlertDialog:false,
                    alertDialogMessage:"",
                    showAlertDialogInfo:true,
                    alertDialogMessageInfo:data.responseMessage
                });
            }
        });
    }


    render(){
        const {projectDetails} = this.state;
        const actionArr = [
            {
                label:"Edit",
                icon:<EditAlt/>
            },
            {
                label:"Delete",
                icon:<Delete/>
            },
        ];
        let start = this.state.resultSize*(this.state.currentPageNo - 1);

        let end = this.state.resultSize+start;

        if(end > this.state.totalCount){
            end = this.state.totalCount;
        }

        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <ScenarioSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar 
                                showLeftMenu={true}
                                title={this.state.projectDetails.title}
                                projectNo={this.state.projectId}
                                projectDetails={this.state.projectDetails}
                            />
                            {
                                this.state.showLoader &&
                                <LoaderLayout>
                                    <SpinnerLoader type={Constants.LOADER_TYPE} color={Constants.LOADER_COLOR} height={50} width={50} />
                                </LoaderLayout>
                            }
                            {
                                // Need to check component did mount flag, other wise until api is called,
                                // it shows no items found flag
                                this.state.componentDidMountFlag &&
                                !(isEmptyArray(this.state.elementsList) &&
                                isEmptyVariable(this.state.apiSearchKey)) &&
                                <CustomContainer>
                                {
                                    // dont display when action and search key both are empty
                                    !(isEmptyVariable(this.state.elementsList) &&
                                    isEmptyVariable(this.state.apiSearchKey)) &&
                                    <CustomRow>
                                        <CustomCol md="6">
                                            <SearchLayout>
                                                <ResultsizeDropDown
                                                    itemsArr={this.state.resultSizeArr}
                                                    placeholder={this.state.resultSizePlaceholder}
                                                    name={"label"}
                                                    onDropDownItemClick={this.resultSizeDropdownClick}
                                                    disableShadowAddBorder={true}
                                                />
                                                <FieldSetRoundSearch>
                                                    <InputFieldRoundSearch 
                                                        type="text"
                                                        placeholder="Search Element Name"
                                                        name="searchElementNameKey" 
                                                        onChange={this.handleChange} 
                                                        value={this.state.searchElementNameKey}
                                                        onKeyPress={this.onEnterBtnPress}
                                                    />
                                                    <SearchIcon 
                                                        onClick = {this.searchElementName}
                                                    />
                                                </FieldSetRoundSearch>  
                                                <ClearSearchText onClick={this.resetFilters}>{Constants.CLEAR_SEARCH}</ClearSearchText>
                                            </SearchLayout>
                                        </CustomCol>
                                        <CustomCol md="3">
                                        </CustomCol>
                                        <CustomCol md="3">
                                            {
                                                projectDetails.writeScenariosAndAction === "Y" &&
                                                <AddNewLayout>
                                                    <AddNewBtn
                                                        as="button"
                                                        onClick = {this.handleAddElementShow}
                                                    >Add New Element</AddNewBtn>
                                                </AddNewLayout>
                                            }
                                        </CustomCol>
                                    </CustomRow>
                                }

                                {
                                    !isEmptyArray(this.state.elementsList) &&
                                    <TableCardLayout>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th width="6%">No</th>
                                                    <th width="30%" onClick={this.sortTableLocal.bind(this, sortName)}>
                                                        <div className="sort-header">
                                                            Element Name
                                                            <span
                                                                className={
                                                                    this.state.sort === sortName ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th width="45%" onClick={this.sortTableLocal.bind(this, sortValue)}>
                                                        <div className="sort-header">
                                                            Element Value
                                                            <span
                                                                className={
                                                                    this.state.sort === sortValue ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th width="12%" onClick={this.sortTableLocal.bind(this, sortUseCount)}>
                                                        <div className="sort-header">
                                                            Usage
                                                            <span
                                                                className={
                                                                    this.state.sort === sortUseCount ? "material-icons" : "material-icons hide-sort-arrow"
                                                                }
                                                            >
                                                                {this.state.sortDir === "asc" ? < ArrowUpIcon/> : < ArrowDownIcon />}
                                                            </span>
                                                        </div>
                                                    </th>
                                                    {
                                                        projectDetails.writeScenariosAndAction === "Y" &&
                                                        <th width="7%"></th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                !isEmptyVariable(this.state.elementsList) &&
                                                this.state.elementsList.map((item,idx) => {
                                                    return <tr>
                                                        {/* <td>{((this.state.currentPageNo - 1) * Constants.RESULT_SIZE_PAGINATION) + (++idx)}</td> */}
                                                        <td>{((this.state.currentPageNo - 1) * this.state.resultSize) + (++idx)}</td>
                                                        <td>{item.elementName}</td>
                                                        <td>{item.elementValue}</td>
                                                        <td>{item.elementUseCount}</td>
                                                        {
                                                            projectDetails.writeScenariosAndAction === "Y" &&
                                                            <td><TableDropDown 
                                                                actionArr={actionArr}
                                                                item = {item}
                                                                onClickDropDownItem={this.onClickItem}
                                                            /></td>
                                                        }
                                                    </tr>
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                    </TableCardLayout>
                                }
                                {
                                    
                                }
                                <FlexLayoutCenterJustified>
                                    {
                                        (this.state.totalCount > this.state.elementsList.length) && 
                                        <Pagination 
                                            totalLength ={this.state.totalCount} 
                                            items={this.state.elementsList} 
                                            onChangePage={this.onChangePage} 
                                            currentPageNo = {this.state.currentPageNo}
                                            pageSize={this.state.resultSize}
                                            initialPage={this.state.currentPageNo}
                                            />
                                    }
                                    {
                                        this.state.totalCount <= this.state.elementsList.length &&
                                        <div></div>
                                    }
                                    <PageCountSpan>
                                        {(start+1)+"-"+end+" of "+this.state.totalCount}
                                    </PageCountSpan>
                                </FlexLayoutCenterJustified>

                                </CustomContainer>
                            }
                            {
                                this.state.componentDidMountFlag && isEmptyArray(this.state.elementsList) &&
                                <CustomContainerEmptyLayout
                                    paddingValue={isEmptyVariable(this.state.apiSearchKey)?"25px":"0px 25px 25px"}
                                >
                                    <EmptyCard>
                                        <CustomRow>
                                            <CustomCol md={12}>
                                                <CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey)?
                                                    Constants.ELEMENTS_EMPTY_WARNING
                                                    :
                                                    Constants.ELEMENTS_EMPTY_SEARCH_WARNING
                                                }
                                                </CustomText>
                                                {
                                                    isEmptyVariable(this.state.apiSearchKey) &&
                                                    <EmptyCardAddNewLayout>
                                                        <AddNewBtn
                                                            as="button"
                                                            onClick = {this.handleAddElementShow}
                                                        >Add New Element</AddNewBtn>
                                                    </EmptyCardAddNewLayout>
                                                }
                                            </CustomCol>
                                        </CustomRow>
                                    </EmptyCard>
                                </CustomContainerEmptyLayout>
                            }
                        </MainContainer>

                        {/* Add/Edit Element Dialog */}
                        <BootstrapModal show={this.state.showAddElementModal} onHide={this.handleAddElementClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{this.state.isEdit?"Edit":"Add"} Element</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FieldSet>
                                    <InputLabel>Element Name</InputLabel>
                                    <InputFieldBorder 
                                        placeholder="Element Name"
                                        name="elementName"
                                        onChange={this.handleChange}
                                        value={this.state.elementName}
                                    />
                                    <ErrorSpan>{this.state.errors.elementName}</ErrorSpan>
                                </FieldSet>
                                <FieldSet>
                                    <InputLabel>Element Value</InputLabel>
                                    <InputFieldBorder 
                                        placeholder="Element Value"
                                        name="elementValue"
                                        onChange={this.handleChange}
                                        value={this.state.elementValue}
                                        onKeyPress={this.onEnterBtnPressSave}
                                    />
                                    <InfoSpan>{`Please use <<data>> to parameterize element`}</InfoSpan>
                                    <ErrorSpan>{this.state.errors.elementValue}</ErrorSpan>
                                </FieldSet>
                                {
                                    !isEmptyVariable(this.state.errors.elementError) &&
                                    <ErrorSpan>{this.state.errors.elementError}</ErrorSpan>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.handleAddElementClose}
                                >Cancel</CancelBtnDialog>
                                <SaveBtn
                                    as="button"
                                    onClick = {this.state.isEdit?this.editElement:this.addElement}
                                >Save Element</SaveBtn>
                            </Modal.Footer>
                        </BootstrapModal>

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialog}
                            handleAlertDialogClose={this.handleAlertDialogClose}
                            type= {Constants.ALERT_TYPE_WARNING}
                            alertDialogHeading="Delete Element"
                            alertDialogMessage={this.state.alertDialogMessage}
                            proceedBtnClick={this.deleteElement}
                            proceedBtnLabel={ Constants.ELEMENTS_DELETE_BUTTON }
                        />

                        <AlertDialog 
                            showAlertDialog={this.state.showAlertDialogInfo}
                            handleAlertDialogClose={this.handleAlertDialogCloseInfo}
                            type= {Constants.ALERT_TYPE_ALERT}
                            alertDialogMessage={this.state.alertDialogMessageInfo}
                            proceedBtnClick={this.handleAlertDialogCloseInfo}
                            proceedBtnLabel={ Constants.ALERT_TYPE_OKAY_LABEL }
                        />

                    </ScenarioSection>
                </div>
            </Router>
        );
    
    }
}

export default Elements;