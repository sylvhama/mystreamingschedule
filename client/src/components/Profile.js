import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {labelWithCounter, fetchOptions} from '../helpers';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import DownloadIcon from 'material-ui/svg-icons/file/cloud-download';
import Face from 'material-ui/svg-icons/action/face';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import {deepPurple500} from 'material-ui/styles/colors';

class Profile extends React.Component {

  state = {
    twitch_id: 0,
    checked: false,
    loading: false
  }

  onChangeDescription = (e, newValue) => {
    if(newValue.length > 140) return;
    this.setState({
      description: newValue
    });
  }

  onCheck = (e, isChecked) => {
    this.setState({
      checked: isChecked
    });
  }

  updateLogo = () => {
    this.setState({loading: true});
    fetch(`/logo/${this.state.twitch_id}`, {
      credentials: 'include',
    })
    .then((res) => res.json())
    .then((json) => {
      if(json.error) return this.props.displayMsg(json.error, true, json);
      else if(json.uptodate) this.props.displayMsg(json.uptodate);
      else this.props.displayMsg('Your logo has been updated.');
      const logo = json.logo || this.state.logo;
      this.setState({
        loading: false,
        logo
      })
    })
    .catch((err) => this.props.displayMsg('An error has occured', true, err));
  }

  componentDidMount() {
    fetch(`user/${this.props.twitch_id}`) 
    .then((res) => res.json())
    .then((user) => {
      if(user.error) return this.props.displayMsg(user.error, true, user.error);
      this.setState(user);
      if(user.streamer) this.setState({checked:true});
    })
    .catch((err) => this.props.displayMsg('An error has occured.', true, err));
  }

  renderLogo() {
    let avatar = <Avatar src={this.state.logo} />;
    if(this.state.logo === '') avatar = <Avatar backgroundColor={deepPurple500} icon={<Face />} />;
    return(
      <div style={{textAlign:'center'}}>
        <Badge
          badgeContent={<IconButton onClick={this.updateLogo}
                                    tooltip="Download logo from Twitch"
                                    touch={true}
                                    disabled={this.state.loading}
                        >
                          <DownloadIcon />
                        </IconButton>}
        >
          {avatar}
        </Badge>
      </div>
    );
  }

  renderEditorLink() {
    if(this.state.loading || !this.state.streamer) return(<span />);
    return(<Link to="/editor" />);
  }

  submit(e) {
    e.preventDefault();
    const checked = this.state.checked;
    this.setState({loading: true});
    fetch(`/user/${this.state.twitch_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        description: this.state.description,
        streamer: checked
      }),
      ...fetchOptions
    })
    .then((res) => res.json())
    .then((json) => {
      if(json.error) this.props.displayMsg(json.error, true, json);
      else {
        this.props.setStreamer(checked);
        this.setState({
          loading: false,
          streamer: checked
        })
        this.props.displayMsg('Your profile has been updated.');
      }
    })
    .catch((err) => this.props.displayMsg('An error has occured', true, err));
  }

  renderForm() {
    if(this.state.twitch_id === 0) return;
    return(
      <div>
        <h2>{this.state.name}'s profile</h2>
        {this.renderLogo()}
        <form id="profile-form" onSubmit={(e) => this.submit(e)}>
          <TextField
            hintText="Write your description here"
            floatingLabelText={labelWithCounter(this.state.description.length, 140, 'Channel description')}
            floatingLabelFixed={true}
            multiLine={true}
            rowsMax={5}
            fullWidth={true}
            value={this.state.description}
            onChange={this.onChangeDescription}
          />
          <br /><br />
          <Checkbox
            checked={this.state.checked} 
            label="I want to appear in search results and create my own streaming schedule."
            onCheck={this.onCheck}
          />
          <RaisedButton type="submit"
                        style={{marginTop: '16px'}}
                        label="Update Profile"
                        primary={true}
                        fullWidth={true}
                        disabled={this.state.loading}
          />
        </form>
        <Divider style={{marginTop: '16px'}} />
        <p style={{marginTop: '16px'}}
           hidden={this.state.streamer}>
            See above if you want to turn on the editor.
        </p>
        <RaisedButton containerElement={this.renderEditorLink()}
                      style={{marginTop: '16px'}}
                      label="Access Schedule Editor"
                      fullWidth={true}
                      disabled={this.state.loading || !this.state.streamer}
        />
        <Divider style={{marginTop: '16px'}} />
        <FlatButton style={{marginTop: '16px'}}
                    label="Logout"
                    fullWidth={true}
                    href="/logout"
                    disabled={this.state.loading}
        />
      </div>
    )
  }

  render() {
    return (
      <Paper zDepth={1} className="paper">
        {this.renderForm()}
      </Paper>
    );
  }
}

Profile.propTypes = {
  twitch_id: PropTypes.number.isRequired,
  setStreamer: PropTypes.func.isRequired,
  displayMsg: PropTypes.func.isRequired
}

export default Profile;
