'use strict';

angular.module('YaDespesas')
  .controller('DetailsMonthCtrl', function($scope, $stateParams, api, moment) {
    $scope.year = $stateParams.year;
    $scope.month = moment(new Date($stateParams.month)).format('MMMM');

    //Get Data
    api.GetMonthValues($scope.year, $scope.month)
      .then(function(monthValues) {
        $scope.monthValues = monthValues;

        $scope.colective5050 = monthValues.expenses.colective['50-50'];
        $scope.colective7030 = monthValues.expenses.colective['70-30'];

        $scope.individualZe = monthValues.expenses.individual['Zé'];
        $scope.individualSusana = monthValues.expenses.individual.Susana;

        $scope.debtsZe = monthValues.debts['Zé'];
        $scope.debtsSusana = monthValues.debts.Susana;
      });
  });
