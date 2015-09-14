'use strict';

angular.module('YaDespesas')
  .controller('AddCtrl', function($scope, moment, _, api, users) {
    //Init
    $scope.userNames = users;
    $scope.expensiveTypes = ['Individual', 'Colectiva'];
    $scope.descriptions = [ //only shown for colective expensive type
      {
        name: 'Renda',
        percentage: '70-30'
      }, {
        name: 'Internet',
        percentage: '70-30'
      }, {
        name: 'Água',
        percentage: '70-30'
      }, {
        name: 'Luz',
        percentage: '70-30'
      }, {
        name: 'Gás',
        percentage: '70-30'
      }, {
        name: 'Alimentação',
        percentage: '50-50'
      }, {
        name: 'Casa',
        percentage: '50-50'
      }, {
        name: 'Lazer',
        percentage: '50-50'
      }, {
        name: 'Outros',
        percentage: '50-50'
      }
    ];

    //Display on 1st load
    $scope.user = {
      value: null,
      name: $scope.userNames[0],
      expensiveType: $scope.expensiveTypes[0],
      description: null
    };

    //Display date
    $scope.currentDate = moment().format('D MMMM YYYY');

    $scope.OnClickSend = function(user) {
    	if(user.expensiveType === 'Colectiva' && user.description === null) {
    		return;
    	}

      var now = moment(); //moment(new Date(now.toString())
      var percentage = 100;

      if(user.expensiveType === 'Colectiva') {
      	percentage = _.find($scope.descriptions,{'name': user.description}).percentage;
      	console.log(percentage);
      }

      var output = _.clone(user);
      output.percentage = percentage;
      output.date = now;

      console.log('Sending Data: ', output);

      api.Add(output).then(function() {
        $scope.user.description = null;
        $scope.user.value = null;
      });
    }
  });
