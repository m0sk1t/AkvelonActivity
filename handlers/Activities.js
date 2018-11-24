const Activities = require('../models/Activities');
const Users = require('../models/Users');
const Teams = require('../models/Teams');

const getAll = (_, res) => {
  let state = {
    teamsByName: {},
    employeeById: {}
  }

  Promise.all([
    Teams.find({}).lean().exec(),
    Users.find({}).lean().exec(),
    Activities.find({}).lean().exec(),
  ])
    .then(values => {
      const [teams, users, activities] = values;

      users.forEach(user => {
        let userActSumm = activities
          .filter(a => a.userId === user.userId)
          .map(a => a.steps)
          .reduce((prev, curr) => {
            return prev + curr;
          });
        user.steps = userActSumm;
        state.employeeById[user.id] = user;
      });

      teams.forEach(team => {
        let teamActSum = user
          .filter(u => u.teamId === team._id)
          .map(u => u.steps)
          .reduce((prev, curr) => {
            return prev + curr;
          });
        team.steps = teamActSum;
        state.teamsByName[team.name] = team;
      });

      return res.json(state);
    });
}


const getActivity = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  Activities.find({ userId: req.user._id }).lean().exec((err, Activity) => {
    if (err || !Activity) return res.status(500).json(err);
    return res.json(Activity);
  });
};


const getTotalActivityStepsByUser = (req, res) => {
  const userId = req.query.userId;
  // TODO: handle absence of start
  const start = req.query.start ? new Date(req.query.start) : new Date('1970-01-01');
  // TODO: handle absence of end
  const end = req.query.end ? new Date(req.query.end) : Date.now();

  Activities.aggregate([
    { "$match": { userId, timestamp: { $gte: start, $lte: end } } },
    {
      "$group": {
        "_id": {
          "userId": "$userId"
        },
        "steps": {
          "$sum": "$steps"
        }
      }
    },
    {
      "$project": {
        "userId": "$_id.userId",
        "steps": "$steps"
      }
    }
  ], (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
}

module.exports = {
  getActivity,
  getTotalActivityStepsByUser,
  getAll
};
