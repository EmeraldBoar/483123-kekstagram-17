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
var photoArray = [];


// Функция создает массив от 1 до num и перемешивает его в случайном порядке
var getShuffleArr = function (num) {
  var array = [];
  for (var i = 1; i <= num; i = i + 1) {
    array[i - 1] = i;
  }
  var count = array.length;
  var j = null;
  var temp = null;
  while (count--) {
    j = Math.floor(Math.random() * count);
    temp = array[count];
    array[count] = array[j];
    array[j] = temp;
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
  var shuffleArray = getShuffleArr(NUM_PHOTO);
  var array = [];
  for (var i = 0; i < num; i = i + 1) {
    array[i] = {
      url: 'photos/' + shuffleArray[i] + '.jpg',
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
var imageUploadPopup = document.querySelector('.img-upload__overlay');
var closePopupButton = imageUploadPopup.querySelector('.img-upload__cancel');


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closePopup();
  }
};


var openPopup = function () {
  imageUploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imageUploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onCloseButtonClick = function () {
  closePopup();
};

var onUploadFileChange = function () {
  openPopup();
};

uploadFile.addEventListener('change', onUploadFileChange);
closePopupButton.addEventListener('click', onCloseButtonClick);
