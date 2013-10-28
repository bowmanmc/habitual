'use strict';

var app = angular.module('habitual', [
    'habitual.services.habit',
    'habitual.directives.navbar',
    'LocalStorageModule',
    'ngRoute',
    'ngTouch'
]);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
    })
    .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddFormCtrl'
    })
    .when('/start', {
        templateUrl: 'views/start.html',
        controller: 'NavCtrl'
    })
    .when('/habit/:habitId', {
        templateUrl: 'views/details.html',
        controller: 'HabitDetailsCtrl'
    })
    .when('/habit/delete/:habitId', {
        templateUrl: 'views/delete.html',
        controller: 'HabitDeleteCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
