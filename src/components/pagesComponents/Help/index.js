import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {HelpSection,MainContainer} from './help.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'

import {getLocalStorageVariables,isEmptyVariable,ifEmptyReturnNA} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class Help extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <Router>
                <div>
                    <GlobalStyle />
                    <Fonts />

                    <HelpSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar />
                       
                        </MainContainer>
                        
                    </HelpSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Help;