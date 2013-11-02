'use strict';

describe('Controller: ListCtrl', function () {

    var ListCtrl, scope, location, habitSvc;
    beforeEach(module('habitual'));
    beforeEach(module('habitual.services.habit'));
    beforeEach(module('habitual.services.chain'));

    /** When there is nothing in local storage **/
    beforeEach(inject(function($controller, $rootScope, $location, habitService, chainService) {
        scope = $rootScope.$new();
        location = $location;
        habitSvc = habitService;
        habitSvc.clearHabitual();
        ListCtrl = $controller('ListCtrl', {
            $scope: scope,
            $location: location,
            habitService: habitSvc
        });
    }));

    // Make sure that when there are no habitual local storage keys, 
    // the controller forwards to the start page
    it('should forward to the start page when there are no keys', function() {
        expect(location.path()).toBe('/start');
    });

    /** Make sure when there are habits, they are put in the habits array **/
    beforeEach(inject(function($controller, $rootScope, $location, habitService, chainService) {
        scope = $rootScope.$new();
        location = $location;
        habitSvc = habitService;
        habitSvc.clearHabitual();
        habitSvc.createNewHabit('Write tests first.');
        ListCtrl = $controller('ListCtrl', {
            $scope: scope,
            $location: location,
            habitService: habitSvc
        });
    }));

    it('should have one item in the habits array', function() {
        expect(scope.habits.length).toBe(1);
    });

});
