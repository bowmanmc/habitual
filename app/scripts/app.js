'use strict';

var app = angular.module('habitual', [
    'habitual.directives.navbar',
    'habitual.services.chain',
    'habitual.services.habit',
    'LocalStorageModule',
    'ngAnimate',
    'ngRoute',
    'ngTouch'
]);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/card.html',
        controller: 'ListCtrl'
    })
    .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddFormCtrl'
    })
    .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
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
    .when('/habit/reset/:habitId', {
        templateUrl: 'views/reset.html',
        controller: 'HabitResetCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
