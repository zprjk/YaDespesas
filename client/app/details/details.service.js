'use strict';

angular.module('YaDespesas')
  .service('api', function api($http, $q, $ionicBackdrop, $ionicLoading) {
    var baseEndpoint = 'http://localhost:3000/api'

    this.Add = function(data, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post(baseEndpoint + '/expenses/add', data)
        .success(function() {
          deferred.resolve();
        })
        .error(function(err) {
          deferred.reject(err);
        })

      return deferred.promise;
    }

    this.GetYears = function(callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      // _Get('/api/years')
      //   .then(function(years) {
      //     deferred.resolve(years);
      //     return cb();
      //   });

      //TEMP
      setTimeout(function() {
        var years = [2015, 2014, 2013];

        deferred.resolve(years);
        return cb();
      }, 0);

      return deferred.promise;
    }

    this.GetMonths = function(year, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      console.log('GetMonths: ' + year);

      // _Get('/api/months/' + year)
      //   .then(function(years) {
      //     deferred.resolve(years);
      //     return cb();
      //   });

      //TEMP
      setTimeout(function() {
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

        deferred.resolve(months);
        return cb();
      }, 0);

      return deferred.promise;
    }

    this.GetMonthValues = function(year, month, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      console.log('GetMonthValues: ' + year, month);

      // _Get('/api/monthvalues/' + year + '/' + month)
      //   .then(function(years) {
      //     deferred.resolve(years);
      //     return cb();
      //   });

      //TEMP
      setTimeout(function() {
        var monthValues = {
          "year": 2015,
          "month": 1,
          "expenses": {
            "colective": {
              "50-50": {
                "entries": [{
                  "id": 1,
                  "value": 5.96,
                  "description": "Alimentação",
                  "date": "momentjs"
                }, {
                  "id": 2,
                  "value": 10.96,
                  "description": "Alimentação"
                }, {
                  "id": 3,
                  "value": 15.32,
                  "description": "Lazer"
                }],
                "total": 300
              },
              "70-30": {
                "entries": [{
                  "id": 1,
                  "value": 550,
                  "description": "Renda"
                }, {
                  "id": 2,
                  "value": 28.39,
                  "description": "Água"
                }, {
                  "id": 3,
                  "value": 16.92,
                  "description": "Luz"
                }],
                "total": 100
              }
            },
            "individual": {
              "Zé": {
                "entries": [{
                  "id": 1,
                  "value": 5,
                  "description": ""
                }, {
                  "id": 2,
                  "value": 2.39,
                  "description": "lazer"
                }, {
                  "id": 3,
                  "value": 1.92,
                  "description": ""
                }],
                "total": 200
              },
              "Susana": {
                "entries": [{
                  "id": 1,
                  "value": 2,
                  "description": ""
                }, {
                  "id": 2,
                  "value": 9.99,
                  "description": ""
                }, {
                  "id": 3,
                  "value": 11.2,
                  "description": "roupa"
                }],
                "total": 100
              }
            }
          },
          "debts": {
            "Zé": 0,
            "Susana": 150
          }
        };

        deferred.resolve(monthValues);
        return cb();
      }, 0);

      return deferred.promise;
    }

    //********* PRIVATE functions **********
    var _Get = function(url) {
      var deferred = $q.defer();

      $ionicLoading.show();

      $http.get(url)
        .success(function(data) {
          $ionicLoading.hide();
          console.log(url, data);

          deferred.resolve(data);
        })
        .error(function(err) {
          console.error('error getting game data ', err);
          $ionicLoading.show({
            template: '<b class="assertive">ERROR: </b>' + err,
            // duration: 4000
          });
          deferred.reject(err);
        });

      return deferred.promise;
    }
  });
