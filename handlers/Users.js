const Users = require('../models/Users');

const getSelf = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized'});
  Users.findById(req.user._id).lean().exec((err, User) => {
    if (err || !User) return res.status(404).json(err);
    return res.json(User);
  });
};

const getUser = (req, res) => {
  if (!req.params.id) return res.status(404).json({ message: 'user id is not specified'});

  Users.findById(req.params.id).lean().exec((err, User) => {
    if (err || !User) return res.status(500).json(err);
    return res.json(User);
  });
};

const getUsers = (req, res) => {
  Users.find().lean().exec((err, Users) => {
    if (err) return res.status(500).json(err);
    return res.json(Users);
  })
}

const updateUser = (req, res) => Users.findByIdAndUpdate(
  req.user._id,
  req.body,
  (err, User) => {
    if (err) return res.status(500).json(err);
    res.json(User);
  });

const deleteUser = (req, res) => Users.findByIdAndRemove(req.user._id, (err, User) => {
  if (err) return res.status(500).json(err);
  res.json(User);
});

module.exports = {
  getSelf,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
