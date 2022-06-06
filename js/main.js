const OFFER_COUNT = 10;
const [INITIAL_PRICE, FINAL_PRICE] = [1500, 10000];
const [MIN_GUESTS, MAX_GUESTS] = [1, 12];
const [MIN_ROOMS, MAX_ROOMS] = [1, 9];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_TABLE = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const [LATITUDE_INITIAL_NUMBER, LATITUDE_FINAL_NUMBER] = [35.65000, 35.70000];
const [LONGITUDE_INITIAL_NUMBER, LONGITUDE_FINAL_NUMBER] = [139.70000, 139.80000];

function checkPositiveArray(initialNumber, finalNumber) {
  return (initialNumber < 0 || finalNumber < 0) ? 0 : 1;
}

function swapValues(initialNumber, finalNumber) {
  if (finalNumber < initialNumber) {
    finalNumber = [initialNumber, initialNumber = finalNumber][0];
  }

  return [initialNumber, finalNumber];
}

function getRandomPositiveInteger (initialNumber, finalNumber) {
  if (checkPositiveArray(initialNumber, finalNumber) === 0) {
    return;
  }

  [initialNumber, finalNumber] = swapValues(initialNumber, finalNumber);

  initialNumber = Math.ceil(initialNumber);
  finalNumber = Math.floor(finalNumber);

  return Math.floor(Math.random() * (finalNumber - initialNumber + 1)) + initialNumber;
}

function getRandomPositiveFloat (initialNumber, finalNumber, presicion = 5) {
  if (checkPositiveArray(initialNumber, finalNumber) === 0) {
    return;
  }

  [initialNumber, finalNumber] = swapValues(initialNumber, finalNumber);

  return (Math.random() * (finalNumber - initialNumber) + initialNumber).toFixed(presicion);
}

function createAvatarAdress (length) {
  const randomNumber = getRandomPositiveInteger(1, length);

  return(
    (randomNumber < length) ?
      `img/avatars/user0${randomNumber}.png` :
      `img/avatars/user${randomNumber}.png`
  );
}

function createElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function createRandomArray (elements) {
  const lengthArray = getRandomPositiveInteger(1, elements.length);
  const newArray = [];
  do {
    const newElement = createElement(elements);
    if (!(newArray.includes(newElement))) {
      newArray.push(newElement);
    }
  } while (newArray.length < lengthArray);
  return newArray;
}

function createOfferObject() {
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
      type: createElement (TYPE),
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
}

const offers = Array.from({length: OFFER_COUNT}, createOfferObject);
console.log(offers);

