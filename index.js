
var teamCtrl= require('./team.controller');

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require("morgan");
var responseTime = require('response-time');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var csurf = require('csurf');
var mongoose = require('mongoose');
// Load passport
require('./auth/passport');



var app = express();

var config = require('./config');

var teamRouter = express.Router();
var loginRouter = express.Router();

app.use(cookieParser());
app.use(session({secret: 'safdsadsa', cookie: {httpOnly: true, secure: false}}));
app.use(morgan('combined'));
app.use(responseTime());
app.use(bodyParser.json());

app.use(csurf());


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var requireAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(500).send({msg: 'Unable to access info'});
};

loginRouter.post('/login', passport.authenticate('local'), function(req, res) {

  res.send({msg: 'Successful Login', username: req.user.username});

});

teamRouter.get('/', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  teamCtrl.getTeams(function(err, teams) {
    req.session.teamsShown = true;
    res.send(teams);
  });
});

teamRouter.get('/:id', requireAuth, function(req, res) {
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

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403)
  res.send('session has expired or form tampered with')
});

mongoose.connect('mongodb://localhost:27017/teams-dev', function() {
  var server = app.listen(8000, function() {
    console.log('App listening at http://localhost:%s', server.address().port);
  });
});






