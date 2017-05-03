angular.module('starter.controllers', ['starter.services', 'ionic', 'tabSlideBox'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })
  .controller('ProductCategoryCtrl', function ($scope, $ionicModal, $timeout) {

  })

  .controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate, MyServices) {
    $scope.homeoptions = {
      effect: 'fade',
      initialSlide: 0,
        loop: true,
        autoplay:2000
    }
    MyServices.getAllHomeData({}, function (data) {
      if (data.value) {
        $scope.homeSlider = data.data.HomeSlider;
        $scope.landingBanner = data.data.LandingBanner;
        // console.log($scope.homeSlider, $scope.landingBanner);
      } else {

      }
    })
    MyServices.getAllCollection({}, function (data) {
      if (data.value) {
        $scope.getcollection = data.data;
        // console.log($scope.homeSlider, $scope.landingBanner);
      } else {

      }
    })
    // $scope.slider = [
    //   'img/15.jpg',
    //   'img/23.jpg',
    //   'img/123.jpg'
    // ];
    $scope.allproduct = [{
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
  .controller('AboutUsCtrl', function ($scope, $ionicSlideBoxDelegate, MyServices) {

    //API call to get about us info
    MyServices.getAboutUs({
      _id: "58ef52312f7ea8299eb53c90"
    }, function (response) {
      if (response.value) {
        $scope.aboutUs = response.data.content;
        console.log(" $scope.aboutUs", $scope.aboutUs);
      } else {

      }
    });

  })
  .controller('ProductCtrl', function ($scope, $ionicSlideBoxDelegate,MyServices) {
    MyServices.getAllCollection({}, function (data) {
      if (data.value) {
        $scope.getcollection = data.data;
        // console.log($scope.homeSlider, $scope.landingBanner);
      } else {

      }
    })
  })
  .controller('ProductDetailCtrl', function ($scope, $ionicSlideBoxDelegate,$stateParams,MyServices) {
    $scope.title=$stateParams.title;
    MyServices.getOne($stateParams.id, function (data) {
      if (data.value) {
        $scope.getone = data.data;
        console.log($scope.getone);
      }
    })
    $scope.getcoll={};
    $scope.getcollect={};
    $scope.getcollect.collectionId=$stateParams.id;
    $scope.getcollect.skip=0;

    MyServices.getCollProduct($scope.getcollect, function (data) {
      if (data.value) {
        $scope.getcoll = data.data;
        console.log($scope.getcoll);
      }
    })
    $scope.stop=false;
    $scope.loadMore = function(){
        console.log("inside loadMore");
      $scope.getcollect.skip=$scope.getcollect.skip+10;
      console.log($scope.getcollect.skip);
      MyServices.getCollProduct($scope.getcollect, function (data) {
        if (data.value) {
          if(_.isEmpty(data.data)){
            $scope.stop=true;
          }else{
            $scope.getcoll=$scope.getcoll.concat(data.data);
            console.log($scope.getcoll);
          }

        }

      })
      $scope.$broadcast('scroll.infiniteScrollComplete');

    }
    $scope.slider = [
      'img/15.jpg',
      'img/23.jpg',
      'img/123.jpg'
    ];
  })
  .controller('CollectionDetailCtrl', function ($scope, $ionicSlideBoxDelegate,MyServices,$stateParams) {
    $scope.productId=$stateParams.productId;
    MyServices.getOneProductDetail($scope.productId, function (data) {
      if (data.value) {
        $scope.getoneproduct = data.data;
        console.log($scope.getoneproduct);
      }
    })
  })
  .controller('ContactUsCtrl', function ($scope, $ionicSlideBoxDelegate, MyServices) {
    $scope.formData = {};

    //API call to submit contact us data.
    $scope.submitForm = function (data) {
      console.log(data);
      MyServices.saveConatct(data, function (response) {
        if (response.value) {
          $state.reload();
          console.log("response.data", response.data);
          //   toastr.success("We will get back to you shortly.", "We have your query!");
        }
      })
      // $scope.formSubmitted = true;
    }

  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {});
