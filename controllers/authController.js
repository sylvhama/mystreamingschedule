exports.logout = (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next(); 
    return;
  }
  res.clearCookie('connect.sid');
  res.redirect('/login');
};
