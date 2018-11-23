const router = require('express').Router();

const auth = require('./auth');
const {
  newTeam,
  getTeam,
  getTeams,
  deleteTeam,
  updateTeam,
} = require('../handlers/Teams');

if (process.env.NODE_ENV === 'development') {
  router.get('/:id', getTeam);
  router.get('/', getTeams);
  router.post('/', newTeam);
  router.put('/:id', updateTeam);
  router.delete('/:id', deleteTeam);
} else {
  router.get('/:id', auth.ensureAuthenticated, getTeam);
  router.get('/', auth.ensureAuthenticated, getTeams);
  router.post('/', auth.ensureAuthenticated, newTeam);
  router.put('/:id', auth.ensureAuthenticated, updateTeam);
  router.delete('/:id', auth.ensureAuthenticated, deleteTeam);
}

module.exports = router;
