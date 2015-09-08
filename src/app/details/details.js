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
      .state('tab.details-year', {
        url: '/details/:year',
        views: {
          'tab-details': {
            templateUrl: 'app/details/details.year.html',
            controller: 'DetailsYearCtrl'
          }
        }
      })
      .state('tab.details-month', {
        url: '/details/:year/:month',
        views: {
          'tab-details': {
            templateUrl: 'app/details/details.month.html',
            controller: 'DetailsMonthCtrl'
          }
        }
      })
  });
