'use strict';

angular.module('habitual').controller('NavCtrl',
function ($scope, $location, $window) {

    $scope.hidden = false;

    $scope.loadAddScreen = function() {
        $location.path('/add');
    };

    $scope.showScreenControls = function() {
        // If we're running as a chrome app, show the screen controls
        if (typeof chrome !== 'undefined' &&
            typeof chrome.app.window !== 'undefined') {
            return true;
        }
        return false;
    };

    // These only apply to the chrome version of the app.
    $scope.updateCurrentScreenSize = function() {
        // just a double check to make sure the chrome vars are available
        var result = 'none';
        if (typeof chrome !== 'undefined' &&
            typeof chrome.app.window !== 'undefined') {

            var appWindow = chrome.app.window.current();
            if (appWindow.isFullscreen()) {
                result = 'fullscreen';
            }
            else {
                result = 'regular';
            }
        }
        console.log('Updating current screensize to: ' + result);
        $scope.screensize = result;
        if(!$scope.$$phase) $scope.$apply();
    };

    $scope.toggleScreenSize = function() {
        if (typeof chrome === 'undefined' ||
            typeof chrome.app.window === 'undefined') {
            // nothing for us to do...
            return;
        }
        var appWindow = chrome.app.window.current();
        if (appWindow.isFullscreen()) {
            appWindow.restore();
        }
        else {
            appWindow.fullscreen();
        }
    };

    // screensize - tells navbar.html what the current state is.
    //         fullscreen - we're a fullscreen chrome app
    //         regular - we're a regular chrome app
    //         none - who knows what we are...
    $scope.screensize = 'none';
    $scope.updateCurrentScreenSize();

    // Hookup Chrome App Events
    if (typeof chrome !== 'undefined' &&
        typeof chrome.app.window !== 'undefined') {

        angular.element($window).on('keydown', function(e) {
            // 27 == escape key was pressed
            if (e.keyCode === 27) {
                $scope.toggleScreenSize();
            }
        });

        // App Window Events
        var appWindow = chrome.app.window.current();
        appWindow.onFullscreened.addListener(function() {
            //console.log('onFullscreened event!');
            $scope.updateCurrentScreenSize();
        });
        appWindow.onRestored.addListener(function() {
            //console.log('onRestored event!');
            $scope.updateCurrentScreenSize();
        });

    }

});
