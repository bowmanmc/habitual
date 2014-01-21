'use strict';

angular.module('habitual').controller('SettingsCtrl',
function ($scope, $location, habitService, chainService, storageService) {

    $scope.initializeScope = function() {
        console.log('Loading settings page...');
    };

    $scope.clearAll = function() {
        console.log('Clearing out Habitual data...');
        storageService.clearAll();
        console.log('Cleared!');
    };

    $scope.generateData = function() {
        console.log('Generating test data...');
        var numHabits = 50;
        for (var i = 0; i < numHabits; i++) {
            console.log('Generating habit [' + i + ']');
            var txt = 'Habit number ' + i + ' is a doozy!';
            habitService.createNewHabit(txt);
        }
        console.log('Generated ' + numHabits + ' habits!');
    };

    $scope.timeMachine = function() {
        var numDays = 365 * 2;
        //var numDays = 50;
        var wayback = moment().subtract(numDays, 'days').format('YYYY-MM-DD');
        habitService.getHabits().then(function(habits) {
            var len = habits.length;
            var i, habit;
            for (i = 0; i < len; i++) {
                habit = habits[i];
                console.log('Filling out habit [' + habit.id + ']');
                habit.date_started = wayback;
                for (var j = 0; j < numDays; j++) {
                    var day = moment().subtract(j, 'days').format('YYYY-MM-DD');
                    chainService.toggle(habit, day);
                }
                habitService.saveHabit(habit);
            }
        });
    };

    $scope.initializeScope();
});
