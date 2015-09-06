'use strict';

angular.module('YaDespesas')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.options', {
        url: '/options',
        views: {
          'tab-options': {
            templateUrl: 'app/options/options.html',
            controller: 'OptionsCtrl'
          }
        }
      })
  });
