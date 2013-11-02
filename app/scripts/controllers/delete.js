'use strict';

angular.module('habitual').controller('HabitDeleteCtrl',
function ($scope, $location, $routeParams, habitService) {

	$scope.habit = habitService.getHabit($routeParams.habitId);

	$scope.deleteHabit = function(habitId) {
		habitService.deleteHabit(habitId);
		$location.path('/');
	};

	$scope.cancel = function(habitId) {
		$location.path('/habit/' + habitId);
	};
});
