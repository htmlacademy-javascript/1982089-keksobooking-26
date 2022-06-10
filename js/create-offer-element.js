import {
  createOffers,
  OFFER_COUNT,
  apartments} from './data.js';

const offersList = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const availableOffers = createOffers(OFFER_COUNT);
const offerListFragment = document.createDocumentFragment();

availableOffers.forEach((availableOffer) => {
  const offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = availableOffer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = availableOffer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${availableOffer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = apartments[availableOffer.offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${availableOffer.offer.rooms} комнаты для ${availableOffer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${availableOffer.offer.checkin}, выезд до ${availableOffer.offer.checkout}`;
  offerElement.querySelector('.popup__description').textContent = availableOffer.offer.description;
  offerElement.querySelector('.popup__avatar').src = availableOffer.author.avatar;

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

  const benefits = offerElement.querySelector('.popup__features').querySelectorAll('.popup__feature');
  const modifiers = availableOffer.offer.features.map((benefit) => `popup__feature--${benefit}`);
  benefits.forEach((benefitItem) => {
    if (!modifiers.includes(benefitItem.classList[1])) {
      benefitItem.remove();
    }
  });

  offerListFragment.append(offerElement);
});

offersList.append(offerListFragment);
