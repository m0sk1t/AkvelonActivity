const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const router = require('./router');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const app = express();
const DB = 'aaa';

const secrets = require('./secrets');
const Users = require('./models/Users');

app.use(compression());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static(path.join(__dirname, '/static/build/')));
app.use(require('express-session')({
  resave: true,
  saveUninitialized: true,
  secret: secrets.AAA_SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.use(router);

mongoose.connect(`mongodb://localhost/${DB}`);
mongoose.connection.once('open', _ => console.log(`${chalk.green('✓')} successfully connected to db ${DB}!`))
module.exports = app;
