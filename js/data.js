import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  createAvatarAdress,
  createElement,
  createRandomArray
} from './util.js';

const OFFER_COUNT = 1;
const [INITIAL_PRICE, FINAL_PRICE] = [1500, 10000];
const [MIN_GUESTS, MAX_GUESTS] = [1, 12];
const [MIN_ROOMS, MAX_ROOMS] = [1, 9];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_TABLE = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const [LATITUDE_INITIAL_NUMBER, LATITUDE_FINAL_NUMBER] = [35.65000, 35.70000];
const [LONGITUDE_INITIAL_NUMBER, LONGITUDE_FINAL_NUMBER] = [139.70000, 139.80000];
const apartments = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const randomAvatarAdress = createAvatarAdress(OFFER_COUNT);

const createOfferObject = () => {
  const latitude = getRandomPositiveFloat(LATITUDE_INITIAL_NUMBER, LATITUDE_FINAL_NUMBER);
  const longitude = getRandomPositiveFloat(LONGITUDE_INITIAL_NUMBER, LONGITUDE_FINAL_NUMBER);

  return ({
    author: {
      avatar: randomAvatarAdress(),
    },
    offer: {
      title: 'Аренда квартиры на длительный срок',
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(INITIAL_PRICE, FINAL_PRICE),
      type: createElement (TYPES),
      rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: createElement(TIME_TABLE),
      checkout: createElement(TIME_TABLE),
      features: createRandomArray(FEATURES),
      description: 'Дорого и богато.',
      photos: createRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  });
};

const createOffers = (count) => Array.from({length: count}, createOfferObject);

export {
  createOffers,
  OFFER_COUNT,
  apartments};
