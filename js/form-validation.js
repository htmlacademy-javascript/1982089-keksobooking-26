const offerForm = document.querySelector('.ad-form');
const roomsField = offerForm.querySelector('#room_number');
const capacityField = offerForm.querySelector('#capacity');
const ApartmentCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
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
  return (value.length >= 30 && value.length <= 100);
}

function validateOfferPrice(value) {
  return ((value.length) && (Number(value) >= 0 && Number(value) <= 100000));
}

pristine.addValidator(
  offerForm.querySelector('#title'),
  validateOfferTitle,
  'Заголовок должен содержать от 30 до 100 символов'
);

pristine.addValidator(
  offerForm.querySelector('#price'),
  validateOfferPrice,
  'Цена должна быть менее 100 000'
);

function validateOfferCapacity() {
  return ApartmentCapacity[roomsField.value].includes(capacityField.value);
}

function getErrorCapacityMessage() {
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
  roomsField,
  validateOfferCapacity,
  getErrorCapacityMessage
);

capacityField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
