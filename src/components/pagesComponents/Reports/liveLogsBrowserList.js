import React, { Component } from 'react';
import {BootstrapModal,LivelogBrowsersLayout,
    BrowserDetailsLayout,
    SaveBtnDialog} from './reports.style';
import {Modal} from 'react-bootstrap';

class LiveLogsBrowserListDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps) !== JSON.stringify(this.props) && 
        this.props.showBrowserDialog){

        }
    }

    render(){
        return(
            <div>
                <BootstrapModal show={this.props.showBrowserDialog} onHide={this.props.handleLiveLogsBrowserDialogClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Browsers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.props.browserArr.map(item=>{
                                return <LivelogBrowsersLayout>
                                    <BrowserDetailsLayout>
                                        <h6>{item.browser}</h6>
                                    </BrowserDetailsLayout>
                                    <SaveBtnDialog
                                        target="_blank"
                                        href = {"/projects/livelogs/"+this.props.executionMasterId+"-"+item.masterBrowserId}
                                    >Show Livelogs</SaveBtnDialog>
                                </LivelogBrowsersLayout>
                            })
                        }
                        
                    </Modal.Body>
                </BootstrapModal>
            </div>
        )
    }

}

export default LiveLogsBrowserListDialog;