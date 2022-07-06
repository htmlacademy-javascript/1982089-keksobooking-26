const form = document.querySelector('.ad-form');
const fieldsetFormList = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const filterFormList = mapFilters.querySelectorAll('select');
const formFields = document.querySelectorAll('.map__filter');

const switchToDisableForm = () => {
  form.classList.add('ad-form--disabled');
  fieldsetFormList.forEach((element) => element.setAttribute('disabled', 'disabled'));

  mapFilters.classList.add('map__filters--disabled');
  filterFormList.forEach((element) => element.setAttribute('disabled', 'disabled'));
  mapFilters.querySelector('fieldset').setAttribute('disabled', 'disabled');
};

switchToDisableForm();

const switchToEnabledForm = () => {
  form.classList.remove('ad-form--disabled');
  fieldsetFormList.forEach((element) => element.removeAttribute('disabled'));

  mapFilters.classList.remove('map__filters--disabled');
  filterFormList.forEach((element) => element.removeAttribute('disabled'));
  mapFilters.querySelector('fieldset').removeAttribute('disabled');
};

const setFilterClick = (cb) => {
  const benefitsCheckboxes = document.querySelector('#housing-features').querySelectorAll('input[name="features"]');
  formFields.forEach((item) => {
    item.addEventListener('change', cb);
  });
  benefitsCheckboxes.forEach((item) => {
    item.addEventListener('change', cb);
  });
};

export {switchToEnabledForm, setFilterClick, switchToDisableForm};
