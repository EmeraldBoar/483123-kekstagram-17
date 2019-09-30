'use strict';

(function () {
  var NUM_NEW_PHOTOS = 10;
  var PHOTO_URL = 'https://js.dump.academy/kekstagram/data';

  var template = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var imageFilters = document.querySelector('.img-filters');
  var imageFilterButtons = imageFilters.querySelectorAll('.img-filters__button');


  // Отрисовка похожих фотографий
  var renderSimilarPhoto = function (element) {
    var similarPhoto = template.cloneNode(true);
    similarPhoto.querySelector('.picture__img').src = element.url;
    similarPhoto.querySelector('.picture__comments').textContent = element.comments.length;
    similarPhoto.querySelector('.picture__likes').textContent = element.likes;
    pictures.appendChild(similarPhoto);
  };

  // Генерирует данные на основе ID - элемента
  var getChangeFilteredData = function (data) {
    imageFilterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        switch (button.id) {
          case 'filter-popular':
            data.forEach(function (element) {
              renderSimilarPhoto(element);
            });
            break;
          case 'filter-new':
            var mixedArray = window.util.getShuffleArray(data.slice())
                                        .slice(0, NUM_NEW_PHOTOS);
            mixedArray.forEach(function (element) {
              renderSimilarPhoto(element);
            });
            break;

          case 'filter-discussed':
            var discussedArray = data
                                .slice()
                                .sort(function (first, second) {
                                  return first.comments.length - second.comments.length;
                                })
                                .reverse();
            discussedArray.forEach(function (element) {
              renderSimilarPhoto(element);
            });
            break;
        }
      }
    });
  };

  // Переключение активного элемента фильтров
  var activeСlassSwitching = function (evt) {
    imageFilterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  };


  // Удаляет фотографии из DOM - дерева
  var cleansDataPhoto = function () {
    var photo = document.querySelectorAll('.picture');
    photo.forEach(function (it) {
      pictures.removeChild(it);
    });
  };

  var lastTimeout;

  var onSuccess = function (data) {
    imageFilters.classList.remove('img-filters--inactive');
    getChangeFilteredData(data);
    imageFilterButtons.forEach(function (button) {
      button.addEventListener('click', function (evt) {
        if (!evt.target.classList.contains('img-filters__button--active')) {
          activeСlassSwitching(evt);
          if (lastTimeout) {
            window.clearTimeout(lastTimeout);
          }
          lastTimeout = window.setTimeout(function () {
            cleansDataPhoto();
            getChangeFilteredData(data);
          }, 500);
        }
      });
    });
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
