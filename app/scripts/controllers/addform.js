'use strict';

angular.module('habitual').controller('AddFormCtrl',
function ($scope, $location, habitService) {

	$scope.form_habit = '';

	$scope.saveHabit = function() {
		habitService.createNewHabit($scope.form_habit);
		$location.path('/');
	};

	$scope.goBack = function() {
        $location.path('/');
    };
});
