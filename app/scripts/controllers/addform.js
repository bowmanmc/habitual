'use strict';

angular.module('habitual').controller('AddFormCtrl',
function ($scope, $location, habitService) {

	$scope.form_habit = '';

	$scope.saveHabit = function() {
		habitService.storeNewHabit($scope.form_habit);
		$location.path('/');
	};
});
