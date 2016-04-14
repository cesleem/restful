<<<<<<< HEAD
//start db
// mongod --dbpath ~/pebble

=======
>>>>>>> 9d5e2a20a5cb91f3ddd293ef61b5be91ed956c56
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var dailyLevelSchema = new mongoose.Schema({
  timelineToken: String,
  date: Date,
  hourly_levels: Array
});

module.exports = mongoose.model('DailyLevel', dailyLevelSchema);
