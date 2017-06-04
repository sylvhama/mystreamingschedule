const express  = require('express'),
      passport = require('passport'),
      programController = require('../controllers/programController'),
      scheduleController = require('../controllers/scheduleController'),
      userController = require('../controllers/userController'),
      authController = require('../controllers/authController');

const router = express.Router();

router.post('/program', authController.isLoggedIn, programController.add);
router.put('/program/:program_id', authController.isLoggedIn, programController.isAuthor, programController.update);
router.delete('/program/:program_id', authController.isLoggedIn, programController.isAuthor, programController.delete);

router.post('/schedule', authController.isLoggedIn, scheduleController.add);
router.put('/schedule/:schedule_id', authController.isLoggedIn, scheduleController.isAuthor, scheduleController.update);
router.delete('/schedule/:schedule_id', authController.isLoggedIn, scheduleController.isAuthor, scheduleController.delete);

router.get('/user/:user_id', authController.isLoggedIn, userController.isSameUser);
router.put('/user/:user_id', authController.isLoggedIn, userController.update);

router.get('/api/streamers', userController.getStreamers);
router.get('/api/:user_id/favorites', authController.isLoggedIn, userController.isSameUser, userController.getFavorites);
router.get('/api/:user_id/active/', userController.getActiveSchedules);
router.get('/api/:user_id/all/', authController.isLoggedIn, userController.isSameUser, userController.getAllSchedules);

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
  res.send(`It works, login: ${req.isAuthenticated()}`);
});

module.exports = router;
