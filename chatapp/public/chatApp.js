'use strict';

angular.module("chatApp", [])
  .controller("ChatCtrl", ["$scope", function($scope) {
    var self = this;
    var socket = io();

    self.messages = [];
    self.usermsg = '';
    self.send = function() {
      socket.emit('chat message', self.usermsg);
      self.usermsg = '';
    };

    socket.on('chat message', function(msg) {
      self.messages.push(msg);
      $scope.$apply();
    });
}]);
