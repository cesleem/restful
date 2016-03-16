require('dotenv').load();
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path       = require('path');


mongoose.connect(process.env.MONGODB);

var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use('/assets',  express.static(__dirname + '/public'));
app.use('/vendor',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var homeController = require('./controllers/home');

app.get('/config', homeController.config);
app.post('/createUser', homeController.createUser);
app.post('/addHappiness', homeController.addHappiness);

process.stdin.resume();
process.stdin.on('data', homeController.sendPin);

var server = app.listen(app.get('port'), function () {
  console.log('happiness-meter-server listening on port %s', app.get('port'));
});