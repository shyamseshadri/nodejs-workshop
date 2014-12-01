
var async = require('async');
var teamCtrl= require('./team.controller');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.post('/api/login', function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  if (username === 'admin' && password === 'password') {
    res.send({msg: 'Successful Login'});
  } else {
    res.status(4005).send({msg: 'FAILED Login'});
  }


});

app.get('/api/teams', function(req, res) {
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






