import React, { useEffect, useState } from 'react';
import {BootstrapModal, CancelBtnDialog, SaveBtn} from './scenarios.style';
import {Modal} from 'react-bootstrap';
import { ErrorSpan, FieldSet, InputFieldBorder, 
    InputLabel } from '../../commonComponents/Global/common.style';
import { getLocalStorageVariables, isEmptyVariable } from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';

const CloneDialog = (props) => {
    const [scenarioName,handleInputChange] = useState("");
    // const [isLoading,setLoading] = useState(false);
    const [error,updateError] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        handleInputChange(value);
    }

    const handleCloneScenario = () => {
        const userDetails  = getLocalStorageVariables();
        // setLoading(true);
        let isError = false;

        if(isEmptyVariable(scenarioName)){
            isError = true;
            updateError("Please enter scenario name")
            // setLoading(false);
        }

        if(isError){
            setTimeout(()=>{
                updateError("")
            },5000)
        }else{

            fetch(Constants.CloneScenario,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    scenarioId:props.scenarioId,
                    scenarioName:scenarioName,
                })
            })
            .then(response => { return response.json(); } )
            .then(data =>
            {
                if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    props.handleCloseCloneDialog(true)
                }else if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }else{
                    updateError(data.responseMessage)
                }
            });
        }

    }

    // useEffect(()=>{

    // },[props.showCloneDialogFlag]);

    return(
        <BootstrapModal show={props.showCloneDialogFlag} onHide={props.handleCloseCloneDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Clone Scenario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FieldSet>
                    <InputLabel>Scenario Name*</InputLabel>
                    <InputFieldBorder 
                        placeholder="Scenario Name"
                        name="title"
                        onChange={handleChange}
                        value={scenarioName}
                    />
                    {
                        !isEmptyVariable(error) &&
                        <ErrorSpan>{error}</ErrorSpan>
                    }
                </FieldSet>
            </Modal.Body>
            <Modal.Footer>
                <CancelBtnDialog
                    as="button"
                    onClick={props.handleCloseCloneDialog}
                >Cancel</CancelBtnDialog>
                <SaveBtn
                    as="button"
                    onClick = {handleCloneScenario}
                >Clone Scenario</SaveBtn>
            </Modal.Footer>
        </BootstrapModal>
    )
}

export default CloneDialog;