const os = require('os');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const secrets = require('./secrets');
const Users = require('./models/Users');

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    consumerKey: secrets.google.GOOGLE_CONSUMER_KEY,
    consumerSecret: secrets.google.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${os.hostname()}${secrets.google.GOOGLE_CALLBACK_URL}`,
  },
  function (token, tokenSecret, profile, done) {
    Users.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
