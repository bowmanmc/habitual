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
		var habit, i;
		var wayback = moment().subtract('days', 50).format('YYYY-MM-DD');
		for (i = 0; i < len; i++) {
			habit = habitList[i];
			$scope.fillOutHabit(habit);
			$scope.habits.push(habit);
		}
	};

	$scope.loadHabit = function(habitId) {
		var habit = habitService.getHabit(habitId);
		$scope.fillOutHabit(habit);

		var len = $scope.habits.length;
		var h, i;
		for (i = 0; i < len; i++) {
			h = $scope.habits[i];
			if (h.id == habit.id) {
				$scope.habits[i] = habit;
			}
		}
	};

	$scope.fillOutHabit = function(habit) {
		var today = moment().format('YYYY-MM-DD');
		habit.completed_today = false;
		if (typeof habit.chain[today] !== 'undefined' && 
			habit.chain[today].completed === true) {
			habit.completed_today = true;
		}
		//habit.date_started = wayback;
		var chain = chainService.getFilledOutChain(habit);
		chain.reverse();
		habit.chain = chain;
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

		$scope.toggledIndex = $index;
		this.loadHabit(habitId);
	};

	// load the habits for the list
	$scope.loadHabits();
});
