'use strict';

angular.module('habitual').controller('ListCtrl',
function ($scope, $location, habitService, chainService, keyboardService, $timeout, $window) {

    $scope.toggledIndex = -1;
    $scope.habits = [];

    $scope.loadHabits = function() {
        var start = new Date();
        habitService.getHabits().then(function(habits) {
            var i, habit;
            var len = habits.length;
            if (len < 1) {
                console.log('Got ' + len + ' habits...');
                $location.path('/start');
                if(!$scope.$$phase) $scope.$apply();
            }
            else {
                for (i = 0; i < len; i++) {
                    habit = habits[i];
                    $scope.fillOutHabit(habit);
                    $scope.habits.push(habit);
                }
            }
            var end = new Date();
            var dur = moment.duration((end - start));
            console.log('Loading ' + len + ' habits took: ' + dur + 'ms');
        });
    };

    $scope.fillOutHabit = function(habit) {
        var today = moment().format('YYYY-MM-DD');
        habit.completed_today = false;
        //console.log('habit: ' + angular.toJson(habit));
        if (typeof habit.chain[today] !== 'undefined' && 
            habit.chain[today].completed === true) {
            habit.completed_today = true;
        }
        var chain = chainService.getFilledOutChain(habit);
        habit.chain = chain;
    };

    $scope.initDate = function() {
        var now = moment();
        $scope.month = now.format('MMM');
        $scope.day_name = now.format('dddd');
        $scope.day_number = now.format('DD');
        $scope.day = now.format('dddd, MMMM Do YYYY');
    };

    // When a particular list item is clicked
    $scope.loadDetails = function(habitId) {
        $location.path('/habit/' + habitId);
    };

    // When the status button on a particular list item is clicked
    $scope.toggleStatus = function(habitId, index) {
        habitService.getHabit(habitId).then(function(habit) {
            var now = moment().format('YYYY-MM-DD');
            chainService.toggle(habit, now);
            habitService.saveHabit(habit).then(function(id) {
                console.log('Toggling index: ' + index);
                $scope.toggledIndex = index;
                $scope.fillOutHabit(habit);
                $scope.habits[index] = habit;
            });
        });
    };

    // load the habits for the list
    $scope.loadHabits();
    $scope.initDate();

    /**
     * list.js is also our "main" controller for the app. Here, we do some
     * app-level configuration. Not the cleanest, but I can't figure out
     * how to put some of this into app.js and still get the dependency
     * injection needed for $window and habitService...
     */
    // Hook up keypress eventing
    angular.element($window).on('keydown', function(e) {
        keyboardService.handleKeyPress(e);
    });

    // prune old items. These are habits that the user created more than 42
    // days ago. They may have links in their chain that will never be used.
    $scope.prune = function() {
        console.log('Starting prune...');
        var start = new Date();
        habitService.getHabits().then(function(habits) {
            var i, habit, numRemoved;
            var len = habits.length;
            for (i = 0; i < len; i++) {
                habit = habits[i];
                numRemoved = chainService.prune(habit);
                if (numRemoved > 0) {
                    console.log('Pruned ' + numRemoved + ' links... Saving habit');
                    habitService.saveHabit(habit);
                }
            }
            var end = new Date();
            var dur = moment.duration((end - start));
            console.log('Pruning ' + len + ' habits took ' + dur + 'ms');
        });
    };
    $timeout($scope.prune, 250);
});
