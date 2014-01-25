'use strict'

var detailsFilters = angular.module('habitual.filters.details', []);

detailsFilters.filter('day_num', function() {
    return function(input) {
        if (typeof input === 'undefined') {
            return '';
        }
        var m = moment(input, 'YYYY-MM-DD');
        return m.format('D');
    };
});

detailsFilters.filter('day_week', function() {
    return function(input) {
        if (typeof input === 'undefined') {
            return '';
        }
        var m = moment(input, 'YYYY-MM-DD');
        return m.format('dddd');
    };
});

detailsFilters.filter('day_month', function() {
    return function(input) {
        if (typeof input === 'undefined') {
            return '';
        }
        var m = moment(input, 'YYYY-MM-DD');
        return m.format('MMM');
    };
});

detailsFilters.filter('main_summary', function(chainService) {
    return function(habit) {
        if (typeof habit === 'undefined') {
            return '';
        }

        var chain = chainService.getFilledOutChain(habit).reverse();
        var stats = chainService.getChainStats(chain);

        var tracked_from = 'today';
        if (habit.date_started != moment().format('YYYY-MM-DD')) {
            tracked_from = moment(habit.date_started, 'YYYY-MM-DD').fromNow();
        }

        var msg = '';
        // Habit was started today...
        if (tracked_from == 'today') {
            msg = 'You just got started on this today.';
            if (stats.completed_links > 0) {
                msg += ' So far, so good!';
            }
            else {
                msg += ' You can do it!';
            }
        }

        // Habit was started awhile ago...
        else {
            var num_completed = stats.completed_links;
            if (stats.percentage == 100) {
                num_completed = 'each';
            }
            msg = 'You got started on this habit ' + tracked_from +
                  ' and have completed it on ' + num_completed +
                  ' of the last ' + stats.total_links + ' days.';
            if (stats.percentage == 100) {
                msg += " That's 100%! Keep it up!";
            }
            else if (stats.percentage > 50) {
                msg += ' ' + stats.percentage + "% ain't bad. Keep it up!";
            }
            else {
                msg += " You're only batting " + stats.percentage + '%.';
            }
        }

        return msg;
    };
});
