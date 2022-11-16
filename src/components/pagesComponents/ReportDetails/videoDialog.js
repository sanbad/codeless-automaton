import React, { useEffect, useState } from "react";
import { getLocalStorageVariables, isEmptyVariable } from "../../commonComponents/commonFunctions";
import * as Constants from '../../commonComponents/constants';
import {Modal} from 'react-bootstrap';
import styled from 'styled-components';

export const BootstrapModal = styled(Modal)`
    .modal-dialog{
        max-width: 750px;
        margin:20px auto;

        video{
            border:1px solid #ccc;
        }

        img{
            width:100%;
            border:1px solid #ccc;
        }
    }

    .modal-body{
        height:${props => props.isImage==="Y"?"calc(100vh - 120px)":"auto"};
        overflow:auto;
    }
`;

const VideoDialog = (props) => {
    const [videoLink, setVideoLink] = useState("");
    const [error, setError] = useState("");

    useEffect(()=>{
        if(props.showVideoDialogFlag){
            // console.log("Calling Video Link API");
            const userDetails  = getLocalStorageVariables();
            fetch(Constants.GetVideoUrl,
            {
                method: "POST",
                mode:'cors',
                body: new URLSearchParams({
                    email:userDetails.email,
                    accessToken:userDetails.accessToken,
                    videoPath:props.videoPath,
                    executionMasterId:props.executionMasterId,
                })
            })
            .then(response => { return response.json(); } )
            .then(data => {
                if(data.responseCode === Constants.RESPONSE_CODE_ACCESS_TOKEN_INVALID_V4){
                    localStorage.clear();
                    window.location=Constants.WINDOW_LOCATION;
                }
                else if(data.responseCode === Constants.RESPONSE_CODE_SUCCESS_V4){
                    setVideoLink(data.data)
                }else{
                    setError(data.responseMessage)
                }
            });
        }
    },[props.showVideoDialogFlag])

    return(
        <BootstrapModal show={props.showVideoDialogFlag} onHide={props.handleVideoDialogClose}
        isImage = {props.isImage}>
            <Modal.Header closeButton>
            <Modal.Title>{props.scenarioName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                    !isEmptyVariable(error) &&
                    <p>{error}</p>
                }
                {
                    !isEmptyVariable(videoLink) && props.isImage === "N" &&
                    <video width="100%" controls>
                    <source src={videoLink} type="video/webm" />
                    Your browser does not support HTML video.
                    </video>
                }
                {
                    !isEmptyVariable(videoLink) && props.isImage === "Y" &&
                    <img src={videoLink} />
                }
                
            </Modal.Body>
        </BootstrapModal>
    )

}

export default VideoDialog;