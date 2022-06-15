import {
  createOffers,
  OFFER_COUNT,
  Apartment,
} from './data.js';

const offersList = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const availableOffers = createOffers(OFFER_COUNT);
const offerListFragment = document.createDocumentFragment();

const checkElementTextContent = (offerElement, offerClasses) => {
  for (let i = 0; i < offerClasses.length; i++) {
    const contentElement = offerElement.querySelector(`.popup__${offerClasses[i]}`);
    if ((!contentElement.textContent) ||
    (contentElement.textContent === ' ₽/ночь') ||
    (contentElement.textContent === ' комнаты для  гостей') ||
    (contentElement.textContent === 'Заезд после , выезд до ')) {
      contentElement.classList.add('visually-hidden');
    }
  }
};

const hideTextContent = (firstString, secondString) => {
  if (firstString === '') {
    secondString = '';
  } else if (secondString === '') {
    firstString = '';
  }

  return [firstString, secondString];
};

const checkContentExistence = (offerElement, offerKeys) => {
  for (let i = 0; i < offerKeys.length; i++) {
    if ((offerElement[offerKeys[i]] === null) || (offerElement[offerKeys[i]] === undefined)) {
      offerElement[offerKeys[i]] = '';
    }
  }
};

availableOffers.forEach((availableOffer) => {
  const offerElement = offerTemplate.cloneNode(true);
  const OFFER_TEXT_CLASSES = ['title', 'text--address', 'text--price', 'type', 'text--capacity', 'text--time', 'description'];
  const OFFER_COMBINED_TEXT_KEYS = ['price', 'rooms', 'guests', 'checkin', 'checkout'];

  checkContentExistence(availableOffer.offer, OFFER_COMBINED_TEXT_KEYS);
  const [rooms, guests] = hideTextContent(availableOffer.offer.rooms, availableOffer.offer.guests);
  const [checkin, checkout] = hideTextContent(availableOffer.offer.checkin, availableOffer.offer.checkout);

  offerElement.querySelector('.popup__title').textContent = availableOffer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = availableOffer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${availableOffer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = Apartment[availableOffer.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  offerElement.querySelector('.popup__description').textContent = availableOffer.offer.description;

  checkElementTextContent(offerElement, OFFER_TEXT_CLASSES);

  offerElement.querySelector('.popup__avatar').src = availableOffer.author.avatar || '#';

  if (availableOffer.offer.photos) {
    offerElement.querySelector('.popup__photo').src = availableOffer.offer.photos[0];
    if (availableOffer.offer.photos.length > 1) {
      const photoList = offerElement.querySelector('.popup__photos');
      const photosFragment = document.createDocumentFragment();

      for (let i = 1; i < availableOffer.offer.photos.length; i++) {
        const photoElement = offerElement.querySelector('.popup__photo').cloneNode(true);
        photoElement.src = availableOffer.offer.photos[i];
        photosFragment.append(photoElement);
      }

      photoList.append(photosFragment);
    }
  }

  const benefits = offerElement.querySelector('.popup__features').querySelectorAll('.popup__feature');
  if (availableOffer.offer.features) {
    const modifiers = availableOffer.offer.features.map((benefit) => `popup__feature--${benefit}`);
    benefits.forEach((benefitItem) => {
      if (!modifiers.includes(benefitItem.classList[1])) {
        benefitItem.remove();
      }
    });
  } else {
    offerElement.querySelector('.popup__features').classList.add('visually-hidden');
  }

  offerListFragment.append(offerElement);
});

offersList.append(offerListFragment);
