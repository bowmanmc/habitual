'use strict';

describe('Controller: HabitDetailsCtrl', function () {

    var DetailsCtrl, scope, location, habitSvc, chainSvc, habit;
    beforeEach(module('habitual'));
    beforeEach(module('habitual.services.habit'));
    beforeEach(module('habitual.services.chain'));

    var routeParamsStub = jasmine.createSpy('routeParamsStub');

    beforeEach(inject(function(
        $controller, $rootScope, $location, $routeParams, 
        habitService, chainService) {

        scope = $rootScope.$new();
        location = $location;
        chainSvc = chainService;
        habitSvc = habitService;
        habitSvc.clearHabitual();
        habit = habitSvc.createNewHabit('Write tests first.');
        routeParamsStub.habitId = habit.id;
        DetailsCtrl = $controller('HabitDetailsCtrl', {
            $scope: scope,
            $location: location,
            $routeParams: routeParamsStub,
            habitService: habitSvc,
            chainService: chainSvc
        });
    }));

    it('Should have totals equal to zero', function() {
        expect(scope.habit).toBeDefined();
        expect(scope.completed_links).toBe(0);
        expect(scope.total_links).toBe(1); // one for today
    });

    
});
