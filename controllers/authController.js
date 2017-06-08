exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next(); 
    return;
  }
  res.json(
    {
      error: 'You\'re not logged in.'
    }
  );
};

exports.isSameUser = async function(req, res, next){
  if(req.user.twitch_id === req.params.twitch_id ) {
    next(); 
    return;
  }
  res.json(
    {
      error: 'You\'re not authorized to access this content.'
    }
  );
}
