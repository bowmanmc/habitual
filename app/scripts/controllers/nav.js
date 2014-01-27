'use strict';

angular.module('habitual').controller('NavCtrl',
function ($scope, $location, $window) {

    $scope.loadAddScreen = function() {
        $location.path('/add');
    };

    $scope.showScreenControls = function() {
        // If we're running as a chrome app, show the screen controls
        if (typeof chrome !== 'undefined') {
            return true;
        }
        return false;
    };

    // These only apply to the chrome version of the app.
    // screensize - tells navbar.html what the current state is.
    //         fullscreen - we're a fullscreen chrome app
    //         regular - we're a regular chrome app
    //         none - who knows what we are...
    $scope.screensize = 'fullscreen'; // we start out fullscreen
    $scope.getCurrentScreenSize = function() {
        // just a double check to make sure the chrome vars are available
        if (typeof chrome !== 'undefined') {
            var appWindow = chrome.app.window.current();
            if (appWindow.isFullscreen()) {
                return 'fullscreen';
            }
            else {
                return 'regular';
            }
        }
        return 'none';
    };

    $scope.toggleScreenSize = function() {
        if (typeof chrome === 'undefined') {
            // nothing for us to do...
            return;
        }
        var appWindow = chrome.app.window.current();
        if (appWindow.isFullscreen()) {
            $scope.screensize = 'regular';
            appWindow.restore();
        }
        else {
            $scope.screensize = 'fullscreen';
            appWindow.fullscreen();
        }
    };
});
