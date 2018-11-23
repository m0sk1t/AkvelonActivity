const router = require('express').Router();

const auth = require('./auth');
const {
  getSelf,
  deleteUser,
  updateUser,
} = require('../handlers/Users');

if (process.env.NODE_ENV === 'development') {
  router.get('/', getSelf);
  router.put('/', updateUser);
  router.delete('/', deleteUser);
} else {
  router.get('/', auth.ensureAuthenticated, getSelf);
  router.put('/', auth.ensureAuthenticated, updateUser);
  router.delete('/', auth.ensureAuthenticated, deleteUser);
}

module.exports = router;
