import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import Header from './shared/Header';
import Nav from './shared/Nav';
import Streamers from './Streamers';
import Streamer from './Streamer';
import Favorites from './Favorites';
import Login from './Login';
import Profile from './Profile';
import Editor from './Editor';
import NotFound from './NotFound';

import {getCookie} from '../helpers';

const style = {
  main: {
    position: 'relative',
    margin: '0 auto',
    paddingBottom: '56px',
    maxWidth: '768px',
    minHeight: '100vh'
  },
  nav: {
    position: 'fixed',
    zIndex: 999,
    bottom: 0,
    width: '100%',
    maxWidth: '768px'
  }
};

class App extends React.Component {
  state = {
    msg: '',
    showMsg: false,
    loggedIn: false,
    twitch_id: 0
  };

  componentWillMount() {
    let twitch_id = parseInt(getCookie('twitch_id')),
        loggedIn = false;
    if(!Number.isInteger(twitch_id) || twitch_id <= 0) twitch_id = 0;
    else loggedIn = true;
    this.setState({
      loggedIn,
      twitch_id
    });
  };

  displayMsg = (msg, isError = false, errObj = {}) => {
    if(typeof msg !== 'string') return;
    this.setState({
      msg: msg,
      showMsg: true
    });
    if(isError) console.error(errObj);
  };

  handleRequestClose = () => {
    this.setState({
      showMsg: false
    });
  };

  render() {
    return (
      <Router>
        <main style={style.main}>
          <Header />
          <Switch>
            <Route path="/" exact component={Streamers} />
            <Route path="/favorites" exact component={Favorites} />
            <Route path="/login" exact render={() => (
              this.state.loggedIn ? (
                <Redirect to="/profile"/>
              ) : (
                <Login/>
              )
            )}/>
            <Route path="/profile" exact render={() => (
              !this.state.loggedIn ? (
                <Redirect to="/login"/>
              ) : (
                <Profile displayMsg={this.displayMsg}
                         twitch_id={this.state.twitch_id}
                />
              )
            )}/>
            <Route path="/editor" exact render={() => (
              !this.state.loggedIn ? (
                <Redirect to="/login"/>
              ) : (
                <Editor/>
              )
            )}/>
            <Route component={NotFound} />
          </Switch>
          <nav style={style.nav}>
            <Nav loggedIn={this.state.loggedIn} />
          </nav>
          <Snackbar
            open={this.state.showMsg}
            message={this.state.msg}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </main>
      </Router>
    )
  }
}

export default App;
