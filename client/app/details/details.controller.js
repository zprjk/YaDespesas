'use strict';

angular.module('YaDespesas')
  .controller('DetailsCtrl', function($scope, api, _) {
  	//Get data
    api.GetYears()
      .then(function(years) {
        $scope.years = _.pluck(years, 'id');
      });
  });
