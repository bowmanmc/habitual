'use strict'

var cardFilters = angular.module('habitual.filters.card', []);

cardFilters.filter('card_text', function() {

    return function(input, trimIdx) {
        var result = input;
        if (trimIdx > 0) {
            var trimAt = trimIdx - 3;
            var tmp = input.substring(0, trimAt);
            // Ok, now we also have to take the spaces into
            // account for some crazy reason
            var numSpaces = (tmp.match(/ /g)||[]).length;
            result = input.substring(0, (trimAt - numSpaces));
            result = result + '...';
        }
        return result;
    };
});
