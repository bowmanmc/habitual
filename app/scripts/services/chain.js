'use strict';

var chainServices = angular.module('habitual.services.chain', []);

chainServices.service('chainService', function() {

    this.MAX_LENGTH = 42;
    var DAY_FORMAT = 'YYYY-MM-DD';

    this.createLink = function(day) {
        var now = moment().format(DAY_FORMAT);
        return {
            completed: false,
            link_date: day,
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
        var now = moment().format(DAY_FORMAT);
        link.link_date = day;
        link.last_updated = now;

        habit.chain[day] = link;
    };

    this.getChainStats = function(chain) {
        var stats = {};
        stats.total_links = 0;
        stats.completed_links = 0;
        var len = chain.length;
        var i, link, m;
        for (i = 0; i < len; i++) {
            link = chain[i];
            if (link.completed) {
                stats.completed_links += 1;
            }
            stats.total_links += 1;
        }

        return stats;
    };

    this.getFilledOutChain = function(habit) {
        // The chain could have holes in it... maybe the user hasn't opened
        // the app in a few days or something. This means we need to initialize
        // the chain with links between the current day and habit.date_started
        var results = [];

        var c = moment();
        var day, link, m;
        for (var i = 0; i < this.MAX_LENGTH; i++) {
            day = c.format(DAY_FORMAT);
            link = habit.chain[day];
            if (typeof link === 'undefined') {
                link = this.createLink(day);
            }

            m = moment(link.link_date, 'YYYY-MM-DD');
            link.day_main = m.format('dddd');
            link.day_month = m.format('MMM');
            link.day_num = m.format('D');

            results.push(link);

            // Should we keep going? Only go back until habit.date_started
            c = this.truncate(c.subtract('days', 1));
            if (c < moment(habit.date_started, DAY_FORMAT)) {
                break;
            }
        }
        return results.reverse();
    };

    this.truncate = function(m) {
        return moment(m.format(DAY_FORMAT), DAY_FORMAT);
    };
});
