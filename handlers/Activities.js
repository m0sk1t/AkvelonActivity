const Activities = require('../models/Activities');

const getActivity = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  Activities.findById(req.user.id).lean().exec((err, Activity) => {
    if (err || !Activity) return res.status(500).json(err);
    return res.json(Activity);
  });
};

module.exports = {
  getActivity,
};
