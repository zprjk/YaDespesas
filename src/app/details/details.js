'use strict';

angular.module('YaDespesas')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.details', {
        url: '/details',
        views: {
          'tab-details': {
            templateUrl: 'app/details/details.html',
            controller: 'DetailsCtrl'
          }
        }
      })
  });
