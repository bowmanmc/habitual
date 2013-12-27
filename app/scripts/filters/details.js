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
