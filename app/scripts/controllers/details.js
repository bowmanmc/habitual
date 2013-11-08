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
        var tot = 0;
        var com = 0;
        var len = $scope.chain.length;
        var i, link, m;
        for (i = 0; i < len; i++) {
            link = $scope.chain[i];
            if (link.completed) {
                com += 1;
            }
            tot += 1;

            m = moment(link.link_date, 'YYYY-MM-DD');
            link.day_main = m.format('dddd');
            link.day_sub = m.format('MMMM Do');
        }

        $scope.total_links = tot;
        $scope.completed_links = com;
        if (com == tot) {
            $scope.completed_links = 'each';
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
