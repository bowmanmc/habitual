'use strict';

var chainServices = angular.module('habitual.services.chain', []);

chainServices.service('chainService', function() {

    this.MAX_LENGTH = 10;

    this.createLink = function(day) {
        var now = moment().format('YYYY-MM-DD');
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

    this.getFilledOutChain = function(habit) {
        // The chain could have holes in it... maybe the user hasn't opened
        // the app in a few days or something. This means we need to initialize
        // the chain with links between the current day and habit.date_started
        var results = [];

        var c = moment();
        var day, link;
        for (var i = 0; i < this.MAX_LENGTH; i++) {
            day = c.format('YYYY-MM-DD');
            link = habit.chain[day];
            if (typeof link !== 'undefined') {
                results.push(link);
            }
            else {
                results.push(this.createLink(day));
            }
            // Should we keep going? Only go back until habit.date_started
            c = this.truncate(c.subtract('days', 1));
            if (c <= moment(habit.date_started, 'YYYY-MM-DD')) {
                break;
            }
        }

        return results;
    };

    this.truncate = function(m) {
        return moment(m.format('YYYY-MM-DD'), 'YYYY-MM-DD');
    };
});
