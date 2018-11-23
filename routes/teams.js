const router = require('express').Router();


const {  ensureAuthenticated } = require('./auth');
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
  router.get('/:id', ensureAuthenticated, getTeam);
  router.get('/', ensureAuthenticated, getTeams);
  router.post('/', ensureAuthenticated, newTeam);
  router.put('/:id', ensureAuthenticated, updateTeam);
  router.delete('/:id', ensureAuthenticated, deleteTeam);
}

module.exports = router;
