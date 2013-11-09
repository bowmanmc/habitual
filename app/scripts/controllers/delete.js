'use strict';

angular.module('habitual').controller('HabitDeleteCtrl',
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

	$scope.deleteHabit = function(habitId) {
		habitService.deleteHabit(habitId);
		$location.path('/');
	};

    $scope.goBack = function() {
        $location.path('/habit/' + $routeParams.habitId);
    };

    $scope.initializeScope();
});
