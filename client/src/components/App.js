import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './Header';
import Streamers from './Streamers';
import Streamer from './Streamer';
import Favorites from './Favorites';
import Login from './Login';
import Profile from './Profile';
import Admin from './Admin';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Header />
          <Switch>
            <Route path="/" exact component={Streamers} />
            <Route path="/favorites" exact component={Favorites} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/admin" exact component={Streamer} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App;
