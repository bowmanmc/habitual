'use strict';

angular.module('habitual').controller('AddFormCtrl',
function ($scope, $location, habitService) {

    $scope.form_habit = '';

    $scope.saveHabit = function() {
        habitService.createNewHabit($scope.form_habit).then(function(id) {
            ga('send', 'event', 'automatic', 'addPage', 'new', {
                'nonInteraction' : true
            });
            $location.path('/');
        });
    };

    $scope.goBack = function() {
        ga('send', 'event', 'automatic', 'addPage', 'back', {
            'nonInteraction' : true
        });
        $location.path('/');
    };

    console.log('ga send pageview /add');
    ga('send', 'pageview', {
        'page': '/add',
        'title': 'Add Form'
    });

});
