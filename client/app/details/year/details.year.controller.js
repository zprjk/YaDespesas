'use strict';

angular.module('YaDespesas')
  .controller('DetailsYearCtrl', function($scope, $stateParams, api, _, moment, manager) {
    $scope.year = $stateParams.year;

    //Get Data
    function fetchData() {
      api.GetMonths($stateParams.year)
        .then(function(months) {
          $scope.months = [];
          
          $scope.months = _.map(months, function(month) {
            var monthName = moment(new Date($scope.year, month.id)).format('MMMM');
            return {
              id: month.id,
              name: monthName
            }
          });
        });
    }
    
    fetchData();

    $scope.$on('$ionicView.enter', function() {
      if(!manager.isMonthViewUpdated())
        fetchData();
    });
  });
