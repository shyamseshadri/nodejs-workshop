
var teamCtrl = require('./team.controller');

console.log('First call', teamCtrl.getTeams());
console.log('First team', teamCtrl.getTeam(0));
console.log('Third team', teamCtrl.getTeam(2));
