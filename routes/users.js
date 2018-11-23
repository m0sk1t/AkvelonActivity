const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const auth = require('./auth');
const {
  getSelf,
  createUser,
  deleteUser,
  updateUser,
} = require('../handlers/Users');
const secrets = require('../secrets');
const Users = require('../models/Users');

router.get(
  secrets.google.GOOGLE_AUTH_URL,
  passport.authenticate('google', {
    scope: ['profile']
  }
),
);

router.get(
  secrets.google.GOOGLE_CALLBACK_URL,
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_, res) => res.redirect('/')
);

if (process.env.NODE_ENV === 'development') {
  router.get('/:id', getSelf);
  router.post('/', createUser);
  router.put('/', updateUser);
  router.delete('/:id', deleteUser);
} else {
  router.get('/:id', auth.ensureAuthenticated, getSelf);
  router.post('/', createUser);
  router.put('/', auth.ensureAuthenticated, updateUser);
  router.delete('/:id', auth.ensureAuthenticated, deleteUser);
}

passport
  .serializeUser((user, done) => done(null, user.id));

passport
  .deserializeUser((id, done) => Users.findById(id, done));

passport.use(new GoogleStrategy({
  clientID: secrets.google.GOOGLE_CONSUMER_KEY,
  clientSecret: secrets.google.GOOGLE_CONSUMER_SECRET,
  callbackURL: `http://localhost:3000/auth${secrets.google.GOOGLE_CALLBACK_URL}`,
},
  (accessToken, refreshToken, profile, done) => {
    const g_user = profile._json;
    Users.findOne({ googleId: g_user.id }, (err, existingUser) => {
      if (err) return done(err, false);
      if (existingUser) {
        createUser(false, existingUser, accessToken, refreshToken, g_user, done);
      } else {
        createUser(true, false, accessToken, refreshToken, g_user, done);
      }
    });
  }
));

const createUser = (isNew, existingUser, accessToken, refreshToken, g_user, done) => {
  let User = existingUser;
  if (isNew && !existingUser) {
    User = new Users();
    User.googleId = g_user.id;
  }
  User.avatar = g_user.image.url;
  User.email = g_user.emails.length ? g_user.emails[0].value : '';
  User.accessToken.google = accessToken;
  User.refreshToken.google = refreshToken;
  User.name.last = g_user.name.givenName;
  User.name.first = g_user.name.familyName;
  User.save((err) => {
    done(err, User);
  });
};

module.exports = router;
