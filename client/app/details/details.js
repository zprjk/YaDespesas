'use strict';

angular.module('YaDespesas')
  .config(function($stateProvider) {
    $stateProvider
      .state('tab.details', { //ANOS
        url: '/details',
        views: {
          'tab-details': {
            templateUrl: 'app/details/details.html',
            controller: 'DetailsCtrl'
          }
        }
      })
      .state('tab.details-year', { //ANO
        url: '/details/:year',
        views: {
          'tab-details': {
            templateUrl: 'app/details/year/details.year.html',
            controller: 'DetailsYearCtrl'
          }
        }
      })
      .state('tab.details-month', { //MES
        url: '/details/:year/:month',
        views: {
          'tab-details': {
            templateUrl: 'app/details/month/details.month.html',
            controller: 'DetailsMonthCtrl'
          }
        }
      })
  });
