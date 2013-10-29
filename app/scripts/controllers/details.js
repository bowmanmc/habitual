'use strict';

angular.module('habitual').controller('HabitDetailsCtrl',
function ($scope, $location, $routeParams, habitService) {

	$scope.habit = habitService.getHabit($routeParams.habitId);

	$scope.confirmDelete = function(habitId) {
		$location.path('/habit/delete/' + habitId);
	};

	$scope.confirmReset = function(habitId) {
		$location.path('/habit/reset/' + habitId);
	};

});
