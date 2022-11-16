import React, { Component } from "react";
import AnimateHeight from 'react-animate-height';
import {AccordianRow,Accordian,AccordianTitleCol,AccordianTitle,AccordianContentCol,TypeSpan,
    PlusIcon,MinusIcon,TitleTextLayout,TotalSkippedActions,CrossLayout,TotalSuccessActions,
    BootstrapModal,TableDetails,TableRow,TableData,ErrImage
} from './faq.style'
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Constants from '../../commonComponents/constants';
import {Table,     Th} from '../../commonComponents/Global/common.style';
import {isEmptyVariable,ifEmptyReturnStr} from '../../commonComponents/commonFunctions';

class AccordianCustom extends Component {
    constructor(props){
        super(props);
        this.state = { 
            isActive: false, 
            showErrorDetailsModal: false,
            errorDetails:"", 
        };
    }

    toggleVisibility = () =>
        this.setState({ isActive: !this.state.isActive });
    
    handleShowErrorDialog = (item)  =>{
        this.setState({ showErrorDetailsModal: true, errorDetails:item });
    }
    handleDetailsClose = ()  =>{
        this.setState({ showErrorDetailsModal: false });
    }

    render(){
        return(
            <AccordianRow>
                <Accordian>

                    <AccordianTitleCol isActive={this.state.isActive} 
                    className="actionTopSticky"
                    onClick={this.toggleVisibility}>
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
                        {
                            this.state.isActive &&
                                <MinusIcon/>
                        }
                        {
                            !this.state.isActive &&
                            <PlusIcon/>
                        }
                    </AccordianTitleCol>

                    <AnimateHeight height={this.state.isActive?"auto":"0"}>
                        <AccordianContentCol isActive={this.state.isActive}>
                            <Table style={{marginBottom:"0px"}} lastchildcheck>
                                <thead>
                                    <tr className="stepTopSticky">
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
                                            if(item.elementTestParamId === -1){
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
                                            if(item.valueTestParamId === -1){
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
                    </AnimateHeight>
                </Accordian>
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
                            src={isEmptyVariable(this.state.errorDetails.image)?'/assets/default-propic.png':Constants.ImageBaseUrl+(this.state.errorDetails.image.split("output_images/")[1])}
                        />
                    </Modal.Body>
                </BootstrapModal>
            </AccordianRow>
            
        );
    }
}

export default AccordianCustom;
