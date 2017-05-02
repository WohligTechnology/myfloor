// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // .state('app.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

  // .state('app.browse', {
  //   url: '/browse',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/browse.html'
  //     }
  //   }
  // })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'

      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('app.state', {
    url: '/state',
    views: {
      'menuContent': {
        templateUrl: 'templates/state.html',
        controller: 'StateCtrl'
      }
    }
  })

  .state('app.institute', {
    url: '/institute',
    views: {
      'menuContent': {
        templateUrl: 'templates/institute.html',
        controller: 'InstituteCtrl'
      }
    }
  })

  .state('app.project', {
    url: '/project',
    views: {
      'menuContent': {
        templateUrl: 'templates/project.html',
        controller: 'ProjectCtrl'
      }
    }
  })

  .state('app.fundFlow', {
    url: '/fund-flow',
    views: {
      'menuContent': {
        templateUrl: 'templates/fund-flow.html',
        controller: 'FundFlowCtrl'
      }
    }
  })

  .state('app.milestones', {
    url: '/milestones',
    views: {
      'menuContent': {
        templateUrl: 'templates/milestones.html',
        controller: 'MilestonesCtrl'
      }
    }
  })

  .state('app.utilization', {
    url: '/utilization',
    views: {
      'menuContent': {
        templateUrl: 'templates/utilization.html',
        controller: 'UtilizationCtrl'
      }
    }
  })

  .state('app.projectPhotos', {
      url: '/project-photos',
      views: {
        'menuContent': {
          templateUrl: 'templates/project-photos.html',
          controller: 'ProjectPhotosCtrl'
        }
      }
    })
    // .state('app.single', {
    //   url: '/playlists/:playlistId',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/playlist.html',
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
