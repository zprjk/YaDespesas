'use strict';

angular.module('YaDespesas')
  .controller('AddCtrl', function($scope) {
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

    $scope.master = angular.copy($scope.user);

    $scope.OnClickSend = function(user) {
      console.log('Sending Data', user);

      $scope.user.description = null;
      $scope.user.value = null;
    }
  });
