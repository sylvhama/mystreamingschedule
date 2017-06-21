const express  = require('express'),
      passport = require('passport'),
      path     = require('path'),
      programController = require('../controllers/programController'),
      scheduleController = require('../controllers/scheduleController'),
      userController = require('../controllers/userController'),
      authController = require('../controllers/authController');

const router = express.Router();

router.get('/programs', authController.isLoggedIn, programController.get);
router.post('/program', authController.isLoggedIn, programController.add);
router.put('/program', authController.isLoggedIn, programController.update);
router.delete('/program/:program_id', authController.isLoggedIn, scheduleController.removeByProgram, programController.remove);

router.get('/schedules', authController.isLoggedIn, scheduleController.get);
router.post('/schedule', authController.isLoggedIn, scheduleController.add);
router.delete('/schedule/:schedule_id', authController.isLoggedIn, scheduleController.remove);

router.get('/user/:twitch_id', userController.get);
router.get('/logo/:twitch_id', authController.isLoggedIn, authController.isSameUser, userController.updateLogo);
router.put('/favorites/:twitch_id', authController.isLoggedIn, authController.isSameUser, userController.updateFavorites);
router.put('/user/:twitch_id', authController.isLoggedIn, authController.isSameUser, userController.update);

router.get('/api/streamer/:name', userController.getStreamer);
router.get('/api/search/:q', userController.searchStreamer);
router.get('/api/:twitch_id/favorites', authController.isLoggedIn, authController.isSameUser, userController.getFavorites);

// Set route to start OAuth link
// this is where you define scopes to request
router.get('/auth/twitch', passport.authenticate('twitch', { 
    scope: 'user_read' 
  })
);
// Set route for OAuth redirect
router.get('/auth/twitch/callback', passport.authenticate('twitch', { 
    successRedirect: '/favorites',
    failureRedirect: '/logout'
  })
);
router.get('/logout', authController.logout);

router.get('*', (req, res) => {
  if(req.isAuthenticated()) res.cookie('user', JSON.stringify({
    twitch_id: req.user.twitch_id,
    streamer: req.user.streamer
  }))
  else res.cookie('user', 0)
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router;
