//start db
// mongod --dbpath ~/pebble

var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var sleepSurveySchema = new mongoose.Schema({
	timelineToken: String,
	surveytype: String,
	disturbance: String,
	quality: String
});

module.exports = mongoose.model('SleepSurvey', sleepSurveySchema);
