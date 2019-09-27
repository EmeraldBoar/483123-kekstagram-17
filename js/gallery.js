'use strict';

(function () {
  var NUM_PHOTO = 25;
  var PHOTO_URL = 'https://js.dump.academy/kekstagram/data';

  var template = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');


  var onSuccess = function (data) {
    for (var i = 0; i < NUM_PHOTO; i = i + 1) {
      var similarPhoto = template.cloneNode(true);
      similarPhoto.querySelector('.picture__img').src = data[i].url;
      similarPhoto.querySelector('.picture__comments').textContent = data[i].comments.length;
      similarPhoto.querySelector('.picture__likes').textContent = data[i].likes;
      pictures.appendChild(similarPhoto);
    }
  };

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'display: flex; justify-content: center; align-items: center; height: 30px; z-index: 100; margin: 0 auto; background-color: red;';
    errorBlock.style.position = 'absolute';
    errorBlock.style.right = '0';
    errorBlock.style.left = '0';
    errorBlock.style.fontSize = '20px';

    errorBlock.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  window.load('GET', PHOTO_URL, onSuccess, onError);
})();
