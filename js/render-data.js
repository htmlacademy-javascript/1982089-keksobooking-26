import {
  checkElementTextContent,
  hideTextContent,
  checkContentExistence,
} from './util.js';

import {createOffersMarker} from './map.js';

const VISIBLE_OFFER_COUNT = 10;
const [INITAL_FILTER_PRICE, FINAL_FILTER_PRICE] = [10000, 50000];
const DEFAULT_FILTER_VALUE = 'any';
const OFFER_TEXT_CLASSES = ['title', 'text--address', 'text--price', 'type', 'text--capacity', 'text--time', 'description'];
const OFFER_COMBINED_TEXT_KEYS = ['price', 'rooms', 'guests', 'checkin', 'checkout'];
const Apartment = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const offersList = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const offerListFragment = document.createDocumentFragment();

const filterTypeApartment = (element) => {
  const typeFilterValue = document.querySelector('#housing-type').querySelector('option:checked').value;
  return (typeFilterValue === DEFAULT_FILTER_VALUE) ? true : (element.offer.type === typeFilterValue);
};

const filterPricaApartment = (element) => {
  const priceFilterValue = document.querySelector('#housing-price').querySelector('option:checked').value;
  switch (priceFilterValue) {
    case DEFAULT_FILTER_VALUE:
      return true;
    case 'middle':
      return ((element.offer.price >= INITAL_FILTER_PRICE) && (element.offer.price <= FINAL_FILTER_PRICE));
    case 'low':
      return (element.offer.price < INITAL_FILTER_PRICE);
    case 'high':
      return (element.offer.price > FINAL_FILTER_PRICE);
  }
  return (priceFilterValue === DEFAULT_FILTER_VALUE) ? true : (element.offer.rooms === Number(priceFilterValue));
};

const filterRoomsNumber = (element) => {
  const roomsFilterValue = document.querySelector('#housing-rooms').querySelector('option:checked').value;
  return (roomsFilterValue === DEFAULT_FILTER_VALUE) ? true : (element.offer.rooms === Number(roomsFilterValue));
};

const filterGuestsNumber = (element) => {
  const guestsFilterValue = document.querySelector('#housing-guests').querySelector('option:checked').value;
  return (guestsFilterValue === DEFAULT_FILTER_VALUE) ? true : (element.offer.guests === Number(guestsFilterValue));
};

const filterBenefits = (element) => {
  const benefitsCheckboxes = document.querySelector('#housing-features').querySelectorAll('input:checked');
  if (benefitsCheckboxes.length === 0) {
    return true;
  }
  const selectedBenefits = Array.from(benefitsCheckboxes).map((el) => el.value);
  return (element.offer.features) ? selectedBenefits.every((el) => (element.offer.features.includes(el))) : false;
};

const renderOffers = (availableOffers) => {
  const relevantOffers = availableOffers
    .slice()
    .filter(filterTypeApartment)
    .filter(filterPricaApartment)
    .filter(filterRoomsNumber)
    .filter(filterGuestsNumber)
    .filter(filterBenefits)
    .slice(0, VISIBLE_OFFER_COUNT);
  relevantOffers.forEach((availableOffer) => {
    const offerElement = offerTemplate.cloneNode(true);

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
    } else {
      offerElement.querySelector('.popup__photos').classList.add('visually-hidden');
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
  offersList.querySelectorAll('.popup').forEach((element) => element.remove());
  offersList.append(offerListFragment);
  createOffersMarker(relevantOffers);
};

export {renderOffers};
