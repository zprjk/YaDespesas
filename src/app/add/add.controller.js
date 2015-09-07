'use strict';

angular.module('YaDespesas')
  .controller('AddCtrl', function($scope) {
    //Init
    $scope.who = ['Zé','Susana'];
    $scope.expensiveTypes = ['Individual', 'Colectiva'];
    // $scope.percentageTypes = ['50-50', '70-30'];
    $scope.descriptions = ['Renda', 'Internet', 'Água', 'Luz', 'Gás', 'Alimentação', 'Casa', 'Lazer', 'Outros'];

    $scope.whoSelected = $scope.who[0];
    $scope.expensiveTypeSelected = $scope.expensiveTypes[1];
    // $scope.percentageTypeSelected = $scope.percentageTypes[0];
    // $scope.descriptionSelected =  $scope.descriptions[1];

    $scope.Send = function() {
        console.log('Sending Data');
        // delete $scope.descriptionSelected;
        $scope.descriptionSelected = 'Luz';
    }
  });
