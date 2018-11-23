const Teams = require('../models/Teams');

const newTeam = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  const Team = new Teams();
  Object.keys(req.body).map(_ => Team[_] = req.body[_]);
  Team.save((err) => {
    if (err) return res.status(500).json(err);
    res.json(Team);
  });
};

const getTeam = (req, res) => {
  if (!req.params.id) return res.status(404).json({ message: 'team id is not specified' });

  Teams.findById(req.params.id).lean().exec((err, Team) => {
    if (err || !Team) return res.status(500).json(err);
    return res.json(Team);
  });
};

const getTeams = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Teams.find({}).lean().exec((err, Teams) => {
    if (err || !Team) return res.status(500).json(err);
    return res.json(Teams);
  });
};

const updateTeam = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Teams.findByIdAndUpdate(
    req.body._id,
    req.body,
    (err, Team) => {
      if (err) return res.status(500).json(err);
      res.json(Team);
    });
};

const deleteTeam = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Teams.findByIdAndRemove(req.params.id, (err, Team) => {
    if (err) return res.status(500).json(err);
    res.json(Team);
  });
};

module.exports = {
  newTeam,
  getTeam,
  getTeams,
  updateTeam,
  deleteTeam,
};
