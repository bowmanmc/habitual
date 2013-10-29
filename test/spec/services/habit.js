'use strict';

describe('Service: HabitService', function () {

    var habitSvc, scope, location, localStorage;
    //beforeEach(module('habitual'));
    beforeEach(function() {
        module('habitual.services.habit');

        inject(function(habitService, localStorageService) {
            habitSvc = habitService;
            localStorage = localStorageService;
        });

        // Setup our initial list of habits
        localStorage.clearAll();
        habitSvc.storeNewHabit('Write tests first.');
        habitSvc.storeNewHabit('Modularize');
        habitSvc.storeNewHabit('Rock and Roll');
    });

    it('Should remove habits', function() {
        var habits = habitSvc.getHabits();
        expect(habits.length).toBe(3);
        var id = habits[0].id;
        console.log('Removing habit: ' + id);
        habitSvc.deleteHabit(id);
        expect(habitSvc.getHabits().length).toBe(2);
    });

    it('Should return null for bad keys', function() {
        var habits = habitSvc.getHabits();
        expect(habits.length).toBe(3);
        expect(habitSvc.getHabit('foobarbaz')).toBeNull();
    });

    it('Should lookup habits by key or id', function() {
        var habits = habitSvc.getHabits();
        expect(habits.length).toBe(3);
        var id = habits[0].id;
        var key = 'habit.' + id;
        expect(habitSvc.getHabit(id)).not.toBeNull();
        expect(habitSvc.getHabit(key)).not.toBeNull();
    });
});

