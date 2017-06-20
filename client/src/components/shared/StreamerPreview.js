import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui/svg-icons/action/face';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {deepPurple500} from 'material-ui/styles/colors';

class StreamerPreview extends React.Component {

  renderHearth = (id) => {
    if(this.props.isFavorite(id) > -1) return(<Favorite />);
    return(<FavoriteBorder />);
  }

  renderFavButton = (id) => {
    if(!this.props.loggedIn) return;
    else return (
      <FlatButton
        primary={true}
        disabled={this.props.isFavorite(id)===false}
        onTouchTap={() => this.props.toggleFavorite(id)}
        icon={this.renderHearth(id)}
      />
    );
  }

  render() {
    const streamer = this.props.streamer;
    let avatar = streamer.logo;
    if(avatar === '') avatar = <Avatar backgroundColor={deepPurple500} icon={<Face />} />;
    return (
      <Card>
        <CardHeader
          title={streamer.name}
          subtitle={streamer.description}
          avatar={avatar}
        />
        <CardActions>
            <FlatButton
              label="See Schedule"
            />
            {this.renderFavButton(streamer._id)}
        </CardActions>
      </Card>
    )
  }
}

StreamerPreview.propTypes = {
  streamer: PropTypes.object.isRequired,
  isFavorite: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default StreamerPreview;