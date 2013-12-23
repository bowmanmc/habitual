'use strict';

angular.module('habitual').controller('HabitDetailsCtrl',
function ($scope, $location, $routeParams, habitService, chainService) {

    $scope.toggledIndex = -1;

    $scope.initializeScope = function() {

        $scope.chain = [];

        habitService.getHabit($routeParams.habitId).then(function(habit) {
            $scope.habit = habit;
            // Loop through and get the total_links, completed_links, and format each
            // link in the chain for viewing
            $scope.chain = chainService.getFilledOutChain(habit).reverse();
            $scope.stats = chainService.getChainStats($scope.chain);

            if ($scope.stats.completed_links == $scope.stats.total_links) {
                $scope.stats.completed_links = 'each';
            }

            $scope.tracked_from = moment($scope.habit.date_started, 'YYYY-MM-DD').fromNow();
        });
    };

    $scope.toggleLink = function(day, $index) {
        console.log('Toggling day: ' + day);
        var habit = $scope.habit;
        chainService.toggle(habit, day);
        habitService.saveHabit(habit).then(function() {
            $scope.habit = habit;
            $scope.toggledIndex = $index;
        });
    };

    $scope.confirmDelete = function(habitId) {
        $location.path('/habit/delete/' + habitId);
    };

    $scope.confirmReset = function(habitId) {
        console.log('resetting habit ' + habitId);
        $location.path('/habit/reset/' + habitId);
    };

    $scope.goBack = function() {
        $location.path('/');
    };

    // initialize the scope on page load.
    $scope.initializeScope();
});
