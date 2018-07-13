var initMap = function () {};
angular.module('starter.controllers', ['starter.services', 'ionic', 'tabSlideBox', 'ngCordova'])
  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
    $scope.logout = function () {
      // alert("hi");
      $.jStorage.flush();
      $state.go('login')
    }
  })
  .controller('ProductCategoryCtrl', function ($scope, $ionicModal, $timeout) {

  })
  .controller('MediaCtrl', function ($scope, $ionicModal, $timeout, MyServices, $filter) {
    $scope.getdown = {};
    $scope.getdown.skip = 0;
    $scope.getvideo = {};
    $scope.getvideo.skip = 0;
    MyServices.getAllDownload($scope.getdown, function (data) {
      if (data.value) {
        $scope.getAllDownload = data.data;
        // console.log($scope.homeSlider, $scope.landingBanner);
      } else {

      }
    });
    MyServices.getAllVideo($scope.getvideo, function (data) {
      if (data.value) {
        $scope.getAllVideo = data.data;
        // console.log($scope.homeSlider, $scope.landingBanner);
      } else {

      }
    });

    var init = function () {
      return $ionicModal.fromTemplateUrl('templates/videomodal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;

      });
    };

    var options = "location=no,toolbar=yes";
    var target = "_blank";
    var url = "";

    $scope.openPDF = function (link) {
      // url = $filter('serverimage')(link);
      $scope.pdfURL = $filter('uploadpath')(link);
      $scope.finalURL = 'http://docs.google.com/gview?url=' + $scope.pdfURL + '&embedded=true';
      var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);

    };
    $scope.video = {};
    $scope.showVideo = function (url) {
      console.log(url);
      init().then(function () {
        $scope.modal.show();
      });
      $scope.video.url = url + "?autoplay=1";
    };


    $scope.closeVideo = function () {
      $scope.modal.remove()
        .then(function () {
          $scope.modal = null;
        });
    };

    $scope.loadMore = function (tab) {
      if (tab == '1') {
        console.log("inside loadMore");
        $scope.getvideo.skip = $scope.getvideo.skip + 10;
        console.log($scope.getvideo.skip);
        MyServices.getAllVideo($scope.getvideo, function (data) {
          if (data.value) {
            if (data.data.message == "No record found") {
              $scope.stop = true;
            } else {
              $scope.getAllVideo = $scope.getAllVideo.concat(data.data);
              console.log($scope.getAllVideo);
            }

          }

        })
      } else {
        console.log("inside loadMore");
        $scope.getdown.skip = $scope.getdown.skip + 10;
        console.log($scope.getdown.skip);
        MyServices.getAllDownload($scope.getdown, function (data) {
          if (data.value) {
            if (data.data.message == "No record found") {
              $scope.stop = true;
            } else {
              $scope.getAllDownload = $scope.getAllDownload.concat(data.data);
              console.log($scope.getAllDownload);
            }

          }

        })
      }


      $scope.$broadcast('scroll.infiniteScrollComplete');

    }
  })

  .controller('HomeCtrl', function ($scope, $ionicSlideBoxDelegate, MyServices, $ionicModal, $state, $ionicLoading) {

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.formData = {};
    $scope.thankyouMsg = null;
    //API call to submit contact us data.
    $scope.submitForm = function (data) {
      console.log(data);
      MyServices.saveConatct(data, function (response) {

        if (response.value) {
          //   $ionicModal.fromTemplateUrl('templates/videomodal.html', {
          //   scope: $scope,
          //   animation: 'slide-in-up'
          // }).then(function (modal) {
          //   $scope.modal = modal;

          // });
          $state.reload();
          $scope.formData = {};
          $scope.thankyouMsg = "Thank You. We will get back to you shortly."
          console.log("response.data", response.data);

          //   toastr.success("We will get back to you shortly.", "We have your query!");
        }
        $scope.formData = {};
      })
      // $scope.formSubmitted = true;
    }

    $ionicModal.fromTemplateUrl('templates/modal/enquire.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });


    $scope.homeSlider = {};
    $scope.homeSlider.data = [];
    $scope.homeSlider.currentPage = 0;

    MyServices.getAllHomeData({}, function (data) {
      if (data.value) {
        $scope.homeSlider.data = data.data.HomeSlider;
        $scope.landingBanner = data.data.LandingBanner;
        $ionicLoading.hide()
        // console.log($scope.homeSlider, $scope.landingBanner);
      } else {

      }
    });

    $scope.setupSlider = function () {

      //some options to pass to our slider
      $scope.homeSlider.sliderOptions = {
        initialSlide: 0,
        direction: 'horizontal', //or vertical
        speed: 300,
        pagination: false,
        effect: 'fade',
      };

      //create delegate reference to link with slider
      $scope.homeSlider.sliderDelegate = null;

      //watch our sliderDelegate reference, and use it when it becomes available
      $scope.$watch('homeSlider.sliderDelegate', function (newVal, oldVal) {
        if (newVal != null) {
          $scope.homeSlider.sliderDelegate.on('slideChangeEnd', function () {
            $scope.homeSlider.currentPage = $scope.homeSlider.sliderDelegate.activeIndex;
            //use $scope.$apply() to refresh any content external to the slider
            $scope.$apply();
          });
        }
      });
    };

    $scope.setupSlider();


    MyServices.getAllCollection({}, function (data) {
      if (data.value) {
        $scope.getcollection = data.data;
        $ionicLoading.hide()
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
      }, {
        title1: "Vintage Loft",
        image: "img/124.jpg"
      }, {
        title1: "Saltbox",
        image: "img/12.jpg"
      }, {
        title1: "Gallery",
        image: "img/12.jpg"
      }, {
        title1: "Brick & Board",
        image: "img/12.jpg"
      }, {
        title1: "Storehouse Plank",
        image: "img/12.jpg"
      }, {
        title1: "Eighteen Seventy-Five",
        image: "img/23.jpg"

      }, {
        title1: "Ponderosa",
        image: "img/23.jpg"
      }

    ]
    //mission
    MyServices.getAboutUs({
      _id: "593fd4f92bae30327e260222"
    }, function (response) {
      if (response.value) {
        $scope.mission = response.data.content;
        // console.log(" $scope.mission", $scope.mission);
      } else {

      }
    });

    //vission
    MyServices.getAboutUs({
      _id: "593fd4fe2bae30327e260223"
    }, function (response) {
      if (response.value) {
        $scope.vission = response.data.content;
        // console.log(" $scope.vission", $scope.vission);
      } else {

      }
    });
  })

  .controller('SearchCtrl', function ($scope, $state, $ionicSlideBoxDelegate, MyServices) {

    $scope.searchText = "";
    // $scope.productArray = [];
    // $scope.collectionArray = [];
    $scope.search = function (value) {
      console.log("value", value);
      $scope.isText = true;
      $scope.productArray = [];
      $scope.collectionArray = [];
      if (value.searchText != "") {
        MyServices.searchData({
          searchText: value
        }, function (data) {
          if (data.value) {
            $scope.productArray = data.data.product;
            $scope.collectionArray = data.data.collection;
          } else {
            $scope.productArray = [];
            $scope.collectionArray = [];
          }
        })
      }
    }

    //To search product
    $scope.getProduct = function (value) {
      var product = $scope.productArray[value];
      $state.go('app.collection-detail', {
        productId: product._id
      })
    };

    //To search Collection 
    $scope.getCollection = function (value) {
      var collection = $scope.collectionArray[value];
      $state.go('app.product-detail', {
        title: collection.name,
        id: collection._id
      })
    }
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
  .controller('ProductCtrl', function ($scope, $ionicSlideBoxDelegate, MyServices, $ionicLoading) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    MyServices.getAllCollection({}, function (data) {
      if (data.value) {
        $scope.getcollection = data.data;
        $ionicLoading.hide()
        // console.log($scope.homeSlider, $scope.landingBanner);
      } else {

      }
    })
  })
  .controller('ProductDetailCtrl', function ($scope, $timeout, $ionicPopup, $ionicSlideBoxDelegate, $stateParams, MyServices, $ionicLoading) {


    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });


    $scope.title = $stateParams.title;
    $scope.productBySubcat = [];
    $scope.getcoll = [];
    $scope.getcollect = {};
    $scope.getcollect.collectionId = $stateParams.id;
    // $scope.getcollect.skip = 0;

    $scope.start = false;

    MyServices.getOne($stateParams.id, function (data) {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      if (data.value) {
        $scope.getone = data.data;
        $scope.subCategory = $scope.getone.subcategories[0];
        $scope.getCollProduct();
        console.log($scope.getone);
        console.log("$scope.subCategory", $scope.subCategory);
        $ionicLoading.hide()
      }
    })


    $scope.addOrRemoveWishList = function (productId, status) {
      console.log("productId", productId);
      $scope.addwish = {};
      $scope.addwish.user = $.jStorage.get('profile')._id;
      $scope.addwish.product = productId;
      MyServices.addOrRemoveWishList($scope.addwish, function (data) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        if (data.value) {
          console.log(data.data);
          $scope.userid = {};
          $scope.userid._id = $.jStorage.get('profile')._id;
          if (status) {
            var myPopup = $ionicPopup.show({
              title: '',
              template: 'Product added into wishlist',
              scope: $scope,
              cssClass: 'wishlistPopup',
              buttons: []
            });
            myPopup.then(function (res) {});
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
          }
          MyServices.getWishList($scope.userid, function (data) {
            if (data.value) {
              console.log(data.data);
              $ionicLoading.hide()
            }
          })

        }
      })
    }


    $scope.getCollProduct = function () {
      MyServices.getCollProduct($scope.getcollect, function (data) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        // if (data.value) {
        //   $scope.getcoll = data.data;
        //   console.log($scope.getcoll);
        // }
        if (data.value) {
          $scope.getcoll = data.data;
          $scope.userid = {};
          $scope.userid._id = $.jStorage.get('profile')._id;
          MyServices.getWishList($scope.userid, function (data) {
            if (data.value) {
              $scope.wishlist = data.data.wishList;
              $ionicLoading.hide()
              _.each($scope.getcoll, function (n) {
                n.status = false;
                _.each($scope.wishlist, function (n1) {
                  if (n._id == n1.product._id) {
                    n.status = true;
                  }
                })
              })
              $scope.getcoll = _.groupBy($scope.getcoll, 'subCategory');
            }

          })

          // if (_.isEmpty(data.data)) {
          //   $scope.stop = true;
          // } else {
          //   // $scope.getcoll = $scope.getcoll.concat(data.data);
          //   if (data.data.length > 0) {
          //     _.each(data.data, function (n) {
          //       $scope.getcoll.push(n);
          //     })
          //     //  = $scope.getcoll.concat(data.data);
          //   }
          //   console.log($scope.getcoll);
          // }

          // $scope.getcollect.skip = $scope.getcollect.skip + 10;
          $scope.getCategoryProduct($scope.subCategory);
        }
      })
    }

    $scope.toggleGroup = function (group) {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
      $timeout(function () {
        $ionicLoading.hide()
      }, 2000)
    };




    $scope.isGroupShown = function (group) {
      return $scope.shownGroup === group;
    };
    $scope.stop = false;
    $scope.loadMore = function () {
      if ($scope.start) {
        console.log("inside loadMore");
        // $scope.getcollect.skip = $scope.getcollect.skip + 10;
        console.log($scope.getcollect.skip);
        // MyServices.getCollProduct($scope.getcollect, function (data) {
        //   if (data.value) {
        //     if (_.isEmpty(data.data)) {
        //       $scope.stop = true;
        //     } else {
        //       $scope.getcoll = $scope.getcoll.concat(data.data);
        //       console.log($scope.getcoll);
        //     }

        //   }

        // })
        $scope.getCollProduct();

      }
      $scope.start = true;
      $scope.$broadcast('scroll.infiniteScrollComplete');

    }
    $scope.slider = [
      'img/15.jpg',
      'img/23.jpg',
      'img/123.jpg'
    ];
    //
    // $scope.defaultSelectedVAT = $scope.getcoll[0]._id;

    //To get product by subcategory
    $scope.getCategoryProduct = function (value) {
      console.log("subCategory", value);
      if ($scope.subCategory != value) {
        $scope.productBySubcat = [];
        $scope.subCategory = value
      }
      // console.log(value,"value",$scope.collection);
      // $scope.subCatIndex = value;
      // console.log($scope.collection.subcategories[$scope.subCatIndex]);
      // var subcatName = $scope.collection.subcategories[$scope.subCatIndex];
      _.each($scope.getcoll, function (n) {
        var category = _.find($scope.productBySubcat, function (o) {
          if (n._id === o._id) {
            return o;
          }
        });
        if (category === undefined && n.subCategory == $scope.subCategory) {
          $scope.productBySubcat.push(n);
        }
        // else{
        //     _.pull($scope.productBySubcat, category);
        // }
        // if(n.subCategory == subcatName){
        //    ################## $scope.productBySubcat.push(n);
        // }
      })
    }


  })

  .controller('ProductInnerCtrl', function ($scope, $stateParams, MyServices) {
    $scope.title = $stateParams.title;
    $scope.productBySubcat = [];
    $scope.getcoll = [];
    $scope.getcollect = {};
    $scope.getcollect.collectionId = $stateParams.id;
    $scope.getcollect.skip = 0;
    $scope.getcollect.subCategory = $stateParams.subCat;
    $scope.start = false;

    // MyServices.getOne($stateParams.id, function (data) {
    //   if (data.value) {
    //     $scope.getone = data.data;
    //     $scope.subCategory = $scope.subcategories[0];
    //     $scope.getCollProduct();
    //     console.log($scope.getone);
    //     console.log("$scope.subCategory", $scope.subCategory);
    //   }
    // });


    $scope.getCollProduct = function () {
      MyServices.getCollProduct($scope.getcollect, function (data) {
        // if (data.value) {
        //   $scope.getcoll = data.data;
        //   console.log($scope.getcoll);
        // }
        if (data.value) {
          if (_.isEmpty(data.data)) {
            $scope.stop = true;
          } else {
            // $scope.getcoll = $scope.getcoll.concat(data.data);
            if (data.data.length > 0) {
              _.each(data.data, function (n) {
                n.status = false;
                $scope.getcoll.push(n);
              })
              //  = $scope.getcoll.concat(data.data);
            }
            console.log($scope.getcoll);
          }
          // $scope.getcollect.skip = $scope.getcollect.skip + 10;
          // $scope.getCategoryProduct($scope.subCategory);
          $scope.getCategoryProduct($stateParams.subCat);

        }
      })
    }


    $scope.stop = false;
    $scope.loadMore = function () {
      if ($scope.start) {
        console.log("inside loadMore");
        // $scope.getcollect.skip = $scope.getcollect.skip + 10;
        // console.log($scope.getcollect.skip);
        // MyServices.getCollProduct($scope.getcollect, function (data) {
        //   if (data.value) {
        //     if (_.isEmpty(data.data)) {
        //       $scope.stop = true;
        //     } else {
        //       $scope.getcoll = $scope.getcoll.concat(data.data);
        //       console.log($scope.getcoll);
        //     }

        //   }

        // })
        $scope.getCollProduct();

      }
      $scope.start = true;
      $scope.$broadcast('scroll.infiniteScrollComplete');

    }
    $scope.slider = [
      'img/15.jpg',
      'img/23.jpg',
      'img/123.jpg'
    ];
    //
    // $scope.defaultSelectedVAT = $scope.getcoll[0]._id;
    $scope.getCollProduct();

    //To get product by subcategory
    $scope.getCategoryProduct = function (value) {
      console.log("subCategory", value, $scope.getcoll);
      if ($scope.subCategory != value) {
        $scope.productBySubcat = [];
        $scope.subCategory = value
      }
      // console.log(value,"value",$scope.collection);
      // $scope.subCatIndex = value;
      // console.log($scope.collection.subcategories[$scope.subCatIndex]);
      // var subcatName = $scope.collection.subcategories[$scope.subCatIndex];


      // _.each($scope.getcoll, function (n) {
      //   console.log(n,'-----');
      //   var category = _.find($scope.productBySubcat, function (o) {
      //     if (n._id === o._id) {
      //       return o;
      //     }
      //   });
      //   if (category === undefined && n.subCategory == $scope.subCategory) {
      //     $scope.productBySubcat.push(n);
      //   }



      // else{
      //     _.pull($scope.productBySubcat, category);
      // }
      // if(n.subCategory == subcatName){
      //    ################## $scope.productBySubcat.push(n);
      // }
      // })
      $scope.productBySubcat = _.filter($scope.getcoll, ['subCategory', $stateParams.subCat]);
      console.log($scope.productBySubcat);

    }


  })

  .controller('CollectionDetailCtrl', function ($scope, $ionicSlideBoxDelegate, $cordovaSocialSharing, MyServices, $stateParams, $timeout, $ionicLoading, $filter) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $scope.productId = $stateParams.productId;
    MyServices.getOneProductDetail($scope.productId, function (data) {
      if (data.value) {
        $scope.getoneproduct = data.data;
        console.log($scope.getoneproduct);
        $ionicLoading.hide()
      }
    });
    $scope.share = function () {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
      $timeout(function () {

        $cordovaSocialSharing
          .share(message, subject, image, '') // Share via native share sheet
          .then(function (result) {
            $ionicLoading.hide();
            // Success!
            console.log("Success");

            console.log(result);
            console.log(image);
          }, function (err) {
            // An error occured. Show a message to the user
            console.log("error : " + err);
          });

        // window.plugins.socialsharing.shareWithOptions(image, result, err)
      }, 1000);
      var image = $filter("downloadImage")($scope.getoneproduct.texturerAndSceneImage);
      // var image = 'file://'+$filter("uploadpath")($scope.getoneproduct.swatchImage);
      // var image1 = $filter("uploadpath")($scope.getoneproduct.texturerAndSceneImage);
      console.log($scope.getoneproduct.texturerAndSceneImage, image);

      var subject = $scope.getoneproduct.name;
      var message = "name: " + $scope.getoneproduct.name + "\n" + "size :" + $scope.getoneproduct.size;
      console.log(image);

    };


  })
  .controller('ContactUsCtrl', function ($scope, $ionicSlideBoxDelegate, MyServices, $state, $timeout, $ionicPlatform, $cordovaInAppBrowser) {
    $scope.formData = {};
    $scope.thankyouMsg = null;

    //API call to submit contact us data.
    $scope.submitForm = function (data) {
      console.log(data);
      MyServices.saveConatct(data, function (response) {

        if (response.value) {
          //   $ionicModal.fromTemplateUrl('templates/videomodal.html', {
          //   scope: $scope,
          //   animation: 'slide-in-up'
          // }).then(function (modal) {
          //   $scope.modal = modal;

          // });
          $state.reload();
          $scope.formData = {};
          $scope.thankyouMsg = "Thank You. We will get back to you shortly."
          console.log("response.data", response.data);
          //   toastr.success("We will get back to you shortly.", "We have your query!");
        }
        $scope.formData = {};
      })
      // $scope.formSubmitted = true;
    }

    // $scope.openBrowser = function () {
    //   $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)

    //     .then(function (event) {
    //       // success
    //       console.log("Opened");
    //     })

    //     .catch(function (event) {
    //       // error
    //       console.log("Not Opened");
    //     });
    // }

    //To custome div on map
    function CenterControl(controlDiv, map) {

      // Set CSS for the control border.
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '3px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.marginBottom = '22px';
      controlUI.style.textAlign = 'center';
      controlUI.title = 'Click to recenter the map';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('button');
      controlText.style.color = '#352c6c';
      controlText.style.fontSize = '14px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlText.innerHTML = 'View larger map';
      controlUI.appendChild(controlText);
      // Setup the click event listeners: simply set the map to Chicago.
      controlUI.addEventListener('click', function () {

        var options = {
          location: 'yes',
          clearcache: 'yes',
          toolbar: 'no'
        };

        // document.addEventListener("deviceready", function () {

        $cordovaInAppBrowser.open('https://www.google.co.in/maps/place/Euro+Flooring+Pvt.+Ltd./@12.954431,77.5401732,17z/data=!3m1!4b1!4m5!3m4!1s0x3bae3e0df066424d:0x7c9a63a59d69975b!8m2!3d12.954431!4d77.5423619', '_blank', options)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            // error
          });

        // }, false);
      });

    }


    function initMap() {
      // Styles a map in night mode.
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 12.954431,
          lng: 77.54236190000006
        },
        scrollwheel: false,
        zoom: 15
      });

      var marker = new google.maps.Marker({
        position: {
          lat: 12.954431,
          lng: 77.54236190000006


        },
        title: "Euro Flooring",
        map: map

      });
      var centerControlDiv = document.createElement('div');
      var centerControl = new CenterControl(centerControlDiv, map);

      centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    }


    //  $scope.$on('$viewContentLoaded', function () {
    //         $timeout(function () {
    //             initMap();
    //             console.log(loaded);
    //         }, 500);
    //     })
    // $ionicPlatform.ready(function () {
    //   initMap();
    //   // google.maps.event.addDomListener(window, "load", initMap);
    // })
    angular.element(document).ready(function () {
      initMap();
    })


  })
  .controller('SignupCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $state) {

    if ($.jStorage.get('profile')) {
      $state.go('app.home');
    }

    $scope.formData = {};
    $scope.validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    $scope.signupForm = function (value) {
      console.log("value", value);
      // if (!$.jStorage.get('profile')) {

      MyServices.signup(value, function (data) {

        console.log(data);
        $scope.formData = data.data;
        $.jStorage.set('profile', data.data);
        console.log($scope.formData)
        if (data.value == true) {
          $state.go('app.home');
        } else {
          $ionicPopup.alert({
            cssClass: 'productspopup',
            title: "Sign Up Incorrect",

          });
        }
      })

      //}
    }
  })

  .controller('LoginCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $state) {
    if ($.jStorage.get('profile')) {
      $state.go('app.home');
    }
    $scope.formData = {};

    $scope.login = function (value) {
      console.log("value", value);
      // if (!$.jStorage.get('profile')) {

      MyServices.login(value, function (data) {


        if (data.value == true) {

          $state.go('app.home');
          console.log(data);
          $scope.formData = data.data;
          $.jStorage.set('profile', data.data);
          console.log($scope.formData)
          $scope.formData = {};
        } else {
          $ionicPopup.alert({
            cssClass: 'productspopup',
            title: "Login Incorrect",

          });
        }

      })

      // }

    }
  })
  .controller('WishListCtrl', function ($scope, $stateParams, $cordovaSocialSharing, MyServices, $filter) {
    $scope.getWishList = function () {
      $scope.userid = {};
      $scope.userid._id = $.jStorage.get('profile')._id;
      MyServices.getWishList($scope.userid, function (data) {
        if (data.value) {
          console.log(data.data);
          $scope.wishlist = data.data.wishList;
          _.each($scope.wishlist, function (n) {
            n.status = true;
          })
        }
      })
    }
    $scope.getWishList();
    $scope.addOrRemoveWishList = function (productId, status) {
      console.log("productId", productId);
      $scope.addwish = {};
      $scope.addwish.user = $.jStorage.get('profile')._id;
      $scope.addwish.product = productId;
      MyServices.addOrRemoveWishList($scope.addwish, function (data) {
        if (data.value) {
          console.log(data.data);
          if (status) {
            var myPopup = $ionicPopup.show({
              title: 'Wishlist',
              template: 'Product added into wishlist',
              scope: $scope,
              cssClass: 'wishlistPopup',
              buttons: []
            });
            myPopup.then(function (res) {});
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
          }
          $scope.getWishList();
        }
      })
    }
    $scope.shareWishlist = function (wishlist) {
      var image = $filter("downloadImage")(wishlist.productImage);


      var subject = "Category:" + wishlist.subCategory;
      var message = "name: " + wishlist.name;
      $cordovaSocialSharing
        .share(message, subject, image, '') // Share via native share sheet
        .then(function (result) {
          // Success!
          console.log("Success");
          console.log(result);
          console.log(image);
        }, function (err) {
          // An error occured. Show a message to the user
          console.log("error : " + err);
        });
    }




  })

  .controller('EmailCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $state) {
    $scope.closeModals = function () {
      $scope.modals.hide();
    };

    $scope.GenerateOtp = function (value) {
      console.log("email", value)
      MyServices.GenerateOtp(value, function (data) {
        $.jStorage.set('profile', value)
        console.log("Message", data)
        if (data.value) {
          var alertPopup = $ionicPopup.alert({
            cssClass: 'popUp',
            buttons: [{
              text: 'Ok',
              type: 'button-assertive'
            }],
            template: 'OTP sent to your Email-Id'
          });

          alertPopup.then(function (res) {
            // $scope.closeModals();
            $state.go('otp');
          });
          // $scope.getAllDownload = data.data;
          // console.log($scope.homeSlider, $scope.landingBanner);
        } else {
          var alertPopup = $ionicPopup.alert({
            cssClass: 'popUp',
            buttons: [{
              text: 'Ok',
              type: 'button-royal'
            }],
            template: 'User Not Found'
          });

          alertPopup.then(function (res) {

          });
        }
      });

    }

  })

  .controller('OtpCtrl', function ($scope, $stateParams, MyServices, $state, $timeout, $ionicPopup) {
    $scope.resend = true;
    $scope.Otp = {}
    $scope.emailId = $.jStorage.get('profile')
    $scope.Otp.email = $scope.emailId.email
    console.log("OTPemailid", $scope.Otp)
    console.log("$scope.emailId", $scope.emailId)
    $scope.resendOtp = function (value) {
      MyServices.GenerateOtp($scope.emailId, function (data) {
        $scope.resend = true;
        var alertPopup = $ionicPopup.alert({
          cssClass: 'popUp',
          buttons: [{
            text: 'Ok',
            type: 'button-royal'
          }],
          template: 'OTP is sent to your Email-id'
        });

        alertPopup.then(function (res) {

        });
        console.log("Message", data)
        $scope.resend = false;
        if (data.value) {
          $timeout(function () {
            $scope.resend = true;
          }, 10000);
          // $scope.getAllDownload = data.data;
          // console.log($scope.homeSlider, $scope.landingBanner);
        } else {

        }
      });
    }

    $scope.validateOtp = function () {
      MyServices.ValidateOtp($scope.Otp, function (data) {
        console.log("Message", $scope.Otp)
        if (data.value) {
          console.log("Otp", data.data.message)
          if (data.data.message == 'otp expired') {
            var alertPopup = $ionicPopup.alert({
              cssClass: 'popUp',
              buttons: [{
                text: 'Ok',
                type: 'button-royal'
              }],
              template: 'Your OTP is Expired.'
            });

            alertPopup.then(function (res) {

            });
          } else if (data.data.message == 'invalid otp') {
            var alertPopup = $ionicPopup.alert({
              cssClass: 'popUp',
              buttons: [{
                text: 'Ok',
                type: 'button-royal'
              }],
              template: 'Please Enter a Valid OTP.'
            });

            alertPopup.then(function (res) {

            });     
          } else {
            // var alertPopup = $ionicPopup.alert({
            //   cssClass: 'popUp',
            //   buttons: [{
            //     text: 'Ok',
            //     type: 'button-royal'
            //   }],
            //   template: 'Valid Ot'
            // });

            // alertPopup.then(function (res) {
            //   $state.go('newpassword');
            // }); 
            $state.go('newpassword')
          }
        } else {

        }
      });
    }
  })

  .controller('NewPasswordCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $state) {
    $scope.resetPassword = {}
    $scope.emailId = $.jStorage.get('profile')
    $scope.resetPassword.email = $scope.emailId.email
    $scope.ResetPassword = function (value) {
      console.log("newold", value)
      if (value.newPassword == value.confirmPassword) {
        $scope.resetPassword.newPassword = value.newPassword
        MyServices.ResetPassword($scope.resetPassword, function (data) {
          console.log("resetPassword", data)
          $.jStorage.flush();
          var alertPopup = $ionicPopup.alert({
            cssClass: 'popUp',
            buttons: [{
              text: 'Ok',
              type: 'button-royal'
            }],
            template: 'Password Updated Successfully.'
          });

          alertPopup.then(function (res) {
            $state.go('login');
          });
        })
      } else {
        var alertPopup = $ionicPopup.alert({
          cssClass: 'popUp',
          buttons: [{
            text: 'Ok',
            type: 'button-royal'
          }],
          template: 'Password does not match.'
        });

        alertPopup.then(function (res) {

        });
      }

    }
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {

  });
