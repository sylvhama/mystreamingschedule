import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {isFavorite, toggleFavorite} from '../helpers';
import StreamerPreview from './shared/StreamerPreview';
import Paper from 'material-ui/Paper';

class Streamer extends React.Component {

  state = {
    favorites: false
  }

  constructor() {
    super();
    this.isFavorite = isFavorite.bind(this);
    this.toggleFavorite = toggleFavorite.bind(this);
  }

  componentWillMount() {
    const p1 = fetch(`api/streamer/${this.props.match.params.name}`);
    const p2 = fetch(`user/${this.props.twitch_id}`);
    Promise.all([p1, p2])
    .then((res) => Promise.all([res[0].json(), res[1].json()]))
    .then((data) => {
      const streamer = data[0],
            user = data[1];
      if(user.error && this.props.loggedIn) return this.props.displayMsg(user.error, true, user.error);
      if(streamer.error) return this.props.displayMsg(streamer.error, true, streamer.error);
      if(streamer.notFound) return this.setState({notFound: true});
      this.setState({
        favorites: user.favorites, 
        streamer
      });
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  renderStreamer() {
    if(this.state.notFound) return (
      <div>
        <h2>Streamer not found!</h2>
        <p><Link to="/">Head back to home</Link></p>
      </div>
    );
    if(!this.state.streamer) return ;
    return (
      <StreamerPreview
        streamer={this.state.streamer}
        isFavorite={this.isFavorite}
        toggleFavorite={this.toggleFavorite}
        loggedIn={this.props.loggedIn}
      />
    );
  }

  render() { 
    return (
      <Paper zDepth={1} className="paper">
        {this.renderStreamer()}
      </Paper>
    );
  }
}

Streamer.propTypes = {
  displayMsg: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Streamer;