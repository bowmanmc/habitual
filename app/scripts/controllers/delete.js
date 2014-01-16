'use strict';

angular.module('habitual').controller('HabitDeleteCtrl',
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

    $scope.deleteHabit = function(habitId) {
        habitService.deleteHabit(habitId).then(function() {
            //_gaq.push(['_trackEvent', 'deletePage', 'delete']);
            $location.path('/');
        });
    };

    $scope.goBack = function() {
        //_gaq.push(['_trackEvent', 'deletePage', 'back']);
        $location.path('/habit/' + $routeParams.habitId);
    };

    $scope.initializeScope();
});
