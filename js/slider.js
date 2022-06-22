import {MinPrice, MAX_PRICE, typeField, priceField} from './form-validation.js';

const slider = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');

noUiSlider.create(slider, {
  range: {
    min: MinPrice[typeField.value],
    max: MAX_PRICE,
  },
  start: MinPrice[typeField.value],
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed();
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

typeField.addEventListener('change', () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: MinPrice[typeField.value],
      max: MAX_PRICE,
    }
  });
  slider.noUiSlider.set(MinPrice[typeField.value]);
  priceField.value = '';
});

slider.noUiSlider.on('update', () => {
  priceField.value = slider.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  slider.noUiSlider.set(priceField.value);
});

resetButton.addEventListener('click', () => {
  slider.noUiSlider.set(MinPrice[typeField.value]);
});
