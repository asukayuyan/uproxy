'use strict';

var popup = angular.module('UProxyExtension-popup', ['UProxyExtension'])
  // Main extension controller.
  .controller('MainCtrl', ['$scope', function ($scope) {


    // State for roster vs. detail view.
    $scope.rosterNudge = false;
    $scope.currentContact = {
      'name': 'Nobody'
    };
    $scope.instances = $scope.model.instances;
    var _getTrust = function(client) {
      return $scope.instances[client.instanceId].trust;
    };

    // Whether UProxy is logged in to *any* network.
    $scope.loggedIn = function() {
      return $scope.isOnline('google') || $scope.isOnline('facebook');
    };

    $scope.toggleContact = function(c) {
      // c.detailsVisible = !c.detailsVisible;
      $scope.currentContact = c;
      console.log(c);
      $scope.rosterNudge = true;
    };
  }])
  // The controller for debug information/UI.
  .controller('DebugCtrl', ['$filter', '$scope', 'freedom', 'model',
      function ($filter, $scope, freedom, model) {
    // var messageable = $filter('messageable');

    $scope.submitChat = function () {
      var contact = model.roster[$scope.userId];
      if (!contact) {
        console.error('not on roster:', $scope.userId);
        return;
      }
      if (messageable(contact)) {
        // only sends to UProxy clients
        $scope.sendMessage(contact, $scope.msg);
      } else {
        freedom.emit('send-message', {to: contact.userId, message: $scope.msg});
      }
      $scope.msg = '';
    };
  }]);
