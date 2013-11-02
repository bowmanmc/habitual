'use strict';

angular.module('habitual').controller('HabitResetCtrl',
function ($scope, $location, $routeParams, habitService) {

    $scope.habit = habitService.getHabit($routeParams.habitId);

    $scope.resetHabit = function(habitId) {
        habitService.resetHabit(habitId);
        $location.path('/habit/' + habitId);
    };

    $scope.cancel = function(habitId) {
        $location.path('/habit/' + habitId);
    };
});
