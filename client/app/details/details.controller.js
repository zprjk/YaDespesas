'use strict';

angular.module('YaDespesas')
  .controller('DetailsCtrl', function($scope, api, _, manager) {
  	//Get data
  	function fetchData() {
  		api.GetYears()
	      .then(function(years) {
	        $scope.years = _.pluck(years, 'id');
	      });
  	}
    
    fetchData();

    $scope.$on('$ionicView.enter', function() {
      if(!manager.isMonthViewUpdated())
        fetchData();
    });
  });
