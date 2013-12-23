'use strict';

var dbServices = angular.module('myapp.services.db', []);

dbServices.service('dbService', function($q, $rootScope, $timeout) {

    this.getDatabase = function() {
        var deferred = $q.defer();

        var later = function() {
            deferred.resolve({'id': 'howdy'});
        };

        $timeout(later, 500);
        return deferred.promise;
    };

});
