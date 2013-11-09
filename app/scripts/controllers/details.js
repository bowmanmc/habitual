'use strict';

angular.module('habitual').controller('HabitDetailsCtrl',
function ($scope, $location, $routeParams, habitService, chainService) {

    $scope.toggledIndex = -1;

    $scope.initializeScope = function() {
        $scope.habit = habitService.getHabit($routeParams.habitId);
        $scope.chain = [];

        // Loop through and get the total_links, completed_links, and format each
        // link in the chain for viewing
        $scope.chain = chainService.getFilledOutChain($scope.habit).reverse();
        $scope.stats = chainService.getChainStats($scope.chain);

        if ($scope.stats.completed_links == $scope.stats.total_links) {
            $scope.stats.completed_links = 'each';
        }

        $scope.tracked_from = moment($scope.habit.date_started, 'YYYY-MM-DD').fromNow();
    };

    $scope.toggleLink = function(day, $index) {
        console.log('Toggling day: ' + day);
        var habit = $scope.habit;
        chainService.toggle(habit, day);
        habitService.saveHabit(habit);
        $scope.habit = habit;

        $scope.toggledIndex = $index;
        this.initializeScope();
    };

	$scope.confirmDelete = function(habitId) {
		$location.path('/habit/delete/' + habitId);
	};

	$scope.confirmReset = function(habitId) {
		$location.path('/habit/reset/' + habitId);
	};

    // initialize the scope on page load.
    $scope.initializeScope();
});
