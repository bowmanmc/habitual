'use strict';

angular.module('habitual').controller('HabitResetCtrl',
function ($scope, $location, $routeParams, habitService, chainService) {

    $scope.initializeScope = function() {
        habitService.getHabit($routeParams.habitId).then(function(habit) {
            $scope.habit = habit;
            $scope.chain = chainService.getFilledOutChain(habit).reverse();
            $scope.stats = chainService.getChainStats($scope.chain);
            $scope.tracked_from = moment(habit.date_started, 'YYYY-MM-DD').fromNow();

            if ($scope.stats.completed_links == $scope.stats.total_links) {
                $scope.stats.completed_links = 'each';
            }
        });
        
    };

    $scope.resetHabit = function(habitId) {
        habitService.resetHabit(habitId).then(function() {
            //_gaq.push(['_trackEvent', 'resetPage', 'reset']);
            $location.path('/habit/' + habitId);
        });
    };

    $scope.goBack = function() {
        //_gaq.push(['_trackEvent', 'resetPage', 'back']);
        $location.path('/habit/' + $routeParams.habitId);
    };

    $scope.initializeScope();
});
