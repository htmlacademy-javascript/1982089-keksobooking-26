const offerForm = document.querySelector('.ad-form');
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

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
