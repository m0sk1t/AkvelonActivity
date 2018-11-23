
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

app.use(compression());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static(path.join(__dirname, '../static/build')));
app.use(require('express-session')({
  resave: true,
  saveUninitialized: true,
  secret: secrets.AAA_SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

mongoose.connect(`mongodb://localhost/${DB}`);
mongoose.connection.once('open', _ => console.log(`${chalk.green('✓')} successfully connected to db ${DB}!`))
module.exports = app;
