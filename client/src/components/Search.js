import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class Search extends React.Component {

  state = {
    streamers: []
  }

  search = (e, q) => {
    if(q.length < 2) return;
    fetch(`api/search/${q}`) 
    .then((res) => res.json())
    .then((streamers) => {
      console.log(streamers)
      if(streamers.length) this.setState({streamers});
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
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
      </Paper>
    )
  }
}

Search.propTypes = {
  displayMsg: PropTypes.func.isRequired
}

export default Search;