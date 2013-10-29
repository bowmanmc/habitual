'use strict';

var habitServices = angular.module('habitual.services.habit', [
    'LocalStorageModule'
]);

habitServices.service('habitService', function(localStorageService) {

    var idx = 0;

    this.generateId = function() {
        // Base it off of timestamp and an internal index
        var result = '' + new Date().getTime() + idx;
        idx++;
        return result;
    };

    this.storeNewHabit = function(txt) {
        var now = new Date();
        var id = this.generateId();
        var key = 'habit.' + id;

        var habit = {
            id: id,
            text: txt,
            date_created: now,
            date_started: now,
            last_reset: now,
            last_update: now,
            chain: []
        };

        localStorageService.add(key, habit);
    };

    this.resetHabit = function(habit) {
        habit.chain = [];
        var key = this.getKey(habit.id);
        localStorageService.add(key, habit);
    };

    this.deleteHabit = function(id) {
        var key = this.getKey(id);
        localStorageService.remove(key);
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
        var key = this.getKey(id);
        return localStorageService.get(key);
    }; // getHabit

    this.getKey = function(id) {
        // make sure we're dealing with a string so we 
        // have the indexOf method
        var key = '' + id;
        if (key.indexOf('habit.') !== 0) {
            key = 'habit.' + id;
        }
        return key;
    };

});
