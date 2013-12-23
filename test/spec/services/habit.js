'use strict';

describe('Service: HabitService', function () {

    var habitSvc, scope, q, deferred;

    beforeEach(function() {
        module('habitual.services.habit');

        inject(function(habitService, $rootScope, $q) {
            deferred = $q.defer();

            scope = $rootScope.$new();
            habitSvc = habitService;

            deferred.resolve('resolveData');
        });
    });

    // it('Should get a database handle', function() {
    //     console.log('getting database...');
    //     var result;
    //     habitSvc.getDatabase().then(function(db) {
    //         expect(db).toBeDefined();
    //         console.log('Got database: ' + db);
    //         result = db;
    //     });
    //     scope.$apply();
    //     expect(result).toBeDefined();
    // });

});

