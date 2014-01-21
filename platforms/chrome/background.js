
chrome.app.runtime.onLaunched.addListener(function() {

  chrome.app.window.create('index.html', {
    'bounds': {
      'width': 768,
      'height': 512
    },
    frame: 'chrome',
    state: 'fullscreen'
  });

  //chrome.app.window.current().fullscreen();
  //document.body.webkitRequestFullscreen();
});
