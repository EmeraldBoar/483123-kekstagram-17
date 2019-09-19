'use strict';

(function () {
  var ESC_CODE = 27;

  // Функция создает массив от 1 до num
  var getArrNum = function (num) {
    var array = [];
    for (var i = 1; i <= num; i = i + 1) {
      array[i - 1] = i;
    }
    return array;
  };

  // Функция рандомного числа от min до max
  var getRandomNum = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

  window.util = {
    'ESC_CODE': ESC_CODE,
    'getRandomNum': getRandomNum,
    'getArrNum': getArrNum
  };
})();
