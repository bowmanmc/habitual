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
