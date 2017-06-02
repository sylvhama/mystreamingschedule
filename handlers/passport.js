const passport       = require('passport'),
      OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
      request        = require('request'),
      userController = require('../controllers/userController');

// Constants
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID,
      TWITCH_SECRET    = process.env.TWITCH_SECRET,
      CALLBACK_URL     = process.env.CALLBACK_URL;

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = (accessToken, done) => {
  const options = {
    url: 'https://api.twitch.tv/kraken/user',
    method: 'GET',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'OAuth ' + accessToken
    }
  };

  request(options, (error, response, body) => {
    if (response && response.statusCode == 200) done(null, JSON.parse(body));
    else done(JSON.parse(body));
  });
}

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://api.twitch.tv/kraken/oauth2/authorize',
    tokenURL: 'https://api.twitch.tv/kraken/oauth2/token',
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_SECRET,
    callbackURL: CALLBACK_URL,
    state: true
  },
  async function(accessToken, refreshToken, profile, done) {
    userController.findOrSave(profile, done);
  }
));
