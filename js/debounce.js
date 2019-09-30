'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout = null;

  var debounce = function (callBack) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      callBack();
    }, DEBOUNCE_INTERVAL);
  };
  window.debounce = debounce;
})();
