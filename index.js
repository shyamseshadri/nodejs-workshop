
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
  teamCtrl.getTeams(function(err, teams) {
    res.send(teams);
  });
});

app.get('/api/teams/:id', function(req, res) {
  var id = Number(req.params.id);
  teamCtrl.getTeams(function(err, teams) {
    teamCtrl.addMoreData(teams[id - 1], function (err, teamData) {
      teams[id - 1].more = teamData;
      res.send(teams[id - 1]);
    });
  });
});

var server = app.listen(8000, function() {
  console.log('App listening at http://localhost:%s', server.address().port);
});






