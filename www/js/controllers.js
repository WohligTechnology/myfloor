angular.module('starter.controllers', ['starter.services','ionic','tabSlideBox'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})
.controller('ProductCategoryCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope,$ionicSlideBoxDelegate,MyServices) {

  MyServices.getAllHomeData({}, function (data) {
           if (data.value) {
               $scope.homeSlider = data.data.HomeSlider;
               $scope.landingBanner = data.data.LandingBanner;
               // console.log($scope.homeSlider, $scope.landingBanner);
           } else {

           }
       })
$scope.slider=[
  'img/15.jpg',
  'img/23.jpg',
  'img/123.jpg'
];
$scope.allproduct=[
    {
    title1: "Chalet",

    image: "img/123.jpg"
},
    {
    title1: "Vintage Loft",
    image: "img/124.jpg"
},
    {
    title1: "Saltbox",
    image: "img/12.jpg"
},
    {
    title1: "Gallery",
    image: "img/12.jpg"
},
    {
    title1: "Brick & Board",
    image: "img/12.jpg"
},
    {
    title1: "Storehouse Plank",
    image: "img/12.jpg"
},
    {
    title1: "Eighteen Seventy-Five",
    image: "img/23.jpg"

},
    {
    title1: "Ponderosa",
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
