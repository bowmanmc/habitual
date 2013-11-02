'use strict';

angular.module('habitual').controller('ListCtrl',
function ($scope, $location, habitService, chainService) {

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

	// Event Handling
	$scope.loadDetails = function(habitId) {
		$location.path('/habit/' + habitId);
	};

	$scope.toggleStatus = function(habitId) {
		console.log('toggling current status for ' + habitId);
		var now = moment().format('YYYY-MM-DD');
		var habit = habitService.getHabit(habitId);
		chainService.toggle(habit, now);
		habitService.saveHabit(habit);
	};
});
