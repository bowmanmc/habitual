'use strict';

angular.module('habitualApp').controller('NavCtrl',
function ($scope, $location) {

	$scope.loadAddScreen = function() {
		$location.path('/add');
	};

	$scope.loadHomeScreen = function() {
		$location.path('/');
	};

});
