var UI = require('ui');
var ajax = require('ajax');

// var API_ROOT_URL = 'http://localhost:5000/addSleepSurvey';
var API_ROOT_URL = 'http://restfulapp-cesleem.rhcloud.com/addSleepSurvey';

Pebble.addEventListener("showConfiguration", function() {
  console.log('open config');
  if (timelineToken) {
    console.log('in showConfiguration, my timeline token is: ' + timelineToken);
    Pebble.openURL(API_ROOT + '/config?user=' + timelineToken);
  }
});

Pebble.addEventListener('ready', function() {
  doTimeline();
});

var doTimeline = function(packages) {
  Pebble.getTimelineToken(function (token) {
      console.log('my timeline token is: ' + token);
      timelineToken = token
    // sendToken(token);
  }, function (error) {
    console.log('Error getting timeline token: ' + error);
  });
};

// Pebble.addEventListener('ready', function() {
//   // timelineToken = token;
//   console.log('js is ready');
//   console.log('my timeline token is: ' + timelineToken);

//   Pebble.getTimelineToken(function(token) {
//     timelineToken = token;
//     console.log(token);
//   }, function(err) {
//     console.log('Error getting timeline token: ' + err);
//   });
// });

function createUserOnServer(token) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', API_ROOT + '/createUser', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    timelineToken: token
  }));
}




var wake_text = 'How was last night\'s sleep?';
// var sleep_text = 'How was today?'

//Screen 0: Show splash screen before entering survey
var splashWindow = new UI.Card({
  title: wake_text
  // icon: 'images/wolfram.png'
});

splashWindow.show();

//MORNING AFTER SLEEP
//Screen 1
var menu1 = new UI.Menu({
    sections: [{
      title: 'My sleep was disturbed by ...',
      items: [
        {title:'Environment', subtitle:'noise, light, temp'}, 
        {title:'Body', subtitle:'discomfort, allergies, sickness'},
        {title:'Mind', subtitle:'stress, thinking'}]
    }]
});

menu1.show();
splashWindow.hide();

var menu2 = new UI.Menu({
  sections: [{
    title: 'When I woke up for the day, I felt ...',
    items: [
      { title: 'Refreshed' }, 
      { title: 'Somewhat refreshed' },
      { title: 'Fatigued' }
    ]
  }]
});

var quality;
var disturbance;

menu1.on('select', function(e) {
  switch(e.itemIndex) {
    case 0: disturbance = 'Environment'; break;
    case 1: disturbance = 'Body'; break;
    case 2: disturbance = 'Mind'; break;
  }
  //Screen 2
  menu2.show();
  menu1.hide();
});

menu2.on('select', function(e) {
  switch(e.itemIndex) {
    case 0: quality = 'Refreshed'; break;
    case 1: quality = 'Somewhat refreshed'; break;
    case 2: quality = 'Fatigued'; break;
  }
  sendResults(API_ROOT_URL, quality, disturbance);
});

function sendResults(url, quality, disturbance) {
  var jsonData = {
    timelineToken : timelineToken,
    time : Date.now(),
    surveytype: 'post-sleep',
    disturbance : disturbance,
    quality : quality
  };

  ajax( 
      { url: url, 
        method:'post', 
        data:jsonData, 
        dataType:'json'}, 
    // success
    function(data, status, request) {
      console.log('Success!');
      var close = new UI.Card({title: 'Success!', subtitle: 'Have a great day!'});
      close.show();
      menu2.hide();
    }, 
    // error
    function(error, status, request) {
      console.log('The ajax request failed: ' + error);
      console.log('The ajax request failed: ' + status);
    }
  );
};


