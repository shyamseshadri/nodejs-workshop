
// Sequential, sync
var fs = require('fs');

var teams = JSON.parse(fs.readFileSync('teams.json'));

for (var i = 0; i < teams.length; i++) {
  teams[i].more = JSON.parse(fs.readFileSync(teams[i].id + '.json'));
}

console.log('Fully loaded teams ', teams);
