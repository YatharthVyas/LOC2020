import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './login';
import NavBar from './navbar';
import Messenger from './Messages/Messenger';
import ChatApp from './chat';
class RootRouter extends React.Component {
    state = {
        user: null,
        isLoggedIn: false
    };

    render() {
        return (
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path='/' />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/chat' component={Messenger} />
                    <Route exact path='/chat1' component={ChatApp} />
                </Switch>
            </Router>
        );
    }
}

export default RootRouter;
