'use strict';

(function () {
  var MIN_SCALE_PERCENT = 25;
  var MAX_SCALE_PERCENT = 100;
  var STEP_SCALE_PERCENT = 25;
  var uploadFile = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var closePopupButton = uploadPopup.querySelector('.img-upload__cancel');
  var imagePreviewWrapper = uploadPopup.querySelector('.img-upload__preview');
  var imagePreview = uploadPopup.querySelector('.img-upload__preview > img');
  var effectRadioButtons = uploadPopup.querySelectorAll('.effects__radio');
  var effectSlider = uploadPopup.querySelector('.img-upload__effect-level');
  var effectSliderPin = uploadPopup.querySelector('.effect-level__pin');
  var effectSliderLine = uploadPopup.querySelector('.effect-level__line');
  var effectSliderDepth = uploadPopup.querySelector('.effect-level__depth');
  var effectSliderInput = uploadPopup.querySelector('.effect-level__value');
  var scaleSmallerButton = uploadPopup.querySelector('.scale__control--smaller');
  var scaleBiggerButton = uploadPopup.querySelector('.scale__control--bigger');
  var scaleInput = uploadPopup.querySelector('.scale__control--value');
  var popupTextDiscription = uploadPopup.querySelector('.text__description');

  // Начальное состояние чекнутого при открытии попапа
  var getInitialStateEffects = function () {
    for (var j = 0; j < effectRadioButtons.length; j++) {
      if (effectRadioButtons[j].checked) {
        imagePreviewWrapper.classList.add('effects__preview--' + effectRadioButtons[j].value);
      }
      if (effectRadioButtons[j].checked && effectRadioButtons[j].value === 'none') {
        effectSlider.classList.add('hidden');
      }
    }
  };

  // Уменьшение маштаба изображения
  var getScaleDown = function () {
    var scaleValue = parseInt(scaleInput.value, 10);
    if (scaleValue > MIN_SCALE_PERCENT) {
      scaleValue = scaleValue - STEP_SCALE_PERCENT;
      scaleInput.value = scaleValue + '%';
      imagePreview.style.transform = 'scale(' + (scaleValue / 100) + ')';
    }
  };

  // Увелечение маштаба изображения
  var getScaleUp = function () {
    var scaleValue = parseInt(scaleInput.value, 10);
    if (scaleValue < MAX_SCALE_PERCENT) {
      scaleValue = scaleValue + STEP_SCALE_PERCENT;
      scaleInput.value = scaleValue + '%';
      imagePreview.style.transform = 'scale(' + (scaleValue / 100) + ')';
    }
  };


  // Сброс значений эффектов до начальных
  var getResetEffect = function () {
    imagePreviewWrapper.setAttribute('style', ' ');
    effectSliderPin.style.left = '100%';
    effectSliderDepth.style.width = '100%';
    scaleInput.value = '100%';
    effectSliderInput.value = effectSliderLine.offsetWidth;
  };


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_CODE && evt.target !== popupTextDiscription) {
      closePopup();
    }
  };

  var onCloseButtonClick = function () {
    closePopup();
  };

  var onUploadFileChange = function () {
    openPopup();
  };

  var onScaleSmallerButtonClick = function () {
    getScaleDown();
  };

  var onScaleBiggerButtonClick = function () {
    getScaleUp();
  };


  var openPopup = function () {
    uploadPopup.classList.remove('hidden');
    closePopupButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
    scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
    scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
    getInitialStateEffects();
    getResetEffect();
  };

  var closePopup = function () {
    var secondClass = imagePreviewWrapper.classList.item(1);
    imagePreviewWrapper.classList.remove(secondClass);
    uploadPopup.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
    imagePreview.style.transform = 'scale(1)';
  };


  uploadFile.addEventListener('change', onUploadFileChange);


  // Функция переключения эффектов
  var switchEffects = function (evt) {
    var secondClass = imagePreviewWrapper.classList.item(1);
    imagePreviewWrapper.classList.remove(secondClass);
    if (evt.target.value === 'none') {
      effectSlider.classList.add('hidden');
    } else if (effectSlider.classList.contains('hidden')) {
      effectSlider.classList.remove('hidden');
    }
    imagePreviewWrapper.classList.add('effects__preview--' + evt.target.value);
    imagePreview.style.transform = 'scale(1)';
    getResetEffect();
  };


  // Обработчик клика по кнопке эффектов
  var onEffectButtonClick = function (evt) {
    switchEffects(evt);
  };

  // Цикл для навешивания слушателя событий на каждый элемент коллекции effectRadioButtons
  for (var k = 0; k < effectRadioButtons.length; k++) {
    effectRadioButtons[k].addEventListener('click', onEffectButtonClick);
  }

  // Работа с перетаскиванием и изменением насыщенности эффектов

  // Функция высчитывает насыщенность эффектов
  var getChangeSaturationEffect = function () {
    var sliderLevelEffect = null;
    var parseIntSaturationEffect = parseInt(effectSliderPin.style.left, 10);
    switch (imagePreviewWrapper.classList.item(1)) {
      case 'effects__preview--chrome':
        sliderLevelEffect = parseIntSaturationEffect * 1 / effectSliderLine.offsetWidth;
        imagePreviewWrapper.style.filter = 'grayscale(' + sliderLevelEffect + ')';
        break;
      case 'effects__preview--sepia':
        sliderLevelEffect = parseIntSaturationEffect * 1 / effectSliderLine.offsetWidth;
        imagePreviewWrapper.style.filter = 'sepia(' + sliderLevelEffect + ')';
        break;
      case 'effects__preview--marvin':
        sliderLevelEffect = parseIntSaturationEffect * 100 / effectSliderLine.offsetWidth;
        imagePreviewWrapper.style.filter = 'invert(' + sliderLevelEffect + '%)';
        break;
      case 'effects__preview--phobos':
        sliderLevelEffect = parseIntSaturationEffect * 3 / effectSliderLine.offsetWidth;
        imagePreviewWrapper.style.filter = 'blur(' + sliderLevelEffect + 'px)';
        break;
      case 'effects__preview--heat':
        sliderLevelEffect = (parseIntSaturationEffect * 2 / effectSliderLine.offsetWidth) + 1;
        imagePreviewWrapper.style.filter = 'brightness(' + sliderLevelEffect + ')';
        break;
    }
  };

  effectSliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };

    var onSliderPinMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };


      if (effectSliderPin.offsetLeft - shift.x < 0) {
        effectSliderPin.style.left = 0;
        effectSliderDepth.style.width = 0;
      } else if (effectSliderPin.offsetLeft - shift.x > effectSliderLine.offsetWidth) {
        effectSliderPin.style.left = effectSliderLine.offsetWidth + 'px';
        effectSliderDepth.style.width = effectSliderLine.offsetWidth + 'px';
      } else {
        effectSliderPin.style.left = (effectSliderPin.offsetLeft - shift.x) + 'px';
        effectSliderDepth.style.width = (effectSliderPin.offsetLeft - shift.x) + 'px';
        effectSliderInput.value = parseInt(effectSliderPin.style.left, 10);
        getChangeSaturationEffect();
      }
    };

    var onSliderPinUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onSliderPinMove);
      document.removeEventListener('mouseup', onSliderPinMove);
    };

    document.addEventListener('mousemove', onSliderPinMove);
    document.addEventListener('mouseup', onSliderPinUp);
  });
})();
