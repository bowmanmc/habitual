'use strict';

angular.module('habitualApp').controller('StartPageCtrl',
function ($scope, $location) {

	$scope.loadAddScreen = function() {
		$location.path('/add');
	};

});
