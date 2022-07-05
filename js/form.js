const fieldsetFormList = document.querySelector('.ad-form').querySelectorAll('fieldset');
const filterFormList = document.querySelector('.map__filters').querySelectorAll('select');
const formFields = document.querySelectorAll('.map__filter');

const switchToDisableForm = () => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  fieldsetFormList.forEach((element) => element.setAttribute('disabled', 'disabled'));

  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  filterFormList.forEach((element) => element.setAttribute('disabled', 'disabled'));
  document.querySelector('.map__filters').querySelector('fieldset').setAttribute('disabled', 'disabled');
};

const switchToEnabledForm = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  fieldsetFormList.forEach((element) => element.removeAttribute('disabled'));

  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  filterFormList.forEach((element) => element.removeAttribute('disabled'));
  document.querySelector('.map__filters').querySelector('fieldset').removeAttribute('disabled');
};

switchToDisableForm();

const setFilterClick = (cb) => {
  const benefitsCheckboxes = document.querySelector('#housing-features').querySelectorAll('input[name="features"]');
  formFields.forEach((item) => {
    item.addEventListener('change', cb);
  });
  benefitsCheckboxes.forEach((item) => {
    item.addEventListener('change', cb);
  });
};

export {switchToEnabledForm, setFilterClick};
