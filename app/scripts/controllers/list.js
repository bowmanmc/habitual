'use strict';

angular.module('habitual').controller('ListCtrl',
function ($scope, $location, habitService, chainService) {

	$scope.toggledIndex = -1;

	$scope.loadHabits = function() {
		var habitList = habitService.getHabits();

		// If we don't have any habits yet, send them to the start page instead
		// of loading a dull, empty, useless list page.
		if (habitList.length < 1) {
	        $location.path('/start');
		}

		// Else, fill out the chains
		$scope.habits = [];
		var len = habitList.length;
		var habit, chain, i;
		for (i = 0; i < len; i++) {
			habit = habitList[i];
			chain = chainService.getFilledOutChain(habit);
			habit.chain = chain;
			$scope.habits.push(habit);
		}
	};

	// When a particular list item is clicked
	$scope.loadDetails = function(habitId) {
		$location.path('/habit/' + habitId);
	};

	// When the status button on a particular list item is clicked
	$scope.toggleStatus = function(habitId, $index) {
		var now = moment().format('YYYY-MM-DD');
		var habit = habitService.getHabit(habitId);
		chainService.toggle(habit, now);
		habitService.saveHabit(habit);

		this.loadHabits();
		console.log('Toggling index ' + $index);
		$scope.toggledIndex = $index;
	};

	// load the habits for the list
	$scope.loadHabits();
});
