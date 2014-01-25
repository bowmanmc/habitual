'use strict';

var chainServices = angular.module('habitual.services.chain', []);

chainServices.service('chainService', function() {

    this.MAX_LENGTH = 42;
    var DAY_FORMAT = 'YYYY-MM-DD';

    this.createLink = function(day, on) {
        var now = moment().format(DAY_FORMAT);
        return {
            completed: on,
            link_date: day
        };
    };

    this.toggle = function(habit, day) {
        var vlink = habit.chain[day];
        var link = null;
        if (typeof vlink === 'undefined' || vlink.completed == false) {
            link = this.createLink(day, true);
        }
        else {
            link = this.createLink(day, false);
        }
        habit.chain[day] = link;
        return link;
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

        stats.percentage = '0';
        if (stats.total_links > 0) {
            stats.percentage = Math.round((stats.completed_links / stats.total_links) * 100);
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
                link = this.createLink(day, false);
            }
            results.push(link);

            // Should we keep going? Only go back until habit.date_started
            c = this.truncate(c.subtract('days', 1));
            if (c < moment(habit.date_started, DAY_FORMAT)) {
                break;
            }
        }
        return results;
    };

    this.truncate = function(m) {
        return moment(m.format(DAY_FORMAT), DAY_FORMAT);
    };

    this.prune = function(habit) {
        var numRemoved = 0;
        var max = moment().subtract('days', this.MAX_LENGTH);
        for (var link in habit.chain) {
            var cur = moment(link, DAY_FORMAT);
            if (cur < max) {
                delete habit.chain[link];
                numRemoved += 1;
            }
        }
        return numRemoved;
    };
});
