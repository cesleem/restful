var async       = require('async');
var Timeline    = require('pebble-api');
var DailyLevel  = require('../models/DailyLevel');
<<<<<<< HEAD
var SleepSurvey  = require('../models/SleepSurvey');


// SleepSurvey.find({},
//         function(err, data){
//           if (err){
//               console.log('error occured');
//           }
//             // res.send('My ninjas are:\n');
//           console.log(data); 
//       });


exports.addSleepSurvey = function(req, res) {
  var survey = req.body;
  SleepSurvey.collection.insert(survey,
    function(success) {
      console.log('created sleep docs');
      // console.log('request', survey);
      SleepSurvey.find({}).exec(
        function(err, surveys){
          if(err) {
            console.log('err', err);
          } else{
            console.log(JSON.parse(JSON.stringify(surveys)));
          }
        });
      res.sendStatus(200);
    }, 
    function(err) {
        console.log(err);
        console.log('request', req.body);
  });
    // insertSurvey(survey, function() {
    // });
  // console.log('added survey');
};

// function insertSurvey(survey, callback) {
//   SleepSurvey.collection.insert(survey, {}, function(err) {
//     if (err) {
//       console.log(err);
//       console.log('request', req.body);
//     }
//     console.log('created sleep docs');
//     console.log('request', req.body);
//     res.sendStatus(200);
//   });
// TODO update with unique time, userid
  // SleepSurvey.collection.createIndex({date: 1}, {unique: true}, function(err) {
  //   console.log(err);
  // });

//   var updateDoc = { '$set' : { } };
//   updateDoc.$set['hourly_levels.' + currentHour()] = survey[0];

//   var match = {timelineToken: timelineToken, date: getDay(0) }; 

//   DailyLevel.collection.update(match, updateDoc, function(err, dailyLevel) {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     callback();
//   });
// }

// exports.createUser = function(req, res) {
//   var dailyLevels = [];
//   for (var i = 0; i < 7; i++) {
//     dailyLevels.push({
//       date: getDay(i),
//       timelineToken: req.body.timelineToken,
//       hourly_levels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     });
//   }

//   DailyLevel.collection.insert(dailyLevels, {}, function(err) {
//     if (err) {
//       console.log(err);
//     }
//     console.log('created User docs');
//   });

//   DailyLevel.collection.createIndex({timelineToken: 1, date: 1}, {unique: true}, function(err) {
//     console.log(err);
//   });
// };

// var timeline = new Timeline();

// exports.config = function(req, res) {
//   var timelineToken = req.query.user;
//   getConfigData(timelineToken, function(results) {
//     console.log('rendering config');
//     console.log(results[0][0].hourly_levels);
//     res.render('config', {
//       happinessesToday: results[0][0].hourly_levels,
//       happiestDays: results[1],
//       saddestDays: results[2]
//     });
//   });
// };

// exports.addHappiness = function(req, res) {
//   var happiness;

//   console.log('request', req.body.happiness);

//   switch (req.body.happiness) {
//     case 'happier':
//       happiness = 5;
//       break;
//     case 'happy':
//       happiness = 4;
//       break;
//     case 'netural':
//       happiness = 3;
//       break;
//     case 'sad':
//       happiness = 2;
//       break;
//     case 'sadder':
//       happiness = 1;
//       break;
//   }

//   insertHappiness(process.env.TIMELINE_TOKEN, happiness, function() {
//     console.log('added happiness');
//     res.send('ok');
//   });
// };

// exports.sendPin = function() {
//   var pin = new Timeline.Pin({
//     "id": 'happy-meter-0123456789',
//     "time": new Date("2016-03-14T03:53:20.04Z"),
//     "layout": {
//       "type": Timeline.Pin.LayoutType.GENERIC_PIN,
//       "tinyIcon": Timeline.Pin.Icon.PIN,
//       "title": "How happy are you?"
//     },
//     "createNotification": {
//       "layout": new Timeline.Pin.Layout({
//         "type": Timeline.Pin.LayoutType.GENERIC_NOTIFICATION,
//         "tinyIcon": Timeline.Pin.Icon.NOTIFICATION_GENERIC,
//         "title": "Happiness Check-in"
//       })
//     },
//     "updateNotification": {
//       "time": new Date(),
//       "layout": new Timeline.Pin.Layout({
//         "type": Timeline.Pin.LayoutType.GENERIC_NOTIFICATION,
//         "tinyIcon": Timeline.Pin.Icon.NOTIFICATION_GENERIC,
//         "title": "Happiness Check-in"
//       })
//     },
//     "actions": [{
//       "type": "http",
//       "title": "Happier",
//       "url": "http://restfulapp-cesleem.rhcloud.com/addHappiness",
//       "method": "POST",
//       "headers": {
//         "Content-Type": "application/json"
//       },
//       "bodyJSON": {
//         "happiness": "happier"
//       }
//     }, {
//       "type": "http",
//       "title": "Happy",
//       "url": "http://restfulapp-cesleem.rhcloud.com/addHappiness",
//       "method": "POST",
//       "headers": {
//         "Content-Type": "application/json"
//       },
//       "bodyJSON": {
//         "happiness": "happy"
//       }
//     }, {
//       "type": "http",
//       "title": "Netural",
//       "url": "http://restfulapp-cesleem.rhcloud.com/addHappiness",
//       "method": "POST",
//       "headers": {
//         "Content-Type": "application/json"
//       },
//       "bodyJSON": {
//         "happiness": "netural"
//       }
//     }, {
//       "type": "http",
//       "title": "Sad",
//       "url": "http://restfulapp-cesleem.rhcloud.com/addHappiness",
//       "method": "POST",
//       "headers": {
//         "Content-Type": "application/json"
//       },
//       "bodyJSON": {
//         "happiness": "sad"
//       }
//     }, {
//       "type": "http",
//       "title": "Sadder",
//       "url": "http://restfulapp-cesleem.rhcloud.com/addHappiness",
//       "method": "POST",
//       "headers": {
//         "Content-Type": "application/json"
//       },
//       "bodyJSON": {
//         "happiness": "sadder"
//       }
//     }]
//   });

//   timeline.sendUserPin(process.env.TIMELINE_TOKEN, pin, function(err, body, res) {
//     if (err) {
//       console.error(err);
//     }
//     console.log('pin sent');
//   });
// };

// function getConfigData(timelineToken, renderer) {
//   async.parallel([
//     function(callback) {
//       getHappinessesToday(timelineToken, function(result) {
//         callback(null, result);
//       });
//     },

//     function(callback) {
//       var ascending = -1;
//       getTopDays(timelineToken, ascending, function(result) {
//         callback(null, result);
//       });
//     },

//     function(callback) {
//       var descending = 1;
//       getTopDays(timelineToken, descending, function(result) {
//         callback(null, result);
//       });
//     }
//   ], function(err, results) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     renderer(results);
//   });
// }

// function getHappinessesToday(timelineToken, renderer) {
//   DailyLevel.aggregate([
//     {
//       "$match": {
//         "timelineToken": timelineToken,
//         "date": new Date().getTime()
//       } 
//     }, {
//       "$unwind": "$hourly_levels" 
//     }, {
//       "$redact": {
//         $cond: {
//           if: {
//             $gt: [ "$hourly_levels", 0 ]
//           },
//           then: "$$DESCEND",
//           else: "$$PRUNE"
//         }
//       }
//     }, {
//       "$group": {
//         "_id": "$timelineToken",
//         hourly_levels: {
//           $push: "$hourly_levels"
//         }
//       }
//     }
//   ], function(err, result) {
//     if (!err) {
//       if (result.length < 1) {
//         result = [{hourly_levels: []}];
//       }
//       renderer(result);
//     } else {
//       console.log('getHappinessToday err:', err);
//     }
//   });
// }

// function getTopDays(timelineToken, order, renderer) {
//   DailyLevel.aggregate([
//     {
//       "$match" : {
//         "timelineToken" : timelineToken,
//         "date": { $lt: new Date().getTime() }
//       } 
//     }, {
//       "$unwind" : "$hourly_levels" 
//     }, {
//       "$group" : {
//         "_id" : "$date",
//         "averageHappiness" : {
//           $avg : "$hourly_levels"
//         }
//       }
//     }, {
//       "$sort" : { 
//         "averageHappiness" : order
//       }
//     }, {
//       "$limit" : 5
//     }
//   ], function(err, result) {
//     if (!err) {
//       renderer(result);
//     } else {
//       console.log('getTopDays err:', err);
//     }
//   });
// }

// function insertHappiness(timelineToken, happiness, callback) {
//   var updateDoc = { '$set' : { } };
//   updateDoc.$set['hourly_levels.' + currentHour()] = happiness;

//   var match = {timelineToken: timelineToken, date: getDay(0) }; 

//   DailyLevel.collection.update(match, updateDoc, function(err, dailyLevel) {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     callback();
//   });
// }

// function getDay(offset) {
//   var d = new Date();
//   return new Date(d.setDate(d.getDate() + offset)).setHours(0,0,0,0);
// }

// function currentHour() {
//   return new Date().getHours();
// }
=======

var timeline = new Timeline();

exports.config = function(req, res) {
  /**********************************
   * Here you need get the user's
   * timelineToken, get their happiness
   * stats and render the appropriate
   * view, passing the data to the view.
   **********************************/
  var timelineToken = req.query.user;
  console.log(timelineToken);
  res.render('config');
};

exports.createUser = function(req, res) {
  /**********************************
   * Here you need to create a week of
   * empty days for the user. You'll
   * use MongoDB's insert and createIndex
   * commands to do this.
   **********************************/
}

exports.addHappiness = function(req, res) {
  /**********************************
   * Here you need get the user's
   * happiness, and insert it into
   * Mongo accordingly.
   **********************************/
};

exports.sendPin = function() {
  /**********************************
   * Here you need to write a little
   * helper function to programmatically
   * send pins to yourself. You'll use
   * the timeline-api node module to
   * create and send a pin to yourself.
   **********************************/
};

function getConfigData(timelineToken, renderer) {
  /**********************************
   * Here you need to write a little
   * helper function to create one
   * callback (using async) for all
   * of your Mongo queries.
   **********************************/
}

function getHappinessesToday(timelineToken, renderer) {
  /**********************************
   * Here you need to write a function
   * to get the user's happinesses for
   * today. You'll want to use aggregate
   * redact to remove any zeros.
   **********************************/
}

function getTopDays(timelineToken, order, renderer) {
  /**********************************
   * Here you need to write a function
   * to average a user's happinesses
   * for each day, and then sort them,
   * and return the top 5. You'll need
   * to use aggregate to unwind, group,
   * average, sort, and limit the query.
   **********************************/
}

function insertHappiness(timelineToken, happiness, callback) {
  /**********************************
   * Here you need to write a function
   * to insert a given happiness into
   * Mongo for the correct user on the
   * current hour within the
   * hourly_levels array.
   **********************************/
}

// Helper function to get a new Date based on an offset
function getDay(offset) {
  var d = new Date();
  return new Date(d.setDate(d.getDate() + offset)).setHours(0,0,0,0);
}

// Helper function to get the current hour.
function currentHour() {
  return new Date().getHours();
}

// Helper function to return an array representing 24 hours.
function emptyDay() {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
>>>>>>> 9d5e2a20a5cb91f3ddd293ef61b5be91ed956c56
