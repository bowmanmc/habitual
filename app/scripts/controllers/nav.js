'use strict';

angular.module('habitual').controller('NavCtrl',
function ($scope, $location) {

	$scope.loadAddScreen = function() {
		$location.path('/add');
	};

	$scope.loadHomeScreen = function() {
		$location.path('/');
	};

});
