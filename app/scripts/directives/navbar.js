'use strict';

var navbarModule = angular.module('habitual.directives.navbar', ['ngAnimate']);

navbarModule.directive('hbtNavbar', function() {
    return {
        restrict: 'EA',
        templateUrl: 'views/navbar.html',
        controller: 'NavCtrl',
        link: function (scope, element, attrs) {
            scope.buttonType = attrs.buttonType;
            if (typeof attrs.hide !== 'undefined') {
                scope.hidden = true;
            }
        }
    };
});
