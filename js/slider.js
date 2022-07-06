import {
  MinPrice,
  MAX_PRICE,
  typeField,
  priceField
} from './form-validation.js';

const slider = document.querySelector('.ad-form__slider');

noUiSlider.create(slider, {
  range: {
    min: MinPrice[typeField.value],
    max: MAX_PRICE,
  },
  start: MinPrice[typeField.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => parseFloat(value)
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

slider.noUiSlider.on('slide', () => {
  priceField.value = slider.noUiSlider.get();
});

priceField.addEventListener('change', () => {
  slider.noUiSlider.set(priceField.value);
});

const resetSlider = () => {
  slider.noUiSlider.set(MinPrice[typeField.value]);
};

export {resetSlider};
