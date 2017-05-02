var adminurl = "http://floor.uandvcreativess.com/api/";

var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";



angular.module('starter.services', [])
  .factory('MyServices', function ($http) {
    return {

      //  getProjectReport: function(callback) {
      //   return $http({
      //     url: adminurl + 'Project/getProjectReport',
      //     method: "POST"
      //   }).success(callback);
      // },
      getAllHomeData: function (formData, callback) {
        $http({
          url: adminurl + 'HomeBanner/getAllHomeData',
          method: 'POST',
          // data: formData
        }).success(callback);
      },

      //Get about us data
      getAboutUs: function (formData, callback) {
        $http({
          url: adminurl + 'ConfigTwo/getOne',
          method: 'POST',
          data: formData
        }).success(callback);
      },

      //To save contact us data
      saveConatct: function (formData, callback) {
        $http({
          url: adminurl + 'ContactUs/save',
          method: 'POST',
          data: formData
        }).success(callback);
      },

    };
  });
