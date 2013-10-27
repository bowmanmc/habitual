'use strict';

angular.module('habitualApp').controller('HabitDeleteCtrl',
function ($scope, $location, $routeParams, localStorageService) {

	$scope.habit = localStorageService.get('habit.' + $routeParams.habitId);

	$scope.deleteHabit = function(habitId) {
		localStorageService.remove('habit.' + habitId);
		$location.path('/');
	};

	$scope.cancel = function(habitId) {
		$location.path('/habit/' + habitId);
	};
});