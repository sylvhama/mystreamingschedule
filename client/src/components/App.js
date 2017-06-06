import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './shared/Header';
import Nav from './shared/Nav';
import Streamers from './Streamers';
import Streamer from './Streamer';
import Favorites from './Favorites';
import Login from './Login';
import Profile from './Profile';
import Admin from './Admin';
import NotFound from './NotFound';

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
    zIndex: 9999,
    bottom: 0,
    width: '100%',
    maxWidth: '768px'
  }
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <main style={style.main}>
          <Header />
          <Switch>
            <Route path="/" exact component={Streamers} />
            <Route path="/favorites" exact component={Favorites} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/admin" exact component={Streamer} />
            <Route component={NotFound} />
          </Switch>
          <nav style={style.nav}>
            <Nav />
          </nav>
        </main>
      </Router>
    )
  }
}

export default App;
