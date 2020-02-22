import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './login';
import NavBar from './navbar';
import Stream_RCV from './stream_rcv';
import Stream_BRD from './stream_brd';
class RootRouter extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
  };

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/BRD' component={Stream_BRD} />
          <Route exact path='/RCV' component={Stream_RCV} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default RootRouter;
