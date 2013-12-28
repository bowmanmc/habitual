'use strict';

var habitServices = angular.module('habitual.services.habit', []);

habitServices.service('habitService', function($q, storageService) {

    var idx = 0;

    this.generateId = function() {
        // Base it off of timestamp and an internal index
        var result = '' + new Date().getTime() + idx;
        idx++;
        return result;
    };

    this.getKey = function(id) {
        // make sure we're dealing with a string so we
        // have the indexOf method
        var key = '' + id;
        if (key.indexOf('habit.') !== 0) {
            key = 'habit.' + id;
        }
        return key;
    };

    this.createNewHabit = function(txt) {
        var deferred = $q.defer();
        var now = moment().format('YYYY-MM-DD');
        var id = this.generateId();
        var habit = {
            id: id,
            text: txt,
            date_created: now,
            date_started: now,
            last_reset: now,
            chain: {}
        };

        this.saveHabit(habit).then(function(id) {
            console.log('habit saved with id: ' + id);
            deferred.resolve(id);
        });

        return deferred.promise;
    };

    this.saveHabit = function(habit) {
        console.log('saving habit: ' + habit.text + ' [' + habit.id + ']');
        var deferred = $q.defer();

        habit.last_updated = moment().format('YYYY-MM-DD');
        var key = this.getKey(habit.id);
        var toStore = {};
        toStore[key] = habit;
        console.log('Saving: ' + JSON.stringify(toStore));

        storageService.saveItem(toStore, function() {
            deferred.resolve(habit.id);
        });

        return deferred.promise;
    };

    this.resetHabit = function(habitId) {
        var deferred = $q.defer();
        var svc = this;
        svc.getHabit(habitId).then(function(habit) {
            var now = moment().format('YYYY-MM-DD');
            habit.chain = {}; // reset the chain to zero
            habit.last_reset = now;
            habit.date_started = now;

            svc.saveHabit(habit).then(function(id) {
                console.log('Updated habit ' + id);
                deferred.resolve(id);
            });
        });
        return deferred.promise;
    };

    this.deleteHabit = function(id) {
        var deferred = $q.defer();
        var key = this.getKey(id);
        //chrome.storage.sync.remove(key, function() {
        storageService.removeItem(key, function() {
            console.log('Deleted habit ' + id);
            deferred.resolve(id);
        });
        return deferred.promise;
    };

    this.getHabits = function() {
        var deferred = $q.defer();
        console.log('Getting habits!');

        storageService.getAll(function(results) {
            console.log('Loading: ' + JSON.stringify(results));
            var keys = Object.keys(results);
            var habits = [];
            var i, habit, key;
            var len = keys.length;
            for (i = 0; i < len; i++) {
                key = keys[i];
                if (key.indexOf('habit.') !== 0) {
                    console.log('Not a habit: ' + key);
                    continue;
                }
                habit = results[key];
                console.log('[' + key + '] = ' + angular.toJson(habit));
                // wayback - uncomment the next two lines to test full chains
                //var wayback = moment().subtract(100, 'days').format('YYYY-MM-DD');
                //habit.date_started = wayback;
                habits.push(habit);
            }
            deferred.resolve(habits);
        });
        return deferred.promise;        
    }; // getHabits

    this.getHabit = function(id) {
        var deferred = $q.defer();
        var key = this.getKey(id);
        console.log('Looking up habit [' + id + '] with key: ' + key);

        storageService.getItem(key, function(result) {
            //console.log('Found result: ' + JSON.stringify(result));
            var habit = result[key];
            // wayback - uncomment the next two lines to test full chains
            //var wayback = moment().subtract(100, 'days').format('YYYY-MM-DD');
            //habit.date_started = wayback;
            console.log('Found it: ' + angular.toJson(habit));
            deferred.resolve(habit);
        });
        return deferred.promise;
    }; // getHabit

    this.clearHabitual = function() {
        //localStorageService.clearAll();
    }
});
