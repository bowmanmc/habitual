'use strict';

angular.module('habitual').controller('ListCtrl',
function ($scope, $location, habitService, chainService) {

    $scope.toggledIndex = -1;
    $scope.habits = [];

    $scope.loadHabits = function() {
        console.log('loading habits!');
        habitService.getDatabase().then(function(db) {
            var tx = db.transaction(['habits'], 'readonly');
            var habitStore = tx.objectStore('habits');
            var cursorRequest = habitStore.openCursor();
            var i = 0;
            cursorRequest.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    console.log('Loading habit ' + cursor.key);
                    $scope.fillOutHabit(cursor.value);
                    $scope.habits.push(cursor.value);
                    $scope.$apply();
                    i++;
                    cursor.continue();
                }
                else {
                    console.log('Loaded all (' + i + ') habits!' );
                    //console.log('habits: ' + angular.toJson($scope.habits));
                    if (i < 1) {
                        // We don't have any habits stored. 
                        // Go to the start page
                        console.log('Got only ' + i + ' habits...');
                        $location.path('/start');
                        if(!$scope.$$phase) $scope.$apply();
                    }
                }
            };
        });
    };

    $scope.fillOutHabit = function(habit) {
        var today = moment().format('YYYY-MM-DD');
        habit.completed_today = false;
        if (typeof habit.chain[today] !== 'undefined' && 
            habit.chain[today].completed === true) {
            habit.completed_today = true;
        }
        // wayback - uncomment the next two lines to test full chains
        //var wayback = moment().subtract(100, 'days');
        //habit.date_started = wayback;
        var chain = chainService.getFilledOutChain(habit);
        chain.reverse();
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
});
