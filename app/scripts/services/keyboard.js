'use strict';

var keyboardServices = angular.module('habitual.services.keyboard', []);

keyboardServices.service('keyboardService', function() {

    this.handleKeyPress = function(event) {
        if (typeof event === 'undefined' ||
            typeof event.keyCode === 'undefined') {
            console.log('Bad key press event...');
            return;
        }

        if (event.keyCode === 27) {
            this.handleKeyEscape();
        }
    };

    this.handleKeyEscape = function() {
        console.log('handling escape key event!');
        // If we're running as a chrome app, get it out of fullscreen mode
        if (typeof chrome !== 'undefined') {
            var appWindow = chrome.app.window.current();
            appWindow.restore();
        }
    };
});
