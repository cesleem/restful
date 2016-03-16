var async       = require('async');
var Timeline    = require('pebble-api');
var DailyLevel  = require('../models/DailyLevel');

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
