angular.module('starter.controllers', [])


.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('HomeCtrl', function ($scope, $stateParams) {
  $scope.states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat'
  ];
  // google.charts.load("current", {packages:["corechart"]});
  //       google.charts.setOnLoadCallback(drawChart);
  //       function drawChart() {
  //         var data = google.visualization.arrayToDataTable([
  //           ['Task', 'Hours per Day'],
  //           ['Work',     60],
  //           ['Eat',      15],
  //           ['Commute',  25],
  //
  //         ]);
  //
  //        	var options = {
  // 		title: "",
  // 		pieHole: 0.85
  //     ,
  // 		pieSliceBorderColor: "none",
  //      colors: ['#067ab5', '#3aa5dd', '#eaeaea' ],
  // 		legend: {
  // 			position: "none"
  // 		},
  // 		pieSliceText: "none",
  // 		tooltip: {
  // 			trigger: "none"
  // 		}
  // 	};
  //
  //         var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  //         chart.draw(data, options);
  //       }

})

.controller('StateCtrl', function ($scope, $stateParams) {
  $scope.institution = [
    'Institue of Chemical Technology', 'Mahatma Phule Krishi Vidyapeeth', 'Shivaji University', 'Solapur University', 'Tata Institue of Social Sciences', 'Tilal Maharastra University', 'University of Mumbai', 'Savitribai Phule Pune University'
  ];
})

.controller('InstituteCtrl', function ($scope, $stateParams) {
  $scope.card = false;
  $scope.cardopen = function (index) {
    console.log("hi");
    $scope.card = !$scope.card;
  };

  $scope.showtab = true;
})

.controller('ProjectCtrl', function ($scope, $stateParams) {})

.controller('FundFlowCtrl', function ($scope, $stateParams) {})

.controller('MilestonesCtrl', function ($scope, $stateParams) {})

.controller('UtilizationCtrl', function ($scope, $stateParams) {})

.controller('ProjectPhotosCtrl', function ($scope, $stateParams) {});
