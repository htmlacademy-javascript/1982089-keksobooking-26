import './form-validation.js';

const switchToDisableForm = () => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  const fieldsetFormList = document.querySelector('.ad-form').querySelectorAll('fieldset');
  fieldsetFormList.forEach((element) => element.setAttribute('disabled', 'disabled'));

  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  const filterFormList = document.querySelector('.map__filters').querySelectorAll('select');
  filterFormList.forEach((element) => element.setAttribute('disabled', 'disabled'));
  document.querySelector('.map__filters').querySelector('fieldset').setAttribute('disabled', 'disabled');
};

const switchToEnabledForm = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  const fieldsetFormList = document.querySelector('.ad-form').querySelectorAll('fieldset');
  fieldsetFormList.forEach((element) => element.removeAttribute('disabled'));

  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  const filterFormList = document.querySelector('.map__filters').querySelectorAll('select');
  filterFormList.forEach((element) => element.removeAttribute('disabled'));
  document.querySelector('.map__filters').querySelector('fieldset').removeAttribute('disabled');
};

switchToDisableForm();

const setFilterClick = (cb) => {
  const formFields = document.querySelectorAll('.map__filter');
  const benefitsCheckboxes = document.querySelector('#housing-features').querySelectorAll('input[name="features"]');
  formFields.forEach((item) => {
    item.addEventListener('change', cb);
  });
  benefitsCheckboxes.forEach((item) => {
    item.addEventListener('change', cb);
  });
};

export {switchToEnabledForm, setFilterClick};
