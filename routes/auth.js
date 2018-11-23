const secrets = require('../secrets');

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).send('Unathorized');
  },
  ensureUserIsAdministartor: (req, res, next) => {
    if (req.user && secrets.ADMIN_EMAILS.includes(req.user.email)) return next();
    res.status(401).send('Forbidden');
  },
};
