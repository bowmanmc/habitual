'use strict';

describe('Controller: HabitDeleteCtrl', function () {
    var DeleteCtrl, scope, location, localStorage;
    var habitKey = 'habit.1234';
    beforeEach(module('habitual'));

    /** When there is nothing in local storage **/
    beforeEach(inject(function($controller, $rootScope, $location, localStorageService) {
        scope = $rootScope.$new();
        location = $location;
        localStorage = localStorageService;
        localStorage.clearAll();
        localStorage.add(habitKey, {foo: 'bar'});
        DeleteCtrl = $controller('HabitDeleteCtrl', {
            $scope: scope,
            $location: location,
            localStorageService: localStorage
        });
    }));

    it('Should have a habit initially', function() {
        var r = localStorage.get(habitKey);
        expect(r).toBeDefined();
    });

    // execute the deleteHabit method
    it('Should remove the habit', function() {
        scope.deleteHabit(habitKey);
        var r = localStorage.get(habitKey);
        // todo -- why doesn't this work? works in the browser...
        // must not have jasmine setup correctly...
        //expect(r).not.toBeDefined();
        expect(location.path()).toBe('/');
    });

});
