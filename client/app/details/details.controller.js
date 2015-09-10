'use strict';

angular.module('YaDespesas')
  .controller('DetailsCtrl', function($scope, api) {
  	//Get data
    api.GetYears()
      .then(function(years) {
        $scope.years = years;
      });
  });
