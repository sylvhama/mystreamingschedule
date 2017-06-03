exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next(); 
    return;
  }
  res.redirect('/login');
};
