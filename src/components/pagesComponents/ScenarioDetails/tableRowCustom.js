import React, { Component } from "react";
import {TypeSpan} from './scenariodetails.style'
import {Table} from '../../commonComponents/Global/common.style';
import {isEmptyVariable} from '../../commonComponents/commonFunctions';

class AccordianCustom extends Component {
    constructor(props){
        super(props);
        this.state = { isActive: false };
    }

    componentDidMount(){
        this.setState({
            isActive: this.props.allExpandFlag
        })
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props)){
            this.setState({
                isActive: this.props.allExpandFlag
            })
        }
    }

    toggleVisibility = () =>
        this.setState({ isActive: !this.state.isActive });

    render(){
        return(
            <>
                {
                    this.props.type !== "primitive" &&
                    <tbody onClick={this.toggleVisibility}><tr className="topStickyCustomAction" style={{cursor:"pointer"}}>
                        <td className="customaction-td">{this.props.actionArrIndex+1}</td>
                        <td colspan="4" className="customaction-td">
                            {this.props.title}

                            <TypeSpan
                                spanBg = {process.env.REACT_APP_PRIMARY_COLOR+"22"}
                            >Custom Action</TypeSpan>
                        </td>
                    </tr></tbody>
                }
                {
                    !isEmptyVariable(this.props.description) &&
                    this.props.description.map((item,idx) => {
                        let elementTestParam = "";
                        if(item.isElementParameterized === "Y"){
                            if(isEmptyVariable(item.elementTestParamId) || item.elementTestParamId === -1){
                                elementTestParam = item.elementTestData;
                            }else{
                                elementTestParam = <span style={{color:"#2e8c03"}}>{"{"+item.elementTestParamName+"}"}</span>;
                            }
                        }
                        let valueTestParam = "";
                        if(isEmptyVariable(item.valueTestParamId) || item.valueTestParamId === -1){
                            valueTestParam = item.value;
                        }else{
                            valueTestParam = <span style={{color:"#2e8c03"}}>{"{"+item.valueTestParamName+"}"}</span>;
                        }
                        return <tbody hidden={this.props.type === "primitive"?"":(this.state.isActive?"":"hidden")}><tr>
                            <td style={{fontSize:12.5}}>
                                {this.props.type === "primitive"?this.props.actionArrIndex+1:(this.props.actionArrIndex+1)+"."+(idx+1)}
                            </td>
                            <td style={{fontSize:12.5}}>{item.stepMasterDisplayName}</td>
                            <td style={{fontSize:12.5}}>
                                {
                                    isEmptyVariable(item.elementName)
                                    ?"-"
                                    :item.elementName

                                }
                                {
                                    !isEmptyVariable(item.elementValue) &&
                                    <span className="valueSpan">{item.elementValue}</span>
                                }
                                {/* {
                                    !isEmptyVariable(elementTestParam) &&
                                    <br/>
                                } */}
                                {
                                    !isEmptyVariable(elementTestParam) &&
                                    elementTestParam
                                }
                            </td>
                            <td style={{fontSize:12.5}}>{isEmptyVariable(item.nameParam)?"-":item.nameParam}</td>
                            <td style={{fontSize:12.5}}>{isEmptyVariable(valueTestParam)?"-":valueTestParam}</td>
                        </tr></tbody>
                    })
                }
            </>
        );
    }
}

export default AccordianCustom;
