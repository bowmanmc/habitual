'use strict';

angular.module('habitual').controller('NavCtrl',
function ($scope, $location, $window) {

	$scope.loadAddScreen = function() {
		$location.path('/add');
	};

});
