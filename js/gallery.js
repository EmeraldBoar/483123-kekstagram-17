'use strict';

(function () {
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

  var photoArray = [];

  // Функция создания массива с объектами где объекты являются комментариями к фотографии
  var createCommentsArray = function () {
    var comments = [];
    var randomComment = COMMENTS_ARRAY[window.util.getRandomNum(0, COMMENTS_ARRAY.length - 1)];
    for (var i = 1; i <= window.util.getRandomNum(1, MAX_NUM_COMMENTS); i = i + 1) {
      var randomAuthor = window.util.getRandomNum(0, AUTHOR_LIST.length - 1);
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
    var arrayNumPhoto = window.util.getArrNum(NUM_PHOTO);
    for (var i = 0; i < num; i = i + 1) {
      array[i] = {
        url: 'photos/' + arrayNumPhoto[i] + '.jpg',
        likes: window.util.getRandomNum(15, 200),
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
})();
