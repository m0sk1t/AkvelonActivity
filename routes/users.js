const router = require('express').Router();


const { ensureAuthenticated } = require('./auth');
const {
  getSelf,
  getUser,
  deleteUser,
  updateUser,
} = require('../handlers/Users');


if (process.env.NODE_ENV === 'development') {
  router.get('/', getSelf);
  router.get('/:id', getUser);
  router.put('/', updateUser);
  router.delete('/:id', deleteUser);
} else {
  router.get('/', ensureAuthenticated, getSelf);
  router.get('/:id', ensureAuthenticated, getUser);
  router.put('/', ensureAuthenticated, updateUser);
  router.delete('/:id', ensureAuthenticated, deleteUser);
}

module.exports = router;
