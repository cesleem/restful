var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var dailyLevelSchema = new mongoose.Schema({
  timelineToken: String,
  date: Date,
  hourly_levels: Array
});

module.exports = mongoose.model('DailyLevel', dailyLevelSchema);
