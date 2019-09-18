'use strict';

var NUM_PHOTO = 25;
var COMMENTS_ARRAY = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MAX_NUM_COMMENTS = 6;
var AUTHOR_LIST = [
  {
    name: 'Артем',
    img: 'img/avatar-6.svg'
  },
  {
    name: 'Василий',
    img: 'img/avatar-5.svg'
  },
  {
    name: 'Диана',
    img: 'img/avatar-4.svg'
  },
  {
    name: 'Анастасия',
    img: 'img/avatar-3.svg'
  },
  {
    name: 'Валерий',
    img: 'img/avatar-2.svg'
  },
  {
    name: 'Марк',
    img: 'img/avatar-1.svg'
  },
];

var ESC_CODE = 27;
var MIN_SCALE_PERCENT = 25;
var MAX_SCALE_PERCENT = 100;
var STEP_SCALE_PERCENT = 25;
var photoArray = [];


// Функция создает массив от 1 до num
var getArrNum = function (num) {
  var array = [];
  for (var i = 1; i <= num; i = i + 1) {
    array[i - 1] = i;
  }
  return array;
};

// Функция рандомного числа от min до max
function getRandomNum(min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
}

// Функция создания массива с объектами где объекты являются комментариями к фотографии
var createCommentsArray = function () {
  var comments = [];
  var randomComment = COMMENTS_ARRAY[getRandomNum(0, COMMENTS_ARRAY.length - 1)];
  for (var i = 1; i <= getRandomNum(1, MAX_NUM_COMMENTS); i = i + 1) {
    var randomAuthor = getRandomNum(0, AUTHOR_LIST.length - 1);
    comments[i - 1] = {
      avatar: AUTHOR_LIST[randomAuthor].img,
      message: randomComment + ' ' + randomComment,
      name: AUTHOR_LIST[randomAuthor].name
    };
  }
  return comments;
};

// Функция создает и возвращает массив объектов где num - количество объектов в массиве.
var createDiscriptionPhoto = function (num) {
  var array = [];
  var arrayNumPhoto = getArrNum(NUM_PHOTO);
  for (var i = 0; i < num; i = i + 1) {
    array[i] = {
      url: 'photos/' + arrayNumPhoto[i] + '.jpg',
      likes: getRandomNum(15, 200),
      comments: createCommentsArray()
    };
  }
  return array;
};

photoArray = createDiscriptionPhoto(NUM_PHOTO);

// Работа с шаблоном
var template = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');

for (var i = 0; i < photoArray.length; i = i + 1) {
  var similarPhoto = template.cloneNode(true);
  similarPhoto.querySelector('.picture__img').src = photoArray[i].url;
  similarPhoto.querySelector('.picture__comments').textContent = photoArray[i].comments.length;
  similarPhoto.querySelector('.picture__likes').textContent = photoArray[i].likes;
  pictures.appendChild(similarPhoto);
}


// Работа с PopUp
var uploadFile = document.querySelector('#upload-file');
var uploadPopup = document.querySelector('.img-upload__overlay');
var closePopupButton = uploadPopup.querySelector('.img-upload__cancel');
var imagePreviewWrapper = uploadPopup.querySelector('.img-upload__preview');
var imagePreview = uploadPopup.querySelector('.img-upload__preview > img');
var effectRadioButtons = uploadPopup.querySelectorAll('.effects__radio');
var effectSlider = uploadPopup.querySelector('.img-upload__effect-level');
var effectSliderPin = uploadPopup.querySelector('.effect-level__pin');
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
};


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE && evt.target !== popupTextDiscription) {
    closePopup();
  }
};

var onPopupOverlayClick = function (evt) {
  if (evt.target.className === 'img-upload__overlay') {
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
  uploadPopup.addEventListener('click', onPopupOverlayClick);
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

// Функция высчитывает насыщенность эффектов
var getChangeSaturationEffect = function () {
  var parseIntSaturationEffect = parseInt(effectSliderPin.style.left, 10);
  switch (imagePreviewWrapper.classList.item(1)) {
    case 'effects__preview--chrome':
      effectSliderInput.value = parseIntSaturationEffect / 100;
      imagePreviewWrapper.style.filter = 'grayscale(' + effectSliderInput.value + ')';
      break;
    case 'effects__preview--sepia':
      effectSliderInput.value = parseIntSaturationEffect / 100;
      imagePreviewWrapper.style.filter = 'sepia(' + effectSliderInput.value + ')';
      break;
    case 'effects__preview--marvin':
      effectSliderInput.value = parseIntSaturationEffect;
      imagePreviewWrapper.style.filter = 'invert(' + effectSliderInput.value + '%)';
      break;
    case 'effects__preview--phobos':
      effectSliderInput.value = parseIntSaturationEffect * 3 / 100;
      imagePreviewWrapper.style.filter = 'blur(' + effectSliderInput.value + 'px)';
      break;
    case 'effects__preview--heat':
      effectSliderInput.value = (parseIntSaturationEffect * 2 / 100) + 1;
      imagePreviewWrapper.style.filter = 'brightness(' + effectSliderInput.value + ')';
      break;
  }
};

var onSliderPinMouseUp = function () {
  getChangeSaturationEffect();
};

effectSliderPin.addEventListener('mouseup', onSliderPinMouseUp);
