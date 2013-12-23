'use strict';

describe('Service: ChainService', function () {

    var chainSvc, habitSvc, localStorage;

    beforeEach(function() {
        module('habitual.services.chain');
        module('habitual.services.habit');

        inject(function(chainService, habitService, localStorageService) {
            chainSvc = chainService;
            habitSvc = habitService;
            localStorage = localStorageService;
        });

        // Setup our initial list of habits
        localStorage.clearAll();
        habitSvc.createNewHabit('Write tests first.');
        habitSvc.createNewHabit('Modularize');
        habitSvc.createNewHabit('Rock and Roll');
    });

    // it ('Should start with 3 habits...', function() {
    //     expect(habitSvc.getHabits().length).toBe(3);
    // });

    // it ('Should toggle day completed field', function() {
    //     var now = moment();
    //     var today = now.format('YYYY-MM-DD');
    //     var habit = habitSvc.getHabits()[0];
    //     expect(habit.chain[today]).toBeUndefined();
    //     chainSvc.toggle(habit, today);
    //     expect(habit.chain[today]).toBeDefined();
    //     expect(habit.chain[today].completed).toBe(true);
    //     chainSvc.toggle(habit, today);
    //     expect(habit.chain[today].completed).toBe(false);
    // });

    // it ('Should fill out chains correctly', function() {
    //     var habit = habitSvc.getHabits()[0];
    //     var start_date = moment();

    //     start_date.subtract('days', 5);
    //     habit.date_started = start_date;
    //     var chain = chainSvc.getFilledOutChain(habit);
    //     expect(chain.length).toBe(5);

    //     start_date = moment();
    //     start_date.subtract('days', (chainSvc.MAX_LENGTH + 1));
    //     habit.date_started = start_date;
    //     chain = chainSvc.getFilledOutChain(habit);
    //     expect(chain.length).toBe(chainSvc.MAX_LENGTH);
    // });
    
});
