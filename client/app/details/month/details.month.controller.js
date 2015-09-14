'use strict';

angular.module('YaDespesas')
  .controller('DetailsMonthCtrl', function($scope, $stateParams, api, moment, _) {
    $scope.year = $stateParams.year;
    $scope.month = moment(new Date($stateParams.month)).format('MMMM');

    //Get Data
    api.GetMonthValues($stateParams.year, $stateParams.month)
      .then(function(monthValues) {

        var colective = [];
        var individual = [];
        var totals = [];

        _.forEach(monthValues, function(mv) {
          if (mv.percentage === '100') {
            var userExists = _.find(individual, {
              'username': mv.username
            });

            if (!userExists) {
              individual.push({
                username: mv.username,
                total: 0,
                entries: []
              });

              totals.push({
                username: mv.username,
                total: 0
              });
            }

            var user = _.find(individual, {
              'username': mv.username
            });

            user.entries.push({
              value: mv.value,
              description: mv.description,
              date: moment(new Date(mv.date)).format('D - HH:MM')
            });

            user.total += mv.value;

            return;
          }

          var percentageExists = _.find(colective, {
            'percentage': mv.percentage
          });

          if (!percentageExists) {
            colective.push({
              percentage: mv.percentage,
              total: 0,
              entries: []
            });
          }

          var colectiveType = _.find(colective, {
            'percentage': mv.percentage
          });

          colectiveType.entries.push({
            value: mv.value,
            description: mv.description,
            date: moment(new Date(mv.date)).format('D - HH:MM')
          });

          colectiveType.total += mv.value;
        });

        //TODO hardwire - FIX THIS
        _.forEach(colective, function(colType) {
          var percentage = colType.percentage.split('-'); //% "HE-SHE" -> "70-30"

          var he = _.find(totals, {
            'username': 'Zé'
          });

          var she = _.find(totals, {
            'username': 'Susana'
          });

          if (he)
            he.total += colType.total * (percentage[0] / 100);

          if (she)
            she.total += colType.total * (percentage[1] / 100);
        });

        //TODO hardwire - FIX THIS - BUG - EU PRECISO DE IR BUSCAR AS USERS Á DB 
        //TODO hardwire - FIX THIS - BUG - EU PRECISO DE IR BUSCAR AS USERS Á DB 
        _.forEach(individual, function(user) {
          var he = _.find(totals, {
            'username': 'Zé'
          });

          var she = _.find(totals, {
            'username': 'Susana'
          });

          if (user.username === 'Zé' && he)
            he.total += user.total;

          if (user.username === 'Susana' && she)
            she.total += user.total;
        });

        console.log('colective', colective);
        console.log('individual', individual);
        console.log('totals', totals);

        $scope.colective = colective;
        $scope.individual = individual;
        $scope.totals = totals;
      });
  });
