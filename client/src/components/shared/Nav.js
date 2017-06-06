import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import People from 'material-ui/svg-icons/social/people';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Account from 'material-ui/svg-icons/action/account-box';

const peopleIcon = <People />,
      favoriteIcon = <Favorite />,
      accountIcon = <Account />,
      routes = {
        "/": 0,
        "/favorites": 1,
        "/login": 2
      };

class Nav extends React.Component {

  state = {
    selectedIndex: -1
  }; 

  select = (route) => {
    this.props.history.push(route);
    this.setState({selectedIndex: routes[route]});
  };

  componentDidMount() {
    this.setState({selectedIndex: routes[location.pathname]});
    this.props.history.listen((location, action) => {
      this.setState({selectedIndex: routes[location.pathname]});
    })
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Streamers"
            icon={peopleIcon}
            onTouchTap={() => this.select('/')}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={favoriteIcon}
            onTouchTap={() => this.select('/favorites')}
          />
          <BottomNavigationItem
            label="Login"
            icon={accountIcon}
            onTouchTap={() => this.select('/login')}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

Nav.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(Nav);
