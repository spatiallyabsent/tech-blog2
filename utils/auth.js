const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) { //may need to change to logged_in see also user-routes.js
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;