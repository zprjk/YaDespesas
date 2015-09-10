'use strict';

angular.module('YaDespesas')
  .controller('DetailsYearCtrl', function($scope, $stateParams, api, _, moment) {
    $scope.year = $stateParams.year;

    //Get Data
    api.GetMonths($scope.year)
      .then(function(months) {
        $scope.months = [];
        
        $scope.months = _.map(months, function(monthId) {
        	var monthName = moment(new Date(monthId)).format('MMMM');

        	return {
        		id: monthId,
        		name: monthName
        	}
        });
      });
  });
