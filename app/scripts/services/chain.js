'use strict';

var chainServices = angular.module('habitual.services.chain', []);

chainServices.service('chainService', function() {

    this.createLink = function(day) {
        var now = new Date();
        return {
            completed: false,
            date_created: now,
            last_updated: now
        };
    };

    this.toggle = function(habit, day) {
        var link = habit.chain[day];
        if (typeof link === 'undefined') {
            link = this.createLink(day);
        }
        if (link.completed === true) {
            link.completed = false;
        }
        else {
            link.completed = true;
        }
        link.last_updated = new Date();

        habit.chain[day] = link;
    };

});
