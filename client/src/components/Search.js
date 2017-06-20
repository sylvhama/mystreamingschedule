import React from 'react';
import PropTypes from 'prop-types';
import {fetchOptions} from '../helpers';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import StreamerPreview from './shared/StreamerPreview';

const style = {
  streamer: {
    marginTop: '16px',
    marginBottom: '16px'
  }
};

class Search extends React.Component {

  state = {
    favorites: false,
    streamers: [],
    noRes: false
  }

  search = (e, q) => {
    if(q.length < 2) return this.setState({streamers: [], noRes: false});
    fetch(`api/search/${q}`) 
    .then((res) => res.json())
    .then((streamers) => {
      let noRes = true;
      if(streamers.length) noRes = false;
      this.setState({streamers, noRes});
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  isFavorite = (id) => {
    const favorites = this.state.favorites;
    if(favorites === false) return false;
    const index = favorites.indexOf(id);
    return index;
  } 

  toggleFavorite = (id) => {
    if(this.state.favorites === false) return;
    const favorites = [...this.state.favorites],
          index = this.isFavorite(id);
    if(index === -1) favorites.push(id);
    else favorites.splice(index, 1);
    fetch(`/favorites/${this.props.twitch_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        favorites
      }),
      ...fetchOptions
    })
    .then((res) => res.json())
    .then((json) => {
      if(json.error) this.props.displayMsg(json.error, true, json);
      else {
        this.setState({
          favorites
        })
      }
    })
    .catch((err) => this.props.displayMsg('An error has occured', true, err));
  }

  componentWillMount() {
    if(!this.props.loggedIn) return;
    fetch(`user/${this.props.twitch_id}`) 
    .then((res) => res.json())
    .then((user) => {
      if(user.error) return this.props.displayMsg(user.error, true, user.error);
      this.setState({favorites: user.favorites});
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  renderSearchRes() {
    if(this.state.noRes) return(
      <p style={style.streamer}>
        <em>No streamer has been found.</em>
      </p>
    );
    return this.state.streamers.map((streamer) => {
      return(
        <div key={streamer._id}
             style={style.streamer}>
          <StreamerPreview
            streamer={streamer}
            isFavorite={this.isFavorite}
            toggleFavorite={this.toggleFavorite}
            loggedIn={this.props.loggedIn}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <Paper zDepth={1} className="paper">
        <h2 style={{paddingBottom:0}}>Search Streamer</h2>
        <TextField
          hintText="Type any streamer name"
          floatingLabelText="Search"
          fullWidth={true}
          onChange={this.search}
        />
        { this.renderSearchRes() }
      </Paper>
    )
  }
}

Search.propTypes = {
  displayMsg: PropTypes.func.isRequired,
  twitch_id: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Search;