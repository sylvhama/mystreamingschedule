const mongoose   = require('mongoose'),
      request    = require('request'),
      helpers = require('../handlers/helpers');

const User = mongoose.model('User');

exports.findOrSave = async function(profile, done) {
  const user = {
    twitch_id: profile._id,
    email: profile.email,
    name: profile.display_name,
    logo: profile.logo
  };
  if(user.logo === null) delete user.logo;
  userModel = new User(user);
  try {
    let found = await User.findOne(user);
    if(!found) found = await userModel.save();
    user._id = found._id;
    user.streamer = found.streamer;
    done(null, user);
  }catch(err) {
    done(err, user);
  }
};

exports.get = async function(req, res, next){
  try {
    const user = await User.findOne({ twitch_id: req.params.twitch_id });
    if (!user) return res.json(
      {
        error: 'User not found.'
      }
    );
    res.json(
      {
        twitch_id: user.twitch_id,
        name: user.name,
        description: user.description || '',
        streamer: user.streamer,
        logo: user.logo || ''
      }
    );
  }catch(err) {
    return next(err);
  }
}

exports.getStreamers = async function(){}

exports.getFavorites = async function(){}

exports.update = async function(req, res, next){
  try {
    const response = await User.update(
      { 
        twitch_id: req.params.twitch_id 
      },
      {
        description: helpers.escapeHtml(req.body.description).substring(0, 140),
        streamer: req.body.streamer
      }
    );
    if(response.n>0 && response.nModified>0) {
      req.user.streamer = req.body.streamer;
      res.json({ok: true});
    }
    else res.json({error: 'An error has occured while updating your profile.'}); 
  }catch(err) {
    return next(err);
  }
}

exports.updateLogo = function(req, res, next) {
  const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID,
        options = {
          url: `https://api.twitch.tv/kraken/users/${req.user.twitch_id}`,
          method: 'GET',
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json'
          }
        };

  request(options, async function(error, response, body) {
    const user = JSON.parse(body);
    if (response && response.statusCode == 200 && user.logo !== null) {
      try {
        const responseUpdate = await User.update(
          { 
            twitch_id: req.params.twitch_id 
          },
          {
            logo: user.logo
          }
        );       
        if(responseUpdate.n>0 && responseUpdate.nModified>0) res.json({logo: user.logo});
        if(responseUpdate.n>0 && responseUpdate.nModified===0) res.json({uptodate: 'Your logo is still up to date.'});
        else res.json({error: 'An error has occured while updating your logo.'}); 
      }catch(err) {
        return next(err);
      }
    }else res.json({error: 'Error while updating logo.'});
  });
}
