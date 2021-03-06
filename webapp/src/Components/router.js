import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from './context';
import Login from './login';
import Forum from './forum';
import NavBar from './navbar';
import ChatApp from './chat';
import Event from './announce';
import Stream_RCV from './stream_rcv';
import Stream_BRD from './stream_brd';
import Donation from './Donation';
import Profile from './toggleschool';
import HomePage from './HomePage';
import Carousel from './institute'; 
import FQANS from './FQANS';
import Axios from 'axios';
class RootRouter extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
  };

  componentDidMount() {
    Axios.defaults.withCredentials = true;
  }
  logout = () => {
    this.setState({ user: null, isLoggedIn: false });
  };
  getUser = async () => {
    try {
      const temp = await Axios.get('http://192.168.225.219:5000/getUser');
      this.setState({ ...this.state, user: temp.data.user });
    } catch (e) {
      console.log(e);
    }
  };
  login = user => {
    this.setState({ user: user, isLoggedIn: true });
  };
  render() {
    return (
      <Provider
        value={{
          login: this.login,
          state: this.state,
          setUser: this.setUser,
          logout: this.logout,
          getUser: this.getUser,
        }}
      >
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/BRD' component={Stream_BRD} />
            <Route exact path='/RCV' component={Stream_RCV} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/chat' component={ChatApp} />
            <Route exact path='/forum' component={Forum} />
            <Route exact path='/announce' component={Event} />
            <Route exact path='/qans' component={FQANS} />
            <Route exact path='/instituteprofile' component={Profile} />
            <Route exact path='/institute' component={Carousel} />
            <Route exact path='/donation' component={Donation} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default RootRouter;
