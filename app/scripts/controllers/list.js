'use strict';

angular.module('habitualApp').controller('ListCtrl',
function ($scope, $location, localStorageService) {

	$scope.habits = [];

	var initializeHabits = function() {
		// Go through the local storage keys and pick out 
		// the habits.
		var keys = localStorageService.keys();
		//console.log('keys: ' + keys);
		var i, key;
		var len = keys.length;
		for (i = 0; i < len; i++) {
			key = keys[i];
			console.log('checking key: ' + key);
			if (key.indexOf('habit.') === 0) {
				$scope.habits.push(localStorageService.get(key));
			}
		}
	};

	var hasHabitualKeys = function() {
		var keys = localStorageService.keys();
		//console.log('keys: ' + keys);
		if (typeof keys === 'undefined' || keys.length < 1) {
			return false;
		}
		return true;
	};

	if (!hasHabitualKeys()) {
		console.log('No keys defined...');
		$location.path('/start');
	}
	else {
		console.log('initializing habits...');
		initializeHabits();
	}

	if ($scope.habits.length < 1) {
		$location.path('/start');
	}
	// else, we have the stored list of habits and can
	// render the list page

	// Event Handling
	$scope.loadDetails = function() {
		console.log('loading details...');
	};

	$scope.toggleStatus = function() {
		console.log('toggling current status...');
	};
});
