import React, { Component } from 'react';
import Home from './components/pagesComponents/Login';
import Dashboard from './components/pagesComponents/Dashboard';
import VerifyEmail from './components/pagesComponents/VerifyEmail';
import ProjectList from './components/pagesComponents/ProjectList';
import Scenarios from './components/pagesComponents/Scenarios';
import Actions from './components/pagesComponents/Actions';
import ActionDetails from './components/pagesComponents/ActionDetails';
import ScenarioDetails from './components/pagesComponents/ScenarioDetails'
import Elements from './components/pagesComponents/Elements';
import TestParams from './components/pagesComponents/TestParams';
import Reports from './components/pagesComponents/Reports';
import ReportDetails from './components/pagesComponents/ReportDetails';
import Configs from './components/pagesComponents/Configs';
import Logout from './components/pagesComponents/Logout';
import AddAction from './components/pagesComponents/AddAction';
import AddScenario from './components/pagesComponents/AddScenario';
import Notifications from './components/pagesComponents/Notifications';
import ResetPassword from './components/pagesComponents/ResetPassword';
import Profile from './components/pagesComponents/Profile';
import Team from './components/pagesComponents/Team';
import TeamList from './components/pagesComponents/TeamList';
import ProjectDetails from './components/pagesComponents/ProjectDetails';
import Pricing from './components/pagesComponents/Pricing';
import LiveLogs from './components/pagesComponents/LiveLogs'
// import Archivedprojects from './components/pagesComponents/Archivedprojects';
import Help from './components/pagesComponents/Help';

import {
    BrowserRouter as Router,
    Route,Redirect,Switch
} from 'react-router-dom';

const ProtectedRoute = ({ path, component: Comp }) => {
    return (
        <Route

            path={path}
        
            render={(props) => {
                return localStorage.getItem('loggedInUserDetails') ? (
                    <Comp {...props} />
                ) : (
                    <Redirect
                        to={{
                        pathname: "/"}}
                    />
                );
            }}
        />
    );
};

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/resetpassword/:id" component={ResetPassword} />
                    <Route exact path="/verifyemail/:id" component={VerifyEmail} />
                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/projects" component={ProjectList} />
                    <ProtectedRoute exact path="/notifications" component={Notifications} />
                    <ProtectedRoute exact path="/profile" component={Profile} />
                    <ProtectedRoute exact path="/pricing" component={Pricing} />
                    <ProtectedRoute exact path="/teams" component={TeamList} />
                    <ProtectedRoute exact path="/help" component={Help} />
                    <ProtectedRoute exact path="/logout" component={Logout} />

                    <ProtectedRoute exact path="/projects/scenarios/:id" component={Scenarios} />
                    <ProtectedRoute exact path="/projects/scenariodetails/:id" component={ScenarioDetails} />

                    <ProtectedRoute exact path="/projects/actions/:id" component={Actions} />
                    <ProtectedRoute exact path="/projects/actiondetails/:id" component={ActionDetails} />

                    <ProtectedRoute exact path="/projects/elements/:id" component={Elements} />
                    <ProtectedRoute exact path="/projects/testparameters/:id" component={TestParams} />
                    <ProtectedRoute exact path="/projects/reports/:id" component={Reports} />
                    <ProtectedRoute exact path="/projects/reportdetails/:id" component={ReportDetails} />
                    <ProtectedRoute exact path="/projects/livelogs/:id" component={LiveLogs} />
                    <ProtectedRoute exact path="/projects/configs/:id" component={Configs} />
                    <ProtectedRoute exact path="/projects/members/:id" component={Team} />
                    <ProtectedRoute exact path="/projects/details/:id" component={ProjectDetails} />
                </Switch>
            </Router>
        );
    }
}

export default App;
