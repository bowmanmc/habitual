'use strict';

var storageServices = angular.module('habitual.services.storage', []);

/**
 * chrome.storage is awesome, but when I wrote this, there wasn't a
 * shim available for use in a regular web browser (which is where
 * I do most of my development). This way, I can build/test in a standard
 * web browser then deploy to platforms supporting chrome.storage.sync later.
 */
storageServices.service('storageService', function($q) {

    var useChrome = false;

    if (typeof chrome !== 'undefined' && 
        typeof chrome.storage !== 'undefined') {
        // We're a chrome app or have a plugin
        console.log('Using chrome.storage.sync...');
        useChrome = true;
    }
    else {
        console.log('using localStorage...');
        useChrome = false;
    }

    this.saveItem = function(toStore, callback) {
        if (useChrome) {
            chrome.storage.sync.set(toStore, callback);
            return;
        }
        var key = Object.keys(toStore)[0];
        var val = toStore[key];
        if (typeof val === 'object') {
            val = angular.toJson(val);
        }
        localStorage[key] = val;
        callback();
    };

    this.removeItem = function(key, callback) {
        if (useChrome) {
            chrome.storage.sync.remove(key, callback);
            return;
        }
        localStorage.removeItem(key);
        callback();
    };

    this.getAll = function(callback) {
        if (useChrome) {
            chrome.storage.sync.get(null, callback);
            return;
        }
        var all = {};
        for (var key in localStorage){
            all[key] = angular.fromJson(localStorage[key]);
        }
        callback(all);
    };

    this.getItem = function(key, callback) {
        if (useChrome) {
            chrome.storage.sync.get(key, callback);
            return;
        }
        var val = localStorage[key];
        var result = {};
        result[key] = angular.fromJson(val);
        callback(result);
    };

});
