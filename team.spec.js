var should = require('should');
var mongoose = require('mongoose');
var teamModel = require('./team.model');
var teamController = require('./team.controller');

mongoose.connect('mongodb://localhost:27017/team-test');

describe('Team Controller', function() {

  var teamsData = [{id: 1, name: 'Team 1', country: 'Country 1'}, {id: 2, name: 'Team 2', country: 'Country 2'}];

  beforeEach(function(done) {
    teamModel.remove(function() {
      teamModel.create(teamsData, done);
    });
  });

  it('should fetch all teams information', function(done) {
    teamController.getTeams(function(err, allTeams) {
      allTeams.length.should.equal(2);
      allTeams[0].id.should.equal(teamsData[0].id);
      allTeams[1].id.should.equal(teamsData[1].id);

      allTeams[0].name.should.equal(teamsData[0].name);
      allTeams[1].name.should.equal(teamsData[1].name);
      done();
    });
  });

  it('should fetch individual team info', function(done) {
    teamController.addMoreData({id: 2}, function(err, team) {

      team.id.should.equal(2);
      team.name.should.equal(teamsData[1].name);
      done();
    });
  });
});


