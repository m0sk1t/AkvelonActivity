const Activities = require('../models/Activities');
const Users = require('../models/Users');
const Teams = require('../models/Teams');

const getAll = (req, res) => {
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
      let teams = values[0];
      let users = values[1];
      let activities = values[2];

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
  
  Activities.findById(req.user.id).lean().exec((err, Activity) => {
    if (err || !Activity) return res.status(500).json(err);
    return res.json(Activity);
  });
};


const getTotalActivityStepsByUser = (req, res) => {
  let userId = req.query.userId;
  // TODO: handle absence of start
  let start = req.query.start ? new Date(req.query.start) : new Date('1970-01-01');
  // TODO: handle absence of end
  let end = req.query.end ? new Date(req.query.end) : Date.now();

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
  ], function (err, result) {
    if (err) {
      next(err);
    } else {
      res.json(result);
    }
  });
}

module.exports = {
  getActivity,
  getTotalActivityStepsByUser,
  getAll
};
