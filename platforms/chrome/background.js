
chrome.app.runtime.onLaunched.addListener(function() {

    chrome.app.window.create('index.html', {
        'bounds': {
          'width': 768,
          'height': 512
        },
        frame: 'chrome',
        state: 'fullscreen'
    });

    var appWindow = chrome.app.window.current();
    appWindow.document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            alert("Escape");
        }
    };

    setTimeout(function() {
        console.log('restoring the window...');
        appWindow.restore();
    }, 10 * 1000);
});
