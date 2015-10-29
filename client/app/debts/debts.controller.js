'use strict';

angular.module('YaDespesas')
  .controller('DebtsCtrl', function($scope, api, $ionicPopup, _, manager) {
    var initialDebts = [];

     //Get Data
    function fetchData() {
      api.GetDebts()
        .then(function(debts) {
          initialDebts = angular.copy(debts);
          $scope.debts = debts;
        });
    }

    fetchData();

    //Popup
    $scope.ConfirmUpdate = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmação',
        template: 'Tens a certeza que queres atualizar os valores de débitos?',
        cancelText: 'Não',
        okText: 'Sim'
      });
      confirmPopup.then(function(res) {
        if (res)
          update($scope.debts);
      });
    };

    $scope.ShowUpdateButton = function() {
      var show = false;

      _.forEach($scope.debts, function(debt, i) {
        if (Number(debt.value) !== Number(initialDebts[i].value))
          show = true;
      });

      return show;
    }

    function update(debts) {
      console.log('new debts', debts);
      api.SetDebts(debts)
        .then(function() {
        	initialDebts = angular.copy($scope.debts);
        });
    }

    $scope.$on('$ionicView.enter', function() {
      if(!manager.isDebtViewUpdated())
        fetchData();
    });
  });
