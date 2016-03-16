var API_ROOT = 'https://cesleem.ngrok.io';
var timelineToken = "SBLm6QquLtq7BXIBXZl18tj9jfxJaCGe";

Pebble.addEventListener("showConfiguration", function() {
  console.log('open config');
  if (timelineToken) {
    console.log('in showConfiguration, my timeline token is: ' + timelineToken);
    Pebble.openURL(API_ROOT + '/config?user=' + timelineToken);
  }
});

Pebble.addEventListener('ready', function() {
  timelineToken = token;
  console.log('js is ready');
  console.log('my timeline token is: ' + timelineToken);

  Pebble.getTimelineToken(function(token) {
    timelineToken = token;
    console.log(token);
  }, function(err) {
    console.log('Error getting timeline token: ' + err);
  });
});

function createUserOnServer(token) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', API_ROOT + '/createUser', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    timelineToken: token
  }));
}
