const Teams = require('../models/Teams');

const newTeam = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const Team = Teams.create();
  return true; // TODO: Create team
};

const getTeam = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  Teams.findById(req.user.id).lean().exec((err, Team) => {
    if (err || !Team) return res.status(500).json(err);
    return res.json(Team);
  });
};

const getTeams = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  Teams.find({}).lean().exec((err, Teams) => {
    if (err || !Team) return res.status(500).json(err);
    return res.json(Teams);
  });
};

const updateTeam = (req, res) => Teams.findByIdAndUpdate(
  req.body._id,
  req.body,
  (err, Team) => {
    if (err) return res.status(500).json(err);
    res.json(Team);
  });

const deleteTeam = (req, res) => Teams.findByIdAndRemove(req.params.id, (err, Team) => {
  if (err) return res.status(500).json(err);
  res.json(Team);
});

module.exports = {
  newTeam,
  getTeam,
  getTeams,
  updateTeam,
  deleteTeam,
};
