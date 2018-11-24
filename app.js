const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const router = require('./router');
const morgan = require('morgan');
const chalk = require('chalk');
const https = require('https');
const path = require('path');
const app = express();
const DB = 'aaa';

const secrets = require('./secrets');
const Users = require('./models/Users');
const cronUpdateJob = require('./CronJob');

app.use(compression());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static(path.join(__dirname, '/static/build/')));
app.use(require('express-session')({
  resave: true,
  saveUninitialized: false,
  secret: secrets.AAA_SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

passport
  .serializeUser((user, done) => done(null, user.id));

passport
  .deserializeUser((id, done) => Users.findById(id, done));

const createPrismUser = (username, token, prismUser, done) => {
  const User = new Users();
  User.prism.id = prismUser.Id;
  User.prism.username = username;
  User.prism.accessToken = token;
  User.prism.email = prismUser.Mail;
  User.prism.skype = prismUser.Skype;
  User.prism.phone = prismUser.Telephone;
  User.prism.room = prismUser.Dislocation;
  User.prism.name.last = prismUser.LastName;
  User.prism.name.first = prismUser.FirstName;
  User.prism.image = `https://prism.akvelon.net:8441/api/system/getphoto/${prismUser.Id}`;
  User.save((err) => {
    if (err) return done(err);
    done(err, User);
  });
}

const createGoogleUser = (isNew, existingUser, accessToken, _, g_user, done) => {
  let User = existingUser;
  if (isNew && !existingUser) {
    User = new Users();
    User.google.id = g_user.id;
  }
  User.google.image = g_user.image.url;
  User.google.email = g_user.emails.length ? g_user.emails[0].value : '';
  User.google.accessToken = accessToken;
  // User.google.refreshToken = refreshToken; // null
  User.google.name.last = g_user.name.givenName;
  User.google.name.first = g_user.name.familyName;
  User.save((err) => {
    done(err, User);
  });
};

const buildHTTPSPrismOptions = (isLoggedIn, data) => {
  return {
    port: 8441,
    hostname: 'prism.akvelon.net',
    path: `/api/system/${isLoggedIn ? 'loggedinfo' : 'signin'}`,
    headers: isLoggedIn
      ? {
        'Cookie': `PRISMCookie=${data.token}`
      }
      : {
        'Authorization': `Basic ${Buffer.from(encodeURIComponent(JSON.stringify({
          persistent: true,
          password: data.password,
          username: data.username,
        }))).toString('base64')}`,
      },
  }
};

const makePrismQuery = (isLoggedIn, data, done, cb) => {
  https.get(buildHTTPSPrismOptions(isLoggedIn, data), (res) => {
    let data = '';
    res
      .on('data', (chunk) => data += chunk)
      .on('error', done)
      .on('end', () => cb(data))
  });
};

passport.use(new LocalStrategy((username, password, done) => {
  makePrismQuery(false, {
    username,
    password,
  }, done, (data) => {
    try {
      const token = JSON.parse(data).Token;
      Users.findOne({
        'prism.username': username,
      }, (err, User) => {
        if (err) return done(err);
        if (User) {
          return done(err, User);
        } else {
          makePrismQuery(true, { token }, done, (data) => {
            try {
              const prismUser = JSON.parse(data);
              createPrismUser(username, token, prismUser, done);
            } catch (error) {
              return done(error);
            }
          });
        }
      });
    } catch (error) {
      return done(error);
    }
  })
}));

passport.use(new GoogleStrategy({
  passReqToCallback: true,
  clientID: secrets.google.GOOGLE_CONSUMER_KEY,
  clientSecret: secrets.google.GOOGLE_CONSUMER_SECRET,
  callbackURL: `http://localhost:3000/auth${secrets.google.GOOGLE_CALLBACK_URL}`,
},
  (req, accessToken, refreshToken, profile, done) => {
    const g_user = profile._json;
    if (req.user) {
      Users.findById(req.user._id, (err, existingUser) => {
        if (err) return done(err, false);
        if (existingUser) {
          createGoogleUser(false, existingUser, accessToken, refreshToken, g_user, done);
        } else {
          createGoogleUser(true, false, accessToken, refreshToken, g_user, done);
        }
      });
    } else {
      createGoogleUser(true, false, accessToken, refreshToken, g_user, done);
    }
  }
));

app.use(router);

// TODO: db filling
// cronUpdateJob.start();

mongoose.connect(`mongodb://localhost/${DB}`);
mongoose.connection.once('open', _ => console.log(`${chalk.green('✓')} successfully connected to db ${DB}!`))
module.exports = app;
