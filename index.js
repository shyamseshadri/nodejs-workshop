
var async = require('async');
var teamCtrl= require('./team.controller');

var express = require('express');

var app = express();


app.get('/', function(req, res) {
  res.send('Hello world');
});

var server = app.listen(8000, function() {
  console.log('App listening at http://localhost:%s', server.address().port);
});






