import React from 'react';
import {BootstrapModal,CancelBtnDialog,
    ProceedBtnDialog,WarningDialogLayout,WarningDialogIcon,WarningDialogHeading,
    AlertFieldSet,AlertInputLabel,WarningDialogPara,WarningDialogInput,
    WarningButtonLayout,ErrorSpanAlert} from './alertinputdialog.style';
import {Modal} from 'react-bootstrap';
import * as Constants from '../../commonComponents/constants';

class AlertDialog extends React.Component {
    constructor(props){
        super(props);
    };

    render() {
        let color="#ff0000";
        let hoverColor="#ff4d4d";

        return (
            <BootstrapModal show={this.props.showAlertDialog} onHide={this.props.handleAlertDialogClose}>
                <Modal.Body>
                    <WarningDialogLayout>
                        
                        <WarningDialogIcon />

                        <WarningDialogHeading>
                            {this.props.alertDialogHeading}
                        </WarningDialogHeading>
                        
                        <WarningDialogPara>
                            {this.props.alertDialogMessage}
                        </WarningDialogPara>

                        <AlertFieldSet>
                            <AlertInputLabel>{this.props.alertDialogInputLabel}</AlertInputLabel>
                            <WarningDialogInput 
                                name="inputFieldDialog"
                                onChange={this.props.handleChange}
                                value={this.props.inputFieldValue}
                                type="password"
                            />
                            <ErrorSpanAlert>{this.props.errorSpan}</ErrorSpanAlert>
                        </AlertFieldSet>
                        

                        <WarningButtonLayout>
                            {
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
                                marginLeft="10px"
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