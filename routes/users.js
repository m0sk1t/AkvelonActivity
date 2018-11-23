const router = require('express').Router();

const auth = require('./auth');
const {
  getSelf,
  createUser,
  deleteUser,
  updateUser,
} = require('../handlers/Users');

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

module.exports = router;
