angular.module('starter.controllers', ['ionic','tabSlideBox'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope,$ionicSlideBoxDelegate) {
$scope.slider=[
  'img/15.jpg',
  'img/23.jpg',
  'img/123.jpg'
];
$scope.allproduct=[
    {
    title1: "Engineered",
    title2: "Flooring",
    image: "img/123.jpg"
},
    {
    title1: "Exterior",
    title2: "Decking",
    image: "img/124.jpg"
},
    {
    title1: "Laminate ",
    title2: "Range",
    image: "img/12.jpg"
},
    {
    title1: "Laminate ",
    title2: "Range",
    image: "img/23.jpg"
}

]
})
.controller('AboutUsCtrl', function($scope,$ionicSlideBoxDelegate) {

})
.controller('ProductCtrl', function($scope,$ionicSlideBoxDelegate) {

})
.controller('ProductDetailCtrl', function($scope,$ionicSlideBoxDelegate) {
    $scope.slider=[
      'img/15.jpg',
      'img/23.jpg',
      'img/123.jpg'
    ];
})
.controller('CollectionDetailCtrl', function($scope,$ionicSlideBoxDelegate) {
  
})
.controller('ContactUsCtrl', function($scope,$ionicSlideBoxDelegate) {

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
