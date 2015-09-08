'use strict';

angular.module('YaDespesas')
  .controller('DetailsYearCtrl', function($scope, $stateParams) {

    $scope.months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];
    $scope.year = $stateParams.year;
  });
