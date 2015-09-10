'use strict';

angular.module('YaDespesas')
  .service('api', function serverData($http, $q) {

    this.GetYears = function(callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      // $http.get('/api/years')
      //   .success(function(years) {
      //     console.log('data', years);

      //     deferred.resolve(years);
      //     return cb();
      //   })
      //   .error(function(err) {
      //     console.error('error getting game data ', err);
      //     deferred.reject(err);
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

      // $http.get('/api/months/' + year)
      //   .success(function(months) {
      //     console.log('data', months);

      //     deferred.resolve(months);
      //     return cb();
      //   })
      //   .error(function(err) {
      //     console.error('error getting game data ', err);
      //     deferred.reject(err);
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

      // $http.get('/api/monthvalues/' + year + '/' + month)
      //   .success(function(monthValues) {
      //     console.log('data', monthValues);

      //     deferred.resolve(monthValues);
      //     return cb();
      //   })
      //   .error(function(err) {
      //     console.error('error getting game data ', err);
      //     deferred.reject(err);
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
  });
