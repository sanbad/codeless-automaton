import React, { Component } from "react";
import {AccordianRow,AccordianTitleCol,AccordianTitle,AccordianContentCol,TypeSpan,
    TitleTextLayout,TotalSkippedActions,CrossLayout,TotalSuccessActions,
    BootstrapModal,TableDetails,TableRow,TableData,ErrImage
} from './faq.style'
import {Modal} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Constants from '../../commonComponents/constants';
import {Table,     Th} from '../../commonComponents/Global/common.style';
import {isEmptyVariable,ifEmptyReturnStr, getLocalStorageVariables} from '../../commonComponents/commonFunctions';
import VideoDialog from './videoDialog';

class AccordianCustom extends Component {
    constructor(props){
        super(props);
        this.state = { 
            isActive: false, 
            showErrorDetailsModal: false,
            errorDetails:"", 
        };
    }

    showVideoDialog = (videoPath, scenarioName) => {
        this.setState({
            showVideoDialogFlag:true,
            videoPath:videoPath,
            selectedScenarioName:scenarioName
        })
    }

    handleVideoDialogClose = () => {
        this.setState({
            showVideoDialogFlag:false,
            videoPath:"",
            selectedScenarioName:"",
        })
    }
    
    handleShowErrorDialog = (item)  =>{
        const userDetails  = getLocalStorageVariables();

        fetch(Constants.GetVideoUrl,
        {
            method: "POST",
            mode:'cors',
            body: new URLSearchParams({
                email:userDetails.email,
                accessToken:userDetails.accessToken,
                videoPath:item.failedImage,
                executionMasterId:this.props.executionMasterId,
            })
        })
        .then(response => { return response.json(); } )
        .then(data => {
            if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                localStorage.clear();
                window.location=Constants.WINDOW_LOCATION;
            }
            else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                this.setState({ 
                    showErrorDetailsModal: true, 
                    errorDetails:{...item, s3TempLink:data.data}
                });
            }else{
            }
        });
        
    }
    handleDetailsClose = ()  =>{
        this.setState({ showErrorDetailsModal: false });
    }

    render(){
        return(
            <AccordianRow>
                <Accordion flush>
                    <Accordion.Item eventKey={this.props.eventKey}>
                        <Accordion.Header>
                        <AccordianTitleCol>
                            {
                                this.props.actionResult === "pass" &&
                                <TotalSuccessActions size="24px"/>
                            }
                            {
                                this.props.actionResult === "skip" &&
                                <TotalSkippedActions size="24px"/>
                            }
                            {
                                this.props.actionResult !== "pass" && this.props.actionResult!=="skip" &&
                                <CrossLayout size="24px">
                                    <div class="lineWrapper">
                                        <div class="firstLine"></div>
                                        <div class="secondLine"></div>
                                    </div>
                                </CrossLayout>
                            }
                            <TitleTextLayout>
                                <AccordianTitle>
                                    {this.props.title}
                                </AccordianTitle>
                                <TypeSpan
                                    spanBg = {this.props.type === "primitive"?"#eaeaea":"#d5ceff"}
                                >{this.props.type === "primitive"?"Step":"Custom Action"}</TypeSpan>
                            </TitleTextLayout>
                        </AccordianTitleCol>
                        </Accordion.Header>
                        <Accordion.Body>
                        <AccordianContentCol>
                            <Table style={{marginBottom:"0px"}} lastchildcheck>
                                <thead>
                                    <tr>
                                        <th width={"5%"} style={{fontSize:12}}></th>
                                        <th width={"20%"} style={{fontSize:12}}>Action</th>
                                        <th width={"30%"} style={{fontSize:12}}>Element</th>
                                        <th width={"18%"} style={{fontSize:12}}>Name</th>
                                        <th style={{fontSize:12}}>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    !isEmptyVariable(this.props.description) &&
                                    this.props.description.map((item) => {
                                        let name = item.stepMasterDisplayName;
                                        let element = "";
                                        let data = "";
                                        let nameParam = "";

                                        let elementTestParam = "";
                                        if(item.isElementParameterized === "Y"){
                                            if(isEmptyVariable(item.elementTestParamId) || item.elementTestParamId === -1){
                                                elementTestParam = item.elementTestData;
                                            }else{
                                                // elementTestParam = <span style={{color:"#2e8c03"}}>{"{"+item.elementTestParamName+"}"}</span>;
                                                //lets display the value directly instead of showing the param name
                                                elementTestParam = item.elementTestParamValue;
                                            }
                                        }

                                        if(item.isElement === "Y"){
                                            element = <>{item.elementName}<span className="valueSpan">{" ("+item.elementValue+")"}</span></>;
                                        }

                                        if(item.isValue === "Y"){
                                            if(isEmptyVariable(item.valueTestParamId) || item.valueTestParamId === -1){
                                                data = item.value;
                                            }else{
                                                data = item.valueTestParamValue;
                                            }
                                        }

                                        if(item.isName === "Y"){
                                            nameParam = item.nameParam;
                                        }
                                        
                                        return <tr>
                                            <td>
                                            {
                                                item.result === "pass" &&
                                                <TotalSuccessActions size="20px"/>
                                            }
                                            {
                                                item.result === "fail" &&
                                                <CrossLayout size="20px" barSize="15px" top="9px">
                                                    <div class="lineWrapper">
                                                        <div class="firstLine"></div>
                                                        <div class="secondLine"></div>
                                                    </div>
                                                </CrossLayout>
                                            }
                                            {
                                                item.result !== "pass" && item.result !== "fail" &&
                                                <TotalSkippedActions size="20px"/>
                                            }
                                            </td>
                                            <td>
                                                {ifEmptyReturnStr(name,"-")}
                                                <br/>
                                                {
                                                    !isEmptyVariable(item.error) &&
                                                    <button onClick={this.handleShowErrorDialog.bind(this,item)}>View Error</button>
                                                }
                                                {
                                                    !isEmptyVariable(item.screenshot) &&
                                                    <button onClick={this.showVideoDialog.bind(this,item.screenshot,item.stepMasterDisplayName)}>
                                                        View Screenshot
                                                    </button>
                                                }
                                            </td>
                                            <td>
                                                {ifEmptyReturnStr(element,"-")}
                                                {
                                                    !isEmptyVariable(elementTestParam) &&
                                                    <span className="valueSpan">{"<<data>>: "+elementTestParam}</span>
                                                }
                                            </td>
                                            <td>{ifEmptyReturnStr(nameParam,"-")}</td>
                                            <td>{ifEmptyReturnStr(data,"-")}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                        </AccordianContentCol>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                    {/* Show Support Modal Dialog */}
                <BootstrapModal show={this.state.showErrorDetailsModal} onHide={this.handleDetailsClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TableDetails>
                            <TableRow>
                                <TableData>StepName</TableData>
                                <TableData>:</TableData>
                                <TableData>{this.state.errorDetails.stepMasterDisplayName}</TableData>
                            </TableRow>
                            
                                <TableRow>
                                    <TableData>Element</TableData>
                                    <TableData>:</TableData>
                                    <TableData>
                                        {this.state.errorDetails.isElement === "Y" 
                                        ?
                                        this.state.errorDetails.elementName+" ("+this.state.errorDetails.elementValue+")"
                                        :"-"}
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>Name</TableData>
                                    <TableData>:</TableData>
                                    <TableData>
                                        {this.state.errorDetails.isName === "Y" 
                                        ?
                                        this.state.errorDetails.nameParam
                                        :"-"}
                                    </TableData>
                                </TableRow>
                                <TableRow>
                                    <TableData>Value</TableData>
                                    <TableData>:</TableData>
                                    <TableData>
                                        {this.state.errorDetails.isValue === "Y" 
                                        ?
                                        (this.state.errorDetails.valueTestParamId === -1
                                            ?this.state.errorDetails.value
                                            :this.state.errorDetails.valueTestParamValue)
                                        :"-"}
                                    </TableData>
                                </TableRow>
                            <TableRow>
                                <TableData style={{verticalAlign:"top"}}>Error</TableData>
                                <TableData style={{verticalAlign:"top"}}>:</TableData>
                                <TableData style={{verticalAlign:"top",color:"red"}}>{this.state.errorDetails.error}</TableData>
                            </TableRow>
                        </TableDetails>

                        <ErrImage 
                            src={isEmptyVariable(this.state.errorDetails.s3TempLink)?'/assets/default-propic.png':this.state.errorDetails.s3TempLink}
                        />
                    </Modal.Body>
                </BootstrapModal>
                <VideoDialog
                    showVideoDialogFlag = {this.state.showVideoDialogFlag}
                    executionMasterId = {this.props.executionMasterId}
                    scenarioName = {this.state.selectedScenarioName}
                    videoPath = {this.state.videoPath}
                    handleVideoDialogClose = {this.handleVideoDialogClose}
                    isImage = "Y"
                />
            </AccordianRow>
            
        );
    }
}

export default AccordianCustom;
