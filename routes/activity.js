const router = require('express').Router();


const { ensureAuthenticated } = require('./auth');
const {
  getActivity,
  getTotalActivityStepsByUser,
  getAll
} = require('../handlers/Activities');



if (process.env.NODE_ENV === 'development') {
  router.get('/', getActivity);
  router.get('/all', getAll);
} else {
  router.get('/', ensureAuthenticated, getActivity);
  router.get('/all', ensureAuthenticated, getAll);
}

module.exports = router;
