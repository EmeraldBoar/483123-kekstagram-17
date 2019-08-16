'use strict';

var NUM_PHOTO = 25;
var PHOTO_ARRAY = null;
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
  for (var i = 1; i <= getRandomNum(1, MAX_NUM_COMMENTS); i = i + 1) {
    var randomAuthor = getRandomNum(0, AUTHOR_LIST.length - 1);
    comments[i - 1] = {
      avatar: AUTHOR_LIST[randomAuthor].img,
      message: COMMENTS_ARRAY[getRandomNum(0, COMMENTS_ARRAY.length - 1)] + ' ' + COMMENTS_ARRAY[getRandomNum(0, COMMENTS_ARRAY.length - 1)],
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

PHOTO_ARRAY = createDiscriptionPhoto(NUM_PHOTO);

// Работа с шаблоном
var template = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');


for (var i = 0; i < PHOTO_ARRAY.length; i = i + 1) {
  var similarPhoto = template.cloneNode(true);
  var pictureImage = similarPhoto.querySelector('.picture__img');
  var pictureComments = similarPhoto.querySelector('.picture__comments');
  var pictureLikes = similarPhoto.querySelector('.picture__likes');
  pictureImage.src = PHOTO_ARRAY[i].url;
  pictureComments.textContent = PHOTO_ARRAY[i].comments.length;
  pictureLikes.textContent = PHOTO_ARRAY[i].likes;
  fragment.appendChild(similarPhoto);
}

pictures.appendChild(fragment);
