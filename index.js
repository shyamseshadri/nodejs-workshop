
var teamCtrl= require('./team.controller');

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var responseTime = require('response-time');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var config = require('./config');

var teamRouter = express.Router();
var loginRouter = express.Router();

app.use(cookieParser());
app.use(session({secret: 'safdsadsa'}));
app.use(morgan('combined'));
app.use(responseTime());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

loginRouter.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username === 'admin' && password === 'password') {
    res.send({msg: 'Successful Login'});
  } else {
    res.status(400).send({msg: 'FAILED Login'});
  }
});

teamRouter.get('/', function(req, res) {
  teamCtrl.getTeams(function(err, teams) {
    req.session.teamsShown = true;
    res.send(teams);
  });
});

teamRouter.get('/:id', function(req, res) {
  var id = Number(req.params.id);
  if (!req.session.teamsShown) {
    return res.status(500).send({msg: 'You need to loead teams list first'});
  }
  teamCtrl.getTeams(function(err, teams) {
    teamCtrl.addMoreData(teams[id - 1], function (err, teamData) {
      teams[id - 1].more = teamData;
      res.send(teams[id - 1]);
    });
  });
});

app.use('/api', loginRouter);
app.use('/api/teams', teamRouter);

var server = app.listen(8000, function() {
  console.log('App listening at http://localhost:%s', server.address().port);
});






