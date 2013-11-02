'use strict';

var navbarModule = angular.module('habitual.directives.navbar', []);

navbarModule.directive('hbtNavbar', function() {
    return {
        restrict: 'EA',
        templateUrl: 'views/nav.html',
        controller: 'NavCtrl',
        link: function (scope, element, attrs) {
            scope.buttonType = attrs.buttonType;
        }
    };
});