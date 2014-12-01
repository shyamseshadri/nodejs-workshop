
var fs = require('fs');

module.exports = {
  getTeams: function(cb) {
    fs.readFile('teams.json', cb);
  },
  addMoreData: function(team, cb) {
    fs.readFile(team.id + '.json', function(err, data) {
      team.more = JSON.parse(data);
      cb();
    });
  }
};
