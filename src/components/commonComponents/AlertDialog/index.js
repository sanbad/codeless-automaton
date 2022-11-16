

import React from 'react';
import {BootstrapModal,CancelBtnDialog,
    ProceedBtnDialog,WarningDialogLayout,WarningDialogIcon,WarningDialogInfoIcon,
    WarningDialogHeading,
    WarningDialogPara,WarningButtonLayout} from './alertdialog.style';
import {Modal} from 'react-bootstrap';
import * as Constants from '../../commonComponents/constants';
import {isEmptyVariable} from '../../commonComponents/commonFunctions';

class AlertDialog extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        let color = "#38b2fe";
        let hoverColor = "#016eb2";

        if(this.props.type === Constants.ALERT_TYPE_WARNING){
            color="#ff0000";
            hoverColor="#ff4d4d";
        }

        return (
            <BootstrapModal show={this.props.showAlertDialog} onHide={this.props.handleAlertDialogClose}>
                <Modal.Body>
                    <WarningDialogLayout>
                        {
                            this.props.type === Constants.ALERT_TYPE_WARNING &&
                            <WarningDialogIcon />
                        }
                        {

                            (this.props.type === Constants.ALERT_TYPE_ALERT ||
                            this.props.type === Constants.ALERT_TYPE_INFO) &&
                            <WarningDialogInfoIcon />
                        }
                        {
                            // !this.props.type === Constants.ALERT_TYPE_ALERT &&
                            !isEmptyVariable(this.props.alertDialogHeading) &&
                            <WarningDialogHeading>
                                {this.props.alertDialogHeading}
                            </WarningDialogHeading>
                        }
                        <WarningDialogPara>
                            {this.props.alertDialogMessage}
                        </WarningDialogPara>

                        <WarningButtonLayout>
                            {
                                !(this.props.type === Constants.ALERT_TYPE_ALERT) &&
                                <CancelBtnDialog
                                    as="button"
                                    onClick={this.props.handleAlertDialogClose}
                                >Cancel</CancelBtnDialog>
                            }
                            
                            <ProceedBtnDialog
                                as="button"
                                onClick = {this.props.proceedBtnClick}
                                saveBtnColor = {color}
                                saveBtnHoverColor = {hoverColor}
                                marginLeft={
                                    this.props.type === Constants.ALERT_TYPE_ALERT
                                    ?"0px"
                                    :"10px"
                                }
                            >
                            {this.props.proceedBtnLabel}
                            </ProceedBtnDialog>
                        </WarningButtonLayout>
                    </WarningDialogLayout>
                </Modal.Body>
            </BootstrapModal>
        );
    }
}

export default AlertDialog;