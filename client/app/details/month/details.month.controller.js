'use strict';

angular.module('YaDespesas')
  .controller('DetailsMonthCtrl', function($scope, $stateParams, api, moment, _, users, $ionicPopup) {
    $scope.year = $stateParams.year;
    $scope.month = moment(new Date($stateParams.year, $stateParams.month)).format('MMMM');

    //Get Data
    api.GetMonthValues($stateParams.year, $stateParams.month)
      .then(function(monthValues) {
        var colective = [];
        var individual = [];
        var totals = [];

        //init
        totals = _.map(users, function(user) {
          return {
            username: user,
            total: 0
          }
        });

        individual = _.map(users, function(user) {
          return {
            username: user,
            total: 0,
            entries: []
          }
        });

        colective = _.chain(monthValues).pluck('percentage').uniq()
          .map(function(perc) {
            if (perc === '100')
              return null;
            return {
              percentage: perc,
              total: 0,
              entries: []
            }
          }).compact().value();

        //fill data
        _.forEach(monthValues, function(mv) {
          if (mv.percentage === '100') {
            var user = _.find(individual, {
              'username': mv.username
            });

            user.entries.push({
              value: mv.value,
              description: mv.description,
              date: moment(new Date(mv.date)).format('(YYYY M) D - HH:MM'),
              id: mv.id
            });

            user.total += mv.value;

            return;
          }

          var colectiveType = _.find(colective, {
            'percentage': mv.percentage
          });

          colectiveType.entries.push({
            value: mv.value,
            description: mv.description,
            date: moment(new Date(mv.date)).format('(YYYY M) D - HH:MM'),
            id: mv.id
          });

          colectiveType.total += mv.value;
        });

        var he = _.find(totals, {
          'username': users[0]
        });

        var she = _.find(totals, {
          'username': users[1]
        });

        _.forEach(colective, function(colType) {
          var percentage = colType.percentage.split('-'); //% "HE-SHE" -> "70-30"

          he.total += colType.total * (percentage[0] / 100);
          she.total += colType.total * (percentage[1] / 100);
        });

        _.forEach(individual, function(user) {
          if (user.username === he.username)
            he.total += user.total;

          if (user.username === she.username)
            she.total += user.total;
        });

        // console.log('colective', colective);
        // console.log('individual', individual);
        // console.log('totals', totals);
        $scope.colective = colective;
        $scope.individual = individual;
        $scope.totals = totals;
      });

    //Popup
    $scope.ConfirmDelete = function(entry, index, type) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmação',
        template: 'Tens a certeza que queres eliminar?',
        cancelText: 'Não',
        okText: 'Sim'
      });
      confirmPopup.then(function(res) {
        if (res) 
          Delete(entry, index, type);
      });
    };

    //delete entry
    function Delete(entry, index, type) {
      api.DeleteEntry(entry.id)
        .then(function() {
          console.log(entry, index, type);

          if (type === '50-50' || type === '70-30') { //TODO FIX this crap. re-do the whole controller.
            _.find($scope.colective, {
              'percentage': type
            }).entries.splice(index, 1);
          } else {
            _.find($scope.individual, {
              'username': type
            }).entries.splice(index, 1);
          }
        });
    }
  });
