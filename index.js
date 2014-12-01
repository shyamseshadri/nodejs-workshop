
var teamCtrl= require('./team.controller');

teamCtrl.getTeams(function(err, data) {
  var teams = JSON.parse(data);
  var count = 0;
  for (var i = 0; i < teams.length; i++) {
    teamCtrl.addMoreData(teams[i], function() {
      count++;
      if (count == teams.length) {
        console.log('Teams ', teams);
      }
    });
  }
});







