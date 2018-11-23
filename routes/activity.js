const router = require('express').Router();


const { ensureAuthenticated } = require('./auth');
const {
  getActivity,
} = require('../handlers/Activities');



if (process.env.NODE_ENV === 'development') {
  router.get('/', getActivity);
} else {
  router.get('/', ensureAuthenticated, getActivity);
}

module.exports = router;
