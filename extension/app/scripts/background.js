'use strict';
(function() {

  var _getDomain = function(uri) {
    var parser = document.createElement('a');
    parser.href = uri;

    return parser.hostname;
  }

  function _setDefaultIcon(callback) {
    chrome.browserAction.setIcon({path: 'images/spinner.gif'}, function(e, d) {
      return callback();
    });
  }

  var _takeMeasurement = function(request, callback) {
    console.log('req', request);

    if (!('main_frame' == request.type) && !(true == request.active)) {
      return callback(false);
    }

    _setDefaultIcon(function() {
      // fetch data from another domain with JSONP
      $.getJSON('http://bashmach.koding.io/measurement/take?domain='+_getDomain(request.url), function(response){

        chrome.browserAction.setIcon({path: 'http://bashmach.koding.io/img/icons/'+response.temperature+'-38.png'}, function(e, d) {
          console.log(e, d);
        });

        if (typeof callback === 'function') {
          return callback(true);
        } else {
          return true;
        }
      });
    });
  }

  chrome.tabs.onActivated.addListener(function(tab) {
    chrome.tabs.get(tab.tabId, function(tab) {
      console.log('current tab:', tab);

      return _takeMeasurement(tab)
    });
  });

  chrome.webRequest.onCompleted.addListener(
    function(details) {
      return _takeMeasurement(details);
    },
    {urls: ["<all_urls>"]},
    ["blocking"]);

})();
