'use strict';

var habitServices = angular.module('habitual.services.habit', [
    'LocalStorageModule'
]);

habitServices.service('habitService', function(localStorageService) {

    this.createHabit = function(txt) {
        console.log('Creating habit with text: ' + txt);
    };

    this.getHabits = function() {
        // Go through the local storage keys and pick out 
        // the habits.
        var habits = [];
        var keys = localStorageService.keys();
        var i, key;
        var len = keys.length;
        for (i = 0; i < len; i++) {
            key = keys[i];
            if (key.indexOf('habit.') === 0) {
                habits.push(this.getHabit(key));
            }
        }
        return habits;

    }; // getHabits

    this.getHabit = function(id) {
        var key = id;
        if (id.indexOf('habit.') !== 0) {
            key = 'habit.' + id;
        }
        return localStorageService.get(key);
    }; // getHabit

});
