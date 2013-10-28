'use strict';

angular.module('habitual').controller('ListCtrl',
function ($scope, $location, habitService) {

	$scope.habits = habitService.getHabits();
	// If we don't have any habits yet, send them to the start page instead
	// of loading a dull, empty, useless list page.
	if ($scope.habits.length < 1) {
        $location.path('/start');
	}

	// Event Handling
	$scope.loadDetails = function(habitId) {
		$location.path('/habit/' + habitId);
	};

	$scope.toggleStatus = function(habitId) {
		console.log('toggling current status for ' + habitId);
	};
});
