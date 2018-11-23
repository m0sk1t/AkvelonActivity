const Users = require('../models/Users');

const getSelf = (req, res) => {
  if (!req.params.id) return res.status(404).json({ message: 'user id i not specified'});

  Users.findById(req.params.id).lean().exec((err, User) => {
    if (err || !User) return res.status(500).json(err);
    return res.json(User);
  });
};

const createUser = (req, res) => Users.create(
  req.body,
  (err, User) => {
    if (err) return res.status(500).json(err);
    res.json(User);
  });

const updateUser = (req, res) => Users.findByIdAndUpdate(
  req.body._id,
  req.body,
  (err, User) => {
    if (err) return res.status(500).json(err);
    res.json(User);
  });

const deleteUser = (req, res) => Users.findByIdAndRemove(req.params.id, (err, User) => {
  if (err) return res.status(500).json(err);
  res.json(User);
});

module.exports = {
  getSelf,
  createUser,
  updateUser,
  deleteUser,
};
