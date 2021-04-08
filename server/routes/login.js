const passport = require('../auth/passport');

const getUserInfo = (req, res) => {
  if (req.isAuthenticated()) {
    const resUser = {
      user_id: req.user[0].user_id,
      first_name: req.user[0].first_name,
      last_name: req.user[0].last_name,
      email: req.user[0].email,
      oauth_provider: req.user[0].oauth_provider
    }
    res.json(resUser);
  } else {
    res.sendStatus(401)
  }
}
const logout = (req, res) => {
  if (req.user.oauth_provider === 'google') {
    req.logout();
    req.session.destroy()
    res.clearCookie("connect.sid")
    res.redirect("/")
  } else {
    req.logout();
    res.json({msg: 'logged out'});
  }
}

module.exports = {
  getUserInfo,
  logout
}

