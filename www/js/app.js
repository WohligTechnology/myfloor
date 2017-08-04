// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'tabSlideBox'])
  // var app = angular.module('slidebox', ['ionic', 'tabSlideBox']);

  .run(function ($ionicPlatform, $state) {
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
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($.jStorage.get('profile')) {
        if ($state.current.name == "app.home") {
          navigator.app.exitApp(); //<-- remove this line to disable the exit
        } else {
          window.history.back();
        }
      } else {
        if ($state.current.name == "login") {
          navigator.app.exitApp();
        } else {
          window.history.back();
        }
      }
    }, 100);
  })

  .config(function ($stateProvider, $urlRouterProvider) {
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
            templateUrl: 'templates/search.html',
            controller: 'SearchCtrl'
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
      .state('app.wishlist', {
        cache: false,
        url: '/wishlist',
        views: {
          'menuContent': {
            templateUrl: 'templates/wishlist.html',
            controller: 'WishListCtrl'
          }
        }
      })
      .state('app.product-detail', {
        cache: false,
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

      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      })

      .state('app.productinner', {
        url: '/productinner/:title/:id/:subCat',
        views: {
          'menuContent': {
            templateUrl: 'templates/productinner.html',
            controller: 'ProductInnerCtrl'
          }
        }
      })


      .state('signup', {
        url: '/signup',
        cache: false,
        templateUrl: 'templates/signup.html',
        controller: 'SignupCtrl'
      })


      .state('app.media', {
        url: '/media',
        views: {
          'menuContent': {
            templateUrl: 'templates/media.html',
            controller: 'MediaCtrl'
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
    $urlRouterProvider.otherwise('/login');
  })
  .directive('youtube', function ($sce) {
    return {
      restrict: 'A',
      scope: {
        code: '='
      },
      replace: true,
      template: '<iframe id="popup-youtube-player" style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowscriptaccess="always"></iframe>',
      link: function (scope) {
        scope.$watch('code', function (newVal) {
          if (newVal) {
            scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
          }
        });
      }
    };
  })
  .filter('uploadpath', function () {
    return function (input, width, height, style) {
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
  })

  .filter('downloadImage', function () {
    return function (input) {
      if (input) {
        return adminurl + "download/" + input;
      } else {
        return "img/logo.png";
      }
    };
  })


  .directive("limitTo", [function () {
    return {
      restrict: "A",
      link: function (scope, elem, attrs) {
        var limit = parseInt(attrs.limitTo);
        angular.element(elem).on("keypress", function (e) {
          if (this.value.length == limit) e.preventDefault();
        });
      }
    }
  }]);
