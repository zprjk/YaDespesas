'use strict';

angular.module('YaDespesas')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.debts', {
        url: '/debts',
        views: {
          'tab-options': {
            templateUrl: 'app/debts/debts.html',
            controller: 'DebtsCtrl'
          }
        }
      })
  });
