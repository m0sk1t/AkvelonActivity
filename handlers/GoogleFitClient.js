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

async function getUserActivityTimeBounded(token, startDate, endDate) {  
    var bodyString = generateRequestBody(startDate, endDate);
    var options = {
        url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?access_token=' + token,
        json: true,
        body: bodyString
    }
    
    await request.post(options, function (error, response, body) {
        if (error) {
            console.log("Unable to get user's activity data.")
        } else {
            try {
                var stepsCount = body.bucket[0].dataset[0].point[0].value[0].intVal;
                return stepsCount;
            } catch (e) {
                console.log("Error while parsing activity for user: " + e)
            }
        }
    });
}

function getUserActivity(token) {
    var date = new Date();
    var currentDate = date.getTime();
    date.setHours(0,0,0,0);
    var dayBeginningDate = date.getTime();
    return getUserActivityTimeBounded(token, dayBeginningDate, currentDate);
}

module.exports = { getUserActivity };