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
router.delete('/program/:program_id', authController.isLoggedIn, programController.remove);

router.get('/schedules', authController.isLoggedIn, scheduleController.get);
router.post('/schedule', authController.isLoggedIn, scheduleController.add);
router.put('/schedule/:schedule_id', authController.isLoggedIn, scheduleController.update);
router.delete('/schedule/:schedule_id', authController.isLoggedIn, scheduleController.remove);

router.get('/user/:twitch_id', userController.get);
router.get('/logo/:twitch_id', authController.isLoggedIn, authController.isSameUser, userController.updateLogo);
router.put('/user/:twitch_id', authController.isLoggedIn, authController.isSameUser, userController.update);

router.get('/api/streamers', userController.getStreamers);
router.get('/api/:twitch_id/favorites', authController.isLoggedIn, authController.isSameUser, userController.getFavorites);
router.get('/api/:twitch_id/active', userController.getActiveSchedules);

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
router.get('/logout', authController.logout);

router.get('*', (req, res) => {
  if(req.isAuthenticated()) res.cookie('twitch_id', req.user.twitch_id)
  else res.cookie('twitch_id', 0)
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router;
