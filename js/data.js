import { getRandomInteger, createUnicId, getRandomArrayElement } from './util.js';

const COMMENTATORS_NAMES = [
  'Иван Иванов',
  'Сергей Смирнов',
  'Елена Кузнецова',
  'Александр Алексеев',
  'Татьяна Смирнова',
  'Владимир Морозов',
  'Екатерина Сергеева',
  'Денис Васильев',
  'Анна Иванова',
];

const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Залитый солнцем лесной пейзаж с рекой и деревянным мостом.',
  'Уютное кафе с яркими зонтиками на фоне городского канала.',
  'Цветущий вишневый сад с видом на старинный замок на горизонте.',
  'Домашний питомец - пушистый кот на подоконнике с видом на город.',
  'Рыжеволосая девушка с воздушным змеем на пляже, наслаждающаяся прибоем.',
  'Огни ночного мегаполиса, отражающиеся в темной воде залива.',
  'Капли дождя на стекле, за которыми видно оживленную городскую улицу.',
  'Белоснежный песчаный пляж с пальмами и лазурным океаном на заднем плане.',
  'Табун лошадей на свободном выпасе на фоне зеленых холмов и яркого неба.',
  'Осенний парк с разноцветными деревьями, окутанными золотистым туманом.',
];

const PICTURE_COUNT = 25;
const COMMENT_COUNT = 30;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;

const createMessage = () =>
  Array.from({
    length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(COMMENT_LINES),
  ).join(' ');

const unicCommentId = createUnicId(1, 700);

const createComment = () => ({
  id: unicCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(COMMENTATORS_NAMES),
});

const unicPictureId = createUnicId(1, PICTURE_COUNT);
const unicUrlId = createUnicId(1, PICTURE_COUNT);

const createPictureDescription = () => ({
  id: unicPictureId(),
  url: `photos/${unicUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({
    length: getRandomInteger(0, COMMENT_COUNT)
  }, createComment),
});

const createPictures = () =>
  Array.from({
    length: PICTURE_COUNT
  }, createPictureDescription);

export { createPictures };
