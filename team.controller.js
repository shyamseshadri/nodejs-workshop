

var Teams = require('./team.model');

module.exports = {
  getTeams: function(cb) {
    Teams.find({}, cb);
  },
  addMoreData: function(team, cb) {
    Teams.findOne({id: team.id}, cb);
  }
};
