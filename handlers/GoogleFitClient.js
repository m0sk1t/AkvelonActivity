var request = require('request');

function generateRequestBody(startDate, endDate) {
    return {  
        "endTimeMillis": endDate,
        "startTimeMillis": startDate,
        "bucketByTime":{ "durationMillis": 86400000 },
        "aggregateBy":[  
           {  
              "dataSourceId":"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
              "dataTypeName":"com.google.step_count.delta"
           }
        ]
     }
}

function getUserActivityTimeBounded(token, startDate, endDate, cb) {  
    var options = {
        json: true,
        body: generateRequestBody(startDate, endDate),
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?access_token=${token}`,
    }

    request.post(options, cb);
}

async function getUserActivity(token, cb) {
    var date = new Date();
    var currentDate = date.getTime();
    date.setHours(0,0,0,0);
    var dayBeginningDate = date.getTime();
    return await getUserActivityTimeBounded(token, dayBeginningDate, currentDate, cb);
}

module.exports = { getUserActivity };