import React from 'react';
import PropTypes from 'prop-types';
import {fetchOptions} from '../helpers';
import Paper from 'material-ui/Paper';
import StreamerPreview from './shared/StreamerPreview';

const style = {
  streamer: {
    marginTop: '16px',
    marginBottom: '16px'
  }
};

class Favorites extends React.Component {

  state = {
    loading: true,
    favorites: []
  }

  isFavorite = () => 1
  
  toggleFavorite = (id) => {
    let index = -1;
    const favorites = [...this.state.favorites],
          newFavorites = [];
    favorites.map((favorite, i) => {
      if(favorite._id !== id) newFavorites.push(favorite._id);
      else index = i;
    });
    if(index === -1) return;
    else favorites.splice(index, 1);
    fetch(`/favorites/${this.props.twitch_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        favorites: newFavorites
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
    fetch(`api/${this.props.twitch_id}/favorites`,  {...fetchOptions}) 
    .then((res) => res.json())
    .then((res) => {
      if(res.error) return this.props.displayMsg(res.error, true, res.error);
      if(res.favorites !== null) this.setState({loading: false, favorites: res.favorites});
      else this.setState({loading: false});
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  renderFavorites() {
    if(this.state.loading) return;
    if(this.state.favorites.length === 0) return(
      <p style={style.streamer}>
        <em>You have no favorites yet!</em>
      </p>
    );
    return this.state.favorites.map((streamer) => {
      if(!streamer.streamer) return;
      return(
        <div key={streamer._id}
             style={style.streamer}>
          <StreamerPreview
            streamer={streamer}
            isFavorite={this.isFavorite}
            toggleFavorite={this.toggleFavorite}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <Paper zDepth={1} className="paper">
        <h2>Favorites Streamers</h2>
        { this.renderFavorites() }
      </Paper>
    )
  }
}

Favorites.propTypes = {
  displayMsg: PropTypes.func.isRequired,
  twitch_id: PropTypes.number.isRequired
}

export default Favorites;