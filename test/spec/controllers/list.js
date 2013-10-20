'use strict';

describe('Controller: ListCtrl', function () {
    var ListCtrl, scope, location, localStorage;
    beforeEach(module('habitualApp'));

    /** When there is nothing in local storage **/
    beforeEach(inject(function($controller, $rootScope, $location, localStorageService) {
        scope = $rootScope.$new();
        location = $location;
        localStorage = localStorageService;
        localStorage.clearAll();
        ListCtrl = $controller('ListCtrl', {
            $scope: scope,
            $location: location,
            localStorageService: localStorage
        });
    }));

    // Make sure that when there are no habitual local storage keys, 
    // the controller forwards to the start page
    it('should forward to the start page when there are no keys', function() {
        expect(location.path()).toBe('/start');
    });

    /** No habits (keys prefixed with "habit." in localstorage **/
    beforeEach(inject(function($controller, $rootScope, $location, localStorageService) {
        scope = $rootScope.$new();
        location = $location;
        localStorage = localStorageService;
        localStorage.clearAll();
        localStorage.add('unit', 'test');
        ListCtrl = $controller('ListCtrl', {
            $scope: scope,
            $location: location,
            localStorageService: localStorage
        });
    }));

    it('should forward to the start page when there are no habits', function() {
        expect(location.path()).toBe('/start');
    });

    /** Make sure when there are habits, they are put in the habits array **/
    beforeEach(inject(function($controller, $rootScope, $location, localStorageService) {
        scope = $rootScope.$new();
        location = $location;
        localStorage = localStorageService;
        localStorage.clearAll();
        localStorage.add('habit.' + new Date().getTime(), {
            id: new Date().getTime(),
            text: 'unit test'
        });
        ListCtrl = $controller('ListCtrl', {
            $scope: scope,
            $location: location,
            localStorageService: localStorage
        });
    }));

    it('should have one item in the habits array', function() {
        expect(scope.habits.length).toBe(1);
    });

});
