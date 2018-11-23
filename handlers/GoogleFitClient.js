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
    return request.post(options, cb);
}

function getUserActivity(token, currentDate, cb) {
    var date = new Date();
    date.setHours(0,0,0,0);
    const dayBeginningDate = date.getTime();
    return getUserActivityTimeBounded(token, dayBeginningDate, currentDate, cb);
}

module.exports = { getUserActivity };