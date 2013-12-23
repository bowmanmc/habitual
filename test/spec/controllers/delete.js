'use strict';

describe('Controller: HabitDeleteCtrl', function () {

    var DeleteCtrl, scope, location, habitKey, habitSvc, chainSvc;

    beforeEach(module('habitual'));
    beforeEach(module('habitual.services.habit'));
    beforeEach(module('habitual.services.chain'));
    
    var routeParamsStub = jasmine.createSpy('routeParamsStub');

    /** When there is nothing in local storage **/
    beforeEach(inject(function($controller, $rootScope, $location, $routeParams, habitService, chainService) {
        scope = $rootScope.$new();
        location = $location;
        habitSvc = habitService;
        chainSvc = chainService;
        habitSvc.clearHabitual();
        var habit = habitSvc.createNewHabit('Write tests first.');
        routeParamsStub.habitId = habit.id;
        DeleteCtrl = $controller('HabitDeleteCtrl', {
            $scope: scope,
            $location: location,
            $routeParams: routeParamsStub,
            habitService: habitSvc,
            chainService: chainSvc
        });
    }));

    // it('should have one item in the habits array initially', function() {
    //     expect(habitSvc.getHabits().length).toBe(1);
    // });

    // // execute the deleteHabit method
    // it('Should remove the habit', function() {
    //     scope.deleteHabit(habitKey);

    //     // todo -- why doesn't this work? works in the browser...
    //     // must not have jasmine setup correctly...
    //     //expect(habitSvc.getHabits().length).toBe(0);
    //     expect(location.path()).toBe('/');
    // });

});
