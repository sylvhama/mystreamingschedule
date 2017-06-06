import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Twitch from '../icons/twitch';

const twitchIcon = <span><Twitch /></span>

const style = {
  div: {
    textAlign:'center'
  }
}

const Login = () => (
  <Paper zDepth={1} className="paper">
    <h2>Login</h2>
    <p>Login with your Twitch account in order to follow others streamers or if you want to create your own streaming schedule!</p>
    <br />
    <div style={style.div}>
      <RaisedButton
        primary={true}
        href="/auth/twitch"
        label="Login with Twitch"
        icon={twitchIcon}
      />
    </div>
  </Paper>
);

export default Login;