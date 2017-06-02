const express  = require('express');
      passport = require("passport");

const router = express.Router();

// Set route to start OAuth link
// this is where you define scopes to request
router.get('/auth/twitch', passport.authenticate('twitch', { 
    scope: 'user_read' 
  })
);

// Set route for OAuth redirect
router.get('/auth/twitch/callback', passport.authenticate('twitch', { 
    successRedirect: '/',
    failureRedirect: '/logout'
  })
);

router.get('/', (req, res) => {
  res.send('it works');
});

module.exports = router;
