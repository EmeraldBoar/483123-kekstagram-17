'use strict';

(function () {
  var ESC_CODE = 27;
  var SUCCESS_CODE = 200;

  var getShuffleArray = function (array) {
    var count = array.length;
    var j = 0;
    var temp = 0;

    while (count--) {
      j = Math.floor(Math.random() * count);
      temp = array[count];
      array[count] = array[j];
      array[j] = temp;
    }
    return array;
  };


  window.util = {
    'ESC_CODE': ESC_CODE,
    'SUCCESS_CODE': SUCCESS_CODE,
    'getShuffleArray': getShuffleArray
  };
})();
