import React, { Component } from 'react';
import {BootstrapModal,BootstrapModalImg,BootstrapModalHeading,
    BootstrapModalPara,CancelBtnDialog,SaveBtn} from './notifications.style';
import {isEmptyVariable} from '../../commonComponents/commonFunctions';

import {Modal} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class Notificationmodal extends Component{
    constructor(props){
        super(props);
    }

    visitNotification = (targetId,e) => {
        e.preventDefault();
        window.open(
            targetId,
            '_blank'
        );
    }
   
    render(){
        return(
            <Router>
              
                <BootstrapModal show={this.props.showType20} onHide={this.props.handleCloseType20}>
                    <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    {
                        !isEmptyVariable(this.props.notificationList)?
                        <Modal.Body>
                        {
                            (!isEmptyVariable(this.props.notificationList) &&
                            !isEmptyVariable(this.props.notificationList[0].imagePath)) &&
                            <BootstrapModalImg src ={this.props.notificationList[0].imagePath} />
                        }
                        {
                            (!isEmptyVariable(this.props.notificationList) &&
                            !isEmptyVariable(this.props.notificationList[0].notification)) &&
                            <BootstrapModalHeading>{this.props.notificationList[0].notification} </BootstrapModalHeading>
                        }
                        {
                            (!isEmptyVariable(this.props.notificationList) &&
                            !isEmptyVariable(this.props.notificationList[0].description)) &&
                            <BootstrapModalPara>{this.props.notificationList[0].description} </BootstrapModalPara>
                        }
                        </Modal.Body>
                        :
                        null
                    }
                    <Modal.Footer>
                        <SaveBtn
                                as="button"
                                onClick = {this.props.handleCloseType20}
                        >OKAY</SaveBtn>
                    </Modal.Footer>
                </BootstrapModal>

                <BootstrapModal show={this.props.showType30} onHide={this.props.handleCloseType30}>
                    <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    {
                        !isEmptyVariable(this.props.notificationList)?
                        <Modal.Body>
                        {
                            (!isEmptyVariable(this.props.notificationList) &&
                            !isEmptyVariable(this.props.notificationList[0].imagePath)) &&
                            <BootstrapModalImg src ={this.props.notificationList[0].imagePath} />
                        }
                        {
                            (!isEmptyVariable(this.props.notificationList) &&
                            !isEmptyVariable(this.props.notificationList[0].notification)) &&
                            <BootstrapModalHeading>{this.props.notificationList[0].notification} </BootstrapModalHeading>
                        }
                        {
                            (!isEmptyVariable(this.props.notificationList) &&
                            !isEmptyVariable(this.props.notificationList[0].description)) &&
                            <BootstrapModalPara>{this.props.notificationList[0].description} </BootstrapModalPara>
                        }
                        </Modal.Body>
                        :
                        null
                    }
                    <Modal.Footer>
                        <CancelBtnDialog
                            as="button"
                            onClick={this.props.handleCloseType30}
                            >Close</CancelBtnDialog>
                        {
                            (!isEmptyVariable(this.props.notificationList) &&
                            !isEmptyVariable(this.props.notificationList[0].targetId))?
                            <SaveBtn
                                    as="button"
                                    onClick = {this.visitNotification.bind(this,this.props.notificationList[0].targetId)}
                            >Visit</SaveBtn>
                            :
                            <SaveBtn
                                    as="button"
                                    onClick = {this.props.handleCloseType30}
                            >Visit</SaveBtn>
                        }
                    </Modal.Footer>
                </BootstrapModal>
            </Router>
        );
    }
}

export default Notificationmodal;