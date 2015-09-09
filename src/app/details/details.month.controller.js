'use strict';

angular.module('YaDespesas')
  .controller('DetailsMonthCtrl', function($scope, $stateParams) {

    $scope.month = $stateParams.month;
    $scope.year = $stateParams.year;

    $scope.data = {
      "year": 2015,
      "month": 1,
      "expenses": {
        "colective": {
          "50-50": {
            "entries": [{
              "id": 1,
              "value": 5.96,
              "description": "Alimentação",
              "date": "momentjs"
            }, {
              "id": 2,
              "value": 10.96,
              "description": "Alimentação"
            }, {
              "id": 3,
              "value": 15.32,
              "description": "Lazer"
            }],
            "total": 300
          },
          "70-30": {
            "entries": [{
              "id": 1,
              "value": 550,
              "description": "Renda"
            }, {
              "id": 2,
              "value": 28.39,
              "description": "Água"
            }, {
              "id": 3,
              "value": 16.92,
              "description": "Luz"
            }],
            "total": 100
          }
        },
        "individual": {
          "Zé": {
            "entries": [{
              "id": 1,
              "value": 5,
              "description": ""
            }, {
              "id": 2,
              "value": 2.39,
              "description": "lazer"
            }, {
              "id": 3,
              "value": 1.92,
              "description": ""
            }],
            "total": 200
          },
          "Susana": {
            "entries": [{
              "id": 1,
              "value": 2,
              "description": ""
            }, {
              "id": 2,
              "value": 9.99,
              "description": ""
            }, {
              "id": 3,
              "value": 11.2,
              "description": "roupa"
            }],
            "total": 100
          }
        }
      },
      "debts": {
        "Zé": 0,
        "Susana": 150
      }
    };

    console.log($scope.data);
    $scope.colective5050 = $scope.data.expenses.colective['50-50'];
    $scope.colective7030 = $scope.data.expenses.colective['70-30'];

    $scope.individualZe = $scope.data.expenses.individual['Zé'];
    $scope.individualSusana = $scope.data.expenses.individual['Susana'];

    $scope.debtsZe = $scope.data.debts['Zé'];
    $scope.debtsSusana = $scope.data.debts['Susana'];
  });
