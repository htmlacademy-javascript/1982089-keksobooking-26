import {resetSlider} from './slider.js';
import {resetMap} from './map.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';


const resetButton = document.querySelector('.ad-form__reset');
const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const roomsField = offerForm.querySelector('#room_number');
const capacityField = offerForm.querySelector('#capacity');
const priceField = offerForm.querySelector('#price');
const typeField = offerForm.querySelector('#type');
const timeinField = offerForm.querySelector('#timein');
const timeoutField = offerForm.querySelector('#timeout');
const ApartmentCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};
const [MIN_SYMBOLS_TITLE, MAX_SYMBOLS_TITLE] = [30, 100];
const MAX_PRICE = 100000;
const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const submitButton = document.querySelector('.ad-form__submit');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

function validateOfferTitle(value) {
  return (value.length >= MIN_SYMBOLS_TITLE && value.length <= MAX_SYMBOLS_TITLE);
}

function validateOfferPrice(value) {
  return (value.length && Number(value) <= MAX_PRICE && Number(value) >= MinPrice[typeField.value]);
}

function showMinPriceError() {
  return (`Цена от ${MinPrice[typeField.value]} до ${MAX_PRICE}`);
}

function validateOfferCapacity() {
  return ApartmentCapacity[roomsField.value].includes(capacityField.value);
}

function showErrorCapacityMessage() {
  switch(roomsField.value) {
    case '1':
    case '2':
    case '3':
      return `Возможное кол-во гостей: ${ApartmentCapacity[roomsField.value].join(', ')}.`;
    case '100':
      return 'Недоступно для гостей.';
  }
}

pristine.addValidator(
  offerForm.querySelector('#title'),
  validateOfferTitle,
  'Заголовок должен содержать от 30 до 100 символов'
);

pristine.addValidator(
  priceField,
  validateOfferPrice,
  showMinPriceError
);

pristine.addValidator(
  roomsField,
  validateOfferCapacity,
  showErrorCapacityMessage
);

capacityField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

typeField.addEventListener('change', () => {
  priceField.placeholder = MinPrice[typeField.value];
  pristine.validate(priceField);
});

timeoutField.addEventListener('change', () => {
  timeinField.value = timeoutField.value;
});

timeinField.addEventListener('change', () => {
  timeoutField.value = timeinField.value;
});

const resetForm = (cb) => {
  resetButton.addEventListener('click', () => {
    offerForm.reset();
    filterForm.reset();
    resetSlider();
    resetMap();
    cb();
  });
};

const closeMessage = (element) => {
  const outsideClickListener = (evt) => {
    const textElement = element.querySelector('p');
    if (!textElement.contains(evt.target)) {
      document.body.removeChild(element);
      document.removeEventListener('click', outsideClickListener);
    }
  };

  const escapeButtonListener = () => {
    document.body.removeChild(element);
    document.removeEventListener('keydown', escapeButtonListener);
  };

  const escapeKeydownListener = (evt) => {
    if (isEscapeKey(evt)) {
      document.body.removeChild(element);
      document.removeEventListener('keydown', escapeKeydownListener);
    }
  };
  document.addEventListener('click', outsideClickListener);
  document.addEventListener('keydown', escapeKeydownListener);
  const errorButton = element.querySelector('.error__button');
  if (errorButton) {
    errorButton.addEventListener('click', escapeButtonListener);
  }
};

const showSuccessMessage = () => {
  const messageContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.body.append(messageContainer);
  closeMessage(messageContainer);
};

const showErrorMessage = () => {
  const messageContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.body.append(messageContainer);
  closeMessage(messageContainer);
};

const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Опубликовать';
};

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        resetForm();
        showSuccessMessage();
        unblockSubmitButton();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

export {MinPrice, MAX_PRICE, typeField, priceField, resetForm};
