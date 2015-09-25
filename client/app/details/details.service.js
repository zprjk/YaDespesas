'use strict';

angular.module('YaDespesas')
  .service('api', function api($http, $q, $ionicBackdrop, $ionicLoading, _) {
    var baseEndpoint = 'http://localhost:3000/api';

    this.Add = function(data, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Post(baseEndpoint + '/expenses/add', data)
        .then(function() {
          deferred.resolve();
          return cb();
        })

      return deferred.promise;
    }

    this.GetYears = function(callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Get(baseEndpoint + '/expenses')
        .then(function(years) {

          deferred.resolve(years);
          return cb();
        });

      return deferred.promise;
    }

    this.GetMonths = function(year, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Get(baseEndpoint + '/expenses/' + year)
        .then(function(months) {

          deferred.resolve(months);
          return cb();
        });

      return deferred.promise;
    }

    this.GetMonthValues = function(year, month, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Get(baseEndpoint + '/expenses/' + year + '/' + month)
        .then(function(months) {

          deferred.resolve(months);
          return cb();
        });

      return deferred.promise;
    }

    this.DeleteEntry = function(entry, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Post(baseEndpoint + '/expenses/remove/entry', entry)
        .then(function() {

          deferred.resolve();
          return cb();
        });

      return deferred.promise;
    }

    this.GetUsers = function(callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Get(baseEndpoint + '/users')
        .then(function(users) {

          deferred.resolve(users);
          return cb();
        });

      return deferred.promise;
    }

    this.GetDebts = function(callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Get(baseEndpoint + '/expenses/debts')
        .then(function(debts) {

          deferred.resolve(debts);
          return cb();
        });

      return deferred.promise;
    }

    this.SetDebts = function(data, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      _Post(baseEndpoint + '/expenses/debts', data)
        .then(function() {
          deferred.resolve();
          return cb();
        })

      return deferred.promise;
    }

    //********* PRIVATE functions **********
    var _Get = function(url) {
      var deferred = $q.defer();

      $ionicLoading.show();

      $http.get(url)
        .success(function(data) {
          $ionicLoading.hide();
          console.log('GET', url, data);

          deferred.resolve(data);
        })
        .error(function(err) {
          console.error(err);

          if(_.isObject(err))
            err = JSON.stringify(err,null,1);

          $ionicLoading.show({
            template: '<b class="assertive">ERROR</b><br/>' + err,
            // duration: 4000
          });
          deferred.reject(err);
        });

      return deferred.promise;
    }

    var _Post = function(url, data) {
      var deferred = $q.defer();

      $ionicLoading.show();

      $http.post(url, data)
        .success(function() {
          $ionicLoading.hide();
          console.log('POST', url, data);

          deferred.resolve();
        })
        .error(function(err) {
          console.error(err);

          if(_.isObject(err))
            err = JSON.stringify(err,null,2);

          $ionicLoading.show({
            template: '<b class="assertive">ERROR</b><br/>' + err,
            // duration: 4000
          });
          deferred.reject(err);
        });

      return deferred.promise;
    }

    // var _Delete = function(url) {
    //   var deferred = $q.defer();

    //   $ionicLoading.show();

    //   $http.delete(url)
    //     .success(function() {
    //       $ionicLoading.hide();
    //       console.log('DELETE', url);

    //       deferred.resolve();
    //     })
    //     .error(function(err) {
    //       console.error(err);

    //       if(_.isObject(err))
    //         err = JSON.stringify(err,null,2);

    //       $ionicLoading.show({
    //         template: '<b class="assertive">ERROR</b><br/>' + err,
    //         // duration: 4000
    //       });
    //       deferred.reject(err);
    //     });

    //   return deferred.promise;
    // }
  });
