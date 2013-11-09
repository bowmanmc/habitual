'use strict';

angular.module('habitual').controller('HabitResetCtrl',
function ($scope, $location, $routeParams, habitService, chainService) {

    $scope.initializeScope = function() {
        $scope.habit = habitService.getHabit($routeParams.habitId);
        $scope.chain = chainService.getFilledOutChain($scope.habit).reverse();
        $scope.stats = chainService.getChainStats($scope.chain);
        $scope.tracked_from = moment($scope.habit.date_started, 'YYYY-MM-DD').fromNow();

        if ($scope.stats.completed_links == $scope.stats.total_links) {
            $scope.stats.completed_links = 'each';
        }
    };

    $scope.resetHabit = function(habitId) {
        habitService.resetHabit(habitId);
        //$location.path('/habit/' + habitId);
        $location.path('/');
    };

    $scope.cancel = function(habitId) {
        $location.path('/habit/' + habitId);
    };

    $scope.initializeScope();
});
