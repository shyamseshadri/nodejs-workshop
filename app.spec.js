process.env.NODE_ENV = 'test';

var should = require('should'),
    request = require('supertest'),
    teamModel = require('./team.model'),
    app = require('./index');

describe('GET Teams list ', function() {
    var teamsData = [{id: 1, name: 'Team 1', country: 'Country 1'}, {id: 2, name: 'Team 2', country: 'Country 2'}];

    beforeEach(function(done) {
        teamModel.remove(function() {
            teamModel.create(teamsData, done);
        });
    });

    it('should fetch teams list', function(done) {
        request(app)
          .get('/api/teams')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              var allTeams = res.body;
              allTeams.length.should.equal(2);
              allTeams[0].id.should.equal(teamsData[0].id);
              allTeams[1].id.should.equal(teamsData[1].id);

              allTeams[0].name.should.equal(teamsData[0].name);
              allTeams[1].name.should.equal(teamsData[1].name);
              done();
          });
    });

});
