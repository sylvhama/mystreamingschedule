exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next(); 
    return;
  }
  this.loggedStatus(req, res, next);
};

exports.loggedStatus = (req, res, next) => {
  res.json(
    {
      logged: req.isAuthenticated()
    }
  );
};
