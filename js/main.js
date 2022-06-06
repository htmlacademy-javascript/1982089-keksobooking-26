const OFFER_COUNT = 10;
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

const checkPositiveArray = (initialNumber, finalNumber) => (initialNumber < 0 || finalNumber < 0) ? 0 : 1;

const swapValues = (initialNumber, finalNumber) => {
  if (finalNumber < initialNumber) {
    finalNumber = [initialNumber, initialNumber = finalNumber][0];
  }

  return [initialNumber, finalNumber];
};

const getRandomPositiveInteger = (initialNumber, finalNumber) => {
  if (checkPositiveArray(initialNumber, finalNumber) === 0) {
    return;
  }

  [initialNumber, finalNumber] = swapValues(initialNumber, finalNumber);

  initialNumber = Math.ceil(initialNumber);
  finalNumber = Math.floor(finalNumber);

  return Math.floor(Math.random() * (finalNumber - initialNumber + 1)) + initialNumber;
};

const getRandomPositiveFloat = (initialNumber, finalNumber, presicion = 5) => {
  if (checkPositiveArray(initialNumber, finalNumber) === 0) {
    return;
  }

  [initialNumber, finalNumber] = swapValues(initialNumber, finalNumber);

  return (Math.random() * (finalNumber - initialNumber) + initialNumber).toFixed(presicion);
};

const createAvatarAdress = (length) => {
  const randomNumber = getRandomPositiveInteger(1, length);

  return(
    (randomNumber < length) ?
      `img/avatars/user0${randomNumber}.png` :
      `img/avatars/user${randomNumber}.png`
  );
};

const createElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createRandomArray = (elements) => {
  const lengthArray = getRandomPositiveInteger(1, elements.length);
  const newArray = [];
  do {
    const newElement = createElement(elements);
    if (!(newArray.includes(newElement))) {
      newArray.push(newElement);
    }
  } while (newArray.length < lengthArray);
  return newArray;
};

const createOfferObject = () => {
  const latitude = getRandomPositiveFloat(LATITUDE_INITIAL_NUMBER, LATITUDE_FINAL_NUMBER);
  const longitude = getRandomPositiveFloat(LONGITUDE_INITIAL_NUMBER, LONGITUDE_FINAL_NUMBER);

  return ({
    author: {
      avatar: createAvatarAdress(OFFER_COUNT),
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

const offers = Array.from({length: OFFER_COUNT}, createOfferObject);
offers.join();
