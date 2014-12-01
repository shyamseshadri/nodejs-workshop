
var fs = require('fs');

module.exports = {
  getTeams: function(cb) {
    fs.readFile('teams.json', function(err, data) {
      cb(null, JSON.parse(data));
    });
  },
  addMoreData: function(team, cb) {
    fs.readFile(team.id + '.json', function(err, data) {
      cb(null, JSON.parse(data));
    });
  }
};
