var adminurl = "http://euroflooring.co.in/api/";
// var adminurl = "http://192.168.1.103:1337/api/";

var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";

angular.module("starter.services", []).factory("MyServices", function($http) {
  return {
    //  getProjectReport: function(callback) {
    //   return $http({
    //     url: adminurl + 'Project/getProjectReport',
    //     method: "POST"
    //   }).success(callback);
    // },
    getAllHomeData: function(formData, callback) {
      $http({
        url: adminurl + "HomeBanner/getAllHomeData",
        method: "POST"
        // data: formData
      }).success(callback);
    },
    getAllCollection: function(formData, callback) {
      $http({
        url: adminurl + "Collection/getAllCollection",
        method: "POST"
        // data: formData
      }).success(callback);
    },
    getCollProduct: function(data, callback) {
      $http({
        url: adminurl + "Product/getCollProductApp",
        method: "POST",
        data: data
      }).success(callback);
    },

    //get one collection detail
    getOneCollection: function(formData, callback) {
      $http({
        url: adminurl + "Collection/getOne",
        method: "POST",
        data: formData
      }).success(callback);
    },

    //get all products of collection
    getAllCollectionProducts: function(formData, callback) {
      $http({
        url: adminurl + "Product/getCollProduct",
        method: "POST",
        data: formData
      }).success(callback);
    },

    getOneProductDetail: function(data, callback) {
      var data = {
        productId: data
      };
      $http({
        url: adminurl + "Product/getOneProductDetail",
        method: "POST",
        data: data
      }).success(callback);
    },
    getOne: function(id, callback) {
      var formData = {
        _id: id
      };
      $http({
        url: adminurl + "Collection/getOne",
        method: "POST",
        data: formData
      }).success(callback);
    },
    addOrRemoveWishList: function(formData, callback) {
      $http({
        url: adminurl + "AppUser/addOrRemoveWishList",
        method: "POST",
        data: formData
      }).success(callback);
    },
    getWishList: function(formData, callback) {
      $http({
        url: adminurl + "AppUser/getWishList",
        method: "POST",
        data: formData
      }).success(callback);
    },
    //Get about us data
    getAboutUs: function(formData, callback) {
      $http({
        url: adminurl + "ConfigTwo/getOne",
        method: "POST",
        data: formData
      }).success(callback);
    },
    getAllDownload: function(formData, callback) {
      $http({
        url: adminurl + "document/getAllDownload",
        method: "POST",
        data: formData
      }).success(callback);
    },
    getAllVideo: function(formData, callback) {
      $http({
        url: adminurl + "media/getAllVideo",
        method: "POST",
        data: formData
      }).success(callback);
    },

    //To save contact us data
    saveConatct: function(formData, callback) {
      $http({
        url: adminurl + "ContactUs/save",
        method: "POST",
        data: formData
      }).success(callback);
    },
    searchData: function(formData, callback) {
      $http({
        url: adminurl + "product/searchProductByName",
        method: "POST",
        data: formData
      }).success(callback);
    },
    signup: function(data, callback) {
      console.log(data);
      $http({
        url: adminurl + "AppUser/registerAppuser",
        method: "POST",
        data: data
      }).success(callback);
    },

    login: function(data, callback) {
      console.log(data);
      $http({
        url: adminurl + "AppUser/userLogin",
        method: "POST",
        data: data
      }).success(callback);
    },

    GenerateOtp: function(data, callback) {
      console.log(data);
      $http({
        url: adminurl + "AppUser/forgotPassword",
        method: "POST",
        data: data
      }).success(callback);
    },

    ValidateOtp: function(data, callback) {
      console.log(data);
      $http({
        url: adminurl + "AppUser/validateOTP",
        method: "POST",
        data: data
      }).success(callback);
    },

    ResetPassword: function(data, callback) {
      console.log(data);
      $http({
        url: adminurl + "AppUser/resetPassword",
        method: "POST",
        data: data
      }).success(callback);
    }
  };
});
