const router = require('express').Router();

const auth = require('./auth');
const {
  getActivity,
} = require('../handlers/Activities');

if (process.env.NODE_ENV === 'development') {
  router.get('/', getActivity);
} else {
  router.get('/', auth.ensureAuthenticated, getActivity);
}

module.exports = router;
