'use strict';

angular.module('YaDespesas')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.add', {
        url: '/add',
        views: {
          'tab-add': {
            templateUrl: 'app/add/add.html',
            controller: 'AddCtrl'
          }
        }
      })
  });
