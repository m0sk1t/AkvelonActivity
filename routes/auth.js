const passport = require('passport');
const router = require('express').Router();
const secrets = require('../secrets');


router.get(
  secrets.google.GOOGLE_AUTH_URL,
  passport.authenticate('google', { 
    scope: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/fitness.activity.read'
    ]
  }),
);

router.get(
  secrets.google.GOOGLE_CALLBACK_URL,
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_, res) => res.redirect('/')
);


router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
  }));


module.exports = {
  router,
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).send('Unathorized');
  },
  ensureUserIsAdministartor: (req, res, next) => {
    if (req.user && secrets.ADMIN_EMAILS.includes(req.user.email)) return next();
    res.status(401).send('Forbidden');
  },
};
