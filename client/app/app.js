'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('YaDespesas', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

//Inject Third Party plugins
.constant('moment', moment)
.constant('_', window._)
.constant('$ionicLoadingConfig', {
  template: '<p>Carregando</p><ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>'
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, moment) {
  //momentjs set default language
  moment.locale('pt');

  //CORS
  // $httpProvider.defaults.useXDomain = true;
  // $httpProvider.defaults.withCredentials = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  // $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'components/tabs/tabs.html'
  })

  // Each tab has its own nav history stack:
  // Example:
  // .state('tab.add', {
  //   url: '/add',
  //   views: {
  //     'tab-add': {
  //       templateUrl: 'app/add/add.html',
  //       controller: 'AddCtrl'
  //     }
  //   }
  // })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/add');
});
