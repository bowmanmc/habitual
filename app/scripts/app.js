'use strict';

angular.module('habitualApp', ['ngRoute', 'ngTouch', 'LocalStorageModule'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
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
  })
  .directive('hbtNavbar', function() {
    return {
      restrict: 'EA',
      templateUrl: 'views/nav.html',
      controller: 'NavCtrl',
      link: function (scope, element, attrs) {
          scope.buttonType = attrs.buttonType;
      }
    };
  });
