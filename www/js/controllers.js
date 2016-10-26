angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope,$ionicSlideBoxDelegate) {
$scope.slider=[
  'img/4.jpg',
  'img/2.jpg',
  'img/3.jpg'
]
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
