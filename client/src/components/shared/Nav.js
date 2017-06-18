import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Search from 'material-ui/svg-icons/action/search';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Account from 'material-ui/svg-icons/action/account-box';
import Lock from 'material-ui/svg-icons/action/lock-outline';

const searchIcon = <Search />,
      favoriteIcon = <Favorite />,
      accountIcon = <Account />,
      lockIcon = <Lock />,
      routes = {
        "/": 0,
        "/favorites": 1,
        "/login": 2,
        "/profile": 2,
      };

class Nav extends React.Component {

  state = {
    selectedIndex: -1
  }; 

  select(route) {
    this.props.history.push(route);
    this.setState({selectedIndex: routes[route]});
  };

  renderLogin() {
    if(this.props.loggedIn) return <BottomNavigationItem
      label="Profile"
      icon={accountIcon}
      onTouchTap={() => this.select('/profile')}
    />
    return <BottomNavigationItem
      label="Login"
      icon={lockIcon}
      onTouchTap={() => this.select('/login')}
    />
  };

  componentDidMount() {
    this.setState({selectedIndex: routes[location.pathname]});
    this.props.history.listen((location, action) => {
      this.setState({selectedIndex: routes[location.pathname]});
    })
  };

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Search streamer"
            icon={searchIcon}
            onTouchTap={() => this.select('/')}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={favoriteIcon}
            onTouchTap={() => this.select('/favorites')}
          />
          { this.renderLogin() }
        </BottomNavigation>
      </Paper>
    );
  }
}

Nav.propTypes = {
  history: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default withRouter(Nav);
