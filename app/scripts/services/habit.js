'use strict';

var habitServices = angular.module('habitual.services.habit', []);

habitServices.service('habitService', function($q) {

    this.getDatabase = function() {
        var deferred = $q.defer();
        var request = window.indexedDB.open('habitual', 2);

        request.onupgradeneeded = function (event) {
            console.log('Upgrading habitual indexedDb...');
            var thisDb = event.target.result;
            var habitStore = thisDb.createObjectStore('habits', {
                autoIncrement: true,
                keyPath: 'id'
            });
            habitStore.createIndex('text_idx', 'text', {unique: false});
            habitStore.createIndex('date_started_idx', 'date_started', {unique: false});
            habitStore.createIndex('last_updated_idx', 'last_updated', {unique: false});
        };

        request.onsuccess = function (event) {
            console.log('Got the DB! returning it...');
            var db = event.target.result;
            deferred.resolve(db); //pass the db object on to then()
        };

        request.onerror = function (e) {
            console.error('Error when opening indexedDB');
        };

        return deferred.promise;
    };

    this.createNewHabit = function(txt) {
        var deferred = $q.defer();
        var now = moment().format('YYYY-MM-DD');
        var habit = {
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
        console.log('saving habit: ' + habit.text);
        var deferred = $q.defer();

        habit.last_updated = moment().format('YYYY-MM-DD');
        this.getDatabase().then(function(db) {
            console.log('Got the DB, adding the habit...');
            var habitStore = db.transaction(['habits'], 'readwrite').objectStore('habits');
            var putReq = habitStore.put(habit);
            putReq.onsuccess = function(event) {
                var id = event.target.result;
                deferred.resolve(id);
            }
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

        this.getDatabase().then(function(db) {
            console.log('Deleting habit: ' + id);
            var habitStore = db.transaction(['habits'], 'readwrite').objectStore('habits');
            habitStore.delete(id);
            console.log('Deleted habit ' + id);
            deferred.resolve(id);
        });

        return deferred.promise;
    };

    this.getHabits = function() {
        var deferred = $q.defer();
        console.log('Getting habits!');
        this.getDatabase().then(function(db) {

            var habitStore = db.transaction(['habits'], 'readonly').objectStore('habits');
            var req = habitStore.openCursor();

            var habits = [];
            var i = 0;
            req.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    console.log('Adding habit ' + cursor.key);
                    habits.push(cursor.value);
                    i++;
                    cursor.continue();
                }
                else {
                    console.log('Got all (' + i + ') habits!');
                    //console.log(angular.toJson(habits));
                    deferred.resolve(habits);
                }
            };
        });
        return deferred.promise;        
    }; // getHabits

    this.getHabit = function(id) {
        var deferred = $q.defer();

        this.getDatabase().then(function(db) {
            console.log('Loading habit ' + id);
            if (isNaN(id)) {
                deferred.resolve(null);
            }
            id = parseInt(id);
            var habitStore = db.transaction(['habits'], 'readonly').objectStore('habits');
            var getReq = habitStore.get(id);
            getReq.onsuccess = function(event) {
                var result = event.target.result;
                console.log('Found it: ' + angular.toJson(result));
                deferred.resolve(result);
            };
            getReq.onerror = function(event) {
                console.log('Habit with id: ' + id + ' not found!');
                return null;
                deferred.resolve(null);
            };
        });

        return deferred.promise;
    }; // getHabit

    this.clearHabitual = function() {
        //localStorageService.clearAll();
    }
});
