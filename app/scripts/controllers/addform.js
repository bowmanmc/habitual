'use strict';

angular.module('habitualApp').controller('AddFormCtrl',
function ($scope, $location, localStorageService) {

	$scope.form_habit = '';

	$scope.saveHabit = function() {

		var ctime = new Date().getTime();

		var habit = {
			id: ctime,
			text: $scope.form_habit,
			date_created: new Date(),
			links: []
		};

		localStorageService.add('habit.' + ctime, habit);

		$location.path('/');
	};
});
