// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','tabSlideBox'])
// var app = angular.module('slidebox', ['ionic', 'tabSlideBox']);

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.product-category', {
      url: '/product-category',
      views: {
        'menuContent': {
          templateUrl: 'templates/product-category.html',
          controller: 'ProductCategoryCtrl'

        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.product', {
      url: '/product',
      views: {
        'menuContent': {
          templateUrl: 'templates/product.html',
          controller: 'ProductCtrl'
        }
      }
    })
    .state('app.product-detail', {
      url: '/product-detail/:title/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })
    .state('app.collection-detail', {
      url: '/collection-detail/:productId',
      views: {
        'menuContent': {
          templateUrl: 'templates/collection-detail.html',
          controller: 'CollectionDetailCtrl'
        }
      }
    })
    .state('app.about-us', {
      url: '/about-us',
      views: {
        'menuContent': {
          templateUrl: 'templates/about-us.html',
          controller: 'AboutUsCtrl'
        }
      }
    })
    .state('app.contact-us', {
      url: '/contact-us',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact-us.html',
          controller: 'ContactUsCtrl'
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
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.filter('uploadpath', function() {
        return function(input, width, height, style) {
            var other = "";
            if (width && width != "") {
                other += "&width=" + width;
            }
            if (height && height != "") {
                other += "&height=" + height;
            }
            if (style && style != "") {
                other += "&style=" + style;
            }
            if (input) {
                if (input.indexOf('https://') == -1) {
                    return imgpath + input + other;

                } else {
                    return input;
                }
            }
        };
    });
