'use strict';

var NUM_PHOTO = 25;
var PHOTO_ARRAY = [];
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
  while (count = count - 1) {
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
    }
  }
  return comments;
};

// Функция создания массива объектов где num - количество объектов, а array - массив куда объекты записываются
var createDiscriptionPhoto = function (num, array) {
  for (var i = 0; i < num; i = i + 1) {
    array[i] = {
      url: 'photos/' + getShuffleArr(NUM_PHOTO)[i] + '.jpg',
      likes: getRandomNum(15, 200),
      comments: createCommentsArray()
    }
  }
};

createDiscriptionPhoto(NUM_PHOTO, PHOTO_ARRAY);
console.log(PHOTO_ARRAY);
