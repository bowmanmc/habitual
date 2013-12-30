'use strict';

angular.module('habitual').controller('AddFormCtrl',
function ($scope, $location, habitService) {

    $scope.form_habit = '';
    $scope.trim_idx = -1;
    $scope.last_width = -1;

    var MAX = 132 * 2; // 132 = card width * 2 lines

    $scope.saveHabit = function() {
        habitService.createNewHabit($scope.form_habit, $scope.trim_idx)
                    .then(function(id) {
            $location.path('/');
        });
    };

    $scope.goBack = function() {
        $location.path('/');
    };

    $scope.$watch('form_habit', function() {

        if (typeof $scope.form_habit === 'undefined') {
            // reset it and return
            $scope.trim_idx = -1;
            $scope.last_width = -1;
            return;
        }

        var el = document.getElementById('widthtest');
        var font_width = el.clientWidth + 8;
        var num_chars = $scope.form_habit.length;

        //console.log('Element width: ' + font_width);
        //console.log('    Trim idx:  ' + $scope.trim_idx);

        // If we're less than the MAX, don't trim it
        if (font_width < MAX) {
            $scope.trim_idx = -1;
            $scope.last_width = -1;
        }
        // If we're greater than MAX and this is the first char past it, 
        // then set the trim vars
        if (font_width > MAX && $scope.last_width < 0) {
            $scope.trim_idx = num_chars;
            $scope.last_width = num_chars;
        }
    });
});
