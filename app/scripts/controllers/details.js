'use strict';

angular.module('habitual').controller('HabitDetailsCtrl',
function ($scope, $location, $routeParams, habitService, chainService) {

    $scope.toggledIndex = -1;

    $scope.initializeScope = function() {

        $scope.chain = [];

        habitService.getHabit($routeParams.habitId).then(function(habit) {
            $scope.habit = habit;
            $scope.chain = chainService.getFilledOutChain(habit);
        });
    };

    $scope.toggleLink = function(day, $index) {
        console.log('Toggling day: ' + day);
        var habit = $scope.habit;
        var link = chainService.toggle(habit, day);
        $scope.chain[$index] = link;
        habitService.saveHabit(habit).then(function() {
            $scope.habit = habit;
            $scope.toggledIndex = $index;
        });
    };

    $scope.confirmDelete = function(habitId) {
        $location.path('/habit/delete/' + habitId);
    };

    $scope.confirmReset = function(habitId) {
        $location.path('/habit/reset/' + habitId);
    };

    $scope.goBack = function() {
        $location.path('/');
    };

    // initialize the scope on page load.
    $scope.initializeScope();
});
