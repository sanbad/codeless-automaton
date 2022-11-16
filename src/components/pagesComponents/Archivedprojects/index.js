import React, { Component } from 'react';
import GlobalStyle from '../../commonComponents/Global/global-styles';
import Fonts from '../../commonComponents/Global/fonts';
import {ArchivedprojectsSection,MainContainer} from './archivedprojects.style';
import Sidebar from '../../commonComponents/Sidebar'
import Topbar from '../../commonComponents/Topbar'

import {getLocalStorageVariables,isEmptyVariable,ifEmptyReturnNA} from '../../commonComponents/commonFunctions';
import * as Constants from '../../commonComponents/constants';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class Archivedprojects extends Component{
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

                    <ArchivedprojectsSection>
                        <Sidebar />

                        <MainContainer>
                            <Topbar />
                       
                        </MainContainer>
                        
                    </ArchivedprojectsSection>
                    
                </div>
            </Router>
        );
    
    }
}

export default Archivedprojects;