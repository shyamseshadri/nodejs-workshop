
var async = require('async');
var teamCtrl= require('./team.controller');

var express = require('express');

var app = express();


app.get('/', function(req, res) {
  async.waterfall([function(callback) {
    teamCtrl.getTeams(callback);
  }, function(teams, callback) {
    var functionArray = [];
    for (var i = 0; i < teams.length; i++) {
      functionArray.push(function(team) {
          return function(cb) {
            teamCtrl.addMoreData(team, cb)
          };
        }(teams[i])
      );
    }
    async.parallel(functionArray, function(err, teamsExtraInfo) {
      for (var i = 0; i < teams.length; i++) {
        teams[i].more = teamsExtraInfo[i];
      }
      callback(null, teams);
    });
  }], function(err, responses) {
    res.send(responses);
  });
});

var server = app.listen(8000, function() {
  console.log('App listening at http://localhost:%s', server.address().port);
});






