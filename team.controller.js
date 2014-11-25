
var fs = require('fs');

var teams = [];

module.exports = {
  getTeams: function() {
    if (teams.length === 0) {
      teams = JSON.parse(fs.readFileSync('teams.json'));
    }
    return teams;
  },
  getTeam: function(i) {
    if (teams.length === 0) {
      teams = JSON.parse(fs.readFileSync('teams.json'));
    }
    return teams[i];
  }
};
