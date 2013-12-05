'use strict';

angular.module('habitual').controller('ListCtrl',
function ($scope, $location, habitService, chainService) {

	$scope.toggledIndex = -1;
	$scope.toggledColumn = -1;

	$scope.loadHabits = function() {
		var habitList = habitService.getHabits();

		// If we don't have any habits yet, send them to the start page instead
		// of loading a dull, empty, useless list page.
		if (habitList.length < 1) {
	        $location.path('/start');
		}

		// Else, fill out the chains
		var habits = [];
		var len = habitList.length;
		var habit, i;
		for (i = 0; i < len; i++) {
			habit = habitList[i];
			$scope.fillOutHabit(habit);
			habits.push(habit);
		}

		return habits;
	};

	$scope.fillOutHabit = function(habit) {
		var today = moment().format('YYYY-MM-DD');
		habit.completed_today = false;
		if (typeof habit.chain[today] !== 'undefined' && 
			habit.chain[today].completed === true) {
			habit.completed_today = true;
		}
		//var wayback = moment().subtract(100, 'days');
		//habit.date_started = wayback;
		var chain = chainService.getFilledOutChain(habit);
		chain.reverse();
		habit.chain = chain;
	};

	$scope.initDate = function() {
		var now = moment();
		$scope.month = now.format('MMM');
		$scope.day_name = now.format('dddd');
		$scope.day_number = now.format('DD');
		$scope.day = now.format('dddd, MMMM Do YYYY');
	};

	$scope.prepareColumns = function(habits) {
		$scope.columns = [[], []];

		var i, h;
		var colId = 0;
		var len = habits.length;
		for (i = 0; i < len; i++) {
			h = habits[i];
			$scope.columns[colId].push(h);
			colId++;
			if (colId >= $scope.columns.length) {
				colId = 0;
			}
		}
	};

	// When a particular list item is clicked
	$scope.loadDetails = function(habitId) {
		$location.path('/habit/' + habitId);
	};

	// When the status button on a particular list item is clicked
	$scope.toggleStatus = function(habitId, column, index) {
		var now = moment().format('YYYY-MM-DD');
		var habit = habitService.getHabit(habitId);
		chainService.toggle(habit, now);
		habitService.saveHabit(habit);
		console.log('Toggling index: ' + column+ '.' + index);

		$scope.toggledColumn = column;
		$scope.toggledIndex = index;

		$scope.fillOutHabit(habit);
		$scope.columns[column][index] = habit;
	};

	// load the habits for the list
	$scope.prepareColumns($scope.loadHabits());
	$scope.initDate();
});
