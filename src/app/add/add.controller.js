'use strict';

angular.module('YaDespesas')
  .controller('AddCtrl', function($scope, moment) {
    //Init
    $scope.userNames = ['Zé', 'Susana'];
    $scope.expensiveTypes = ['Individual', 'Colectiva'];
    // $scope.percentageTypes = ['50-50', '70-30'];
    $scope.descriptions = ['Renda', 'Internet', 'Água', 'Luz', 'Gás', 'Alimentação', 'Casa', 'Lazer', 'Outros'];

    //display on 1st load
    $scope.user = {
      value: null,
      name: $scope.userNames[0],
      expensiveType: $scope.expensiveTypes[0],
      description: null
    }

    $scope.currentData = moment().format('D MMMM YYYY');

    $scope.OnClickSend = function(user) {
      var now = moment();
      console.log('Sending Data: ', user);
      console.log('Sending Time: ', now.toString());
      //moment(new Date(now.toString())

      $scope.user.description = null;
      $scope.user.value = null;
    }
  });
