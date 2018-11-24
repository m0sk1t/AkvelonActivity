const router = require('express').Router();


const { ensureAuthenticated } = require('./auth');
const {
  getSelf,
  getUser,
  deleteUser,
  updateUser,
  getTeamUsers,
} = require('../handlers/Users');


if (process.env.NODE_ENV === 'development') {
  router.get('/', getSelf);
  router.get('/:id', getUser);
  router.put('/', updateUser);
  router.delete('/', deleteUser);
  router.get('/:teamId', getTeamUsers);
} else {
  router.get('/', ensureAuthenticated, getSelf);
  router.get('/:id', ensureAuthenticated, getUser);
  router.put('/', ensureAuthenticated, updateUser);
  router.delete('/', ensureAuthenticated, deleteUser);
  router.get('/:teamId', ensureAuthenticated, getTeamUsers);
}

module.exports = router;
