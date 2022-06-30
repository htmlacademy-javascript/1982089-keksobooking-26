import './slider.js';
import './avatar.js';
import {setFilterClick} from './form.js';
import {getData} from './api.js';
import {renderOffers} from './render-data.js';
import {updateForm} from './form-validation.js';
import {debounce} from './util.js';

const ALERT_SHOW_TIME = 6000;
const RERENDER_DELAY = 500;

getData((offers) => {
  renderOffers(offers);
  setFilterClick(debounce(
    () => renderOffers(offers),
    RERENDER_DELAY,
  ));
  updateForm(debounce(
    () => renderOffers(offers),
    RERENDER_DELAY,
  ));
}, (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '10';
  alertContainer.style.position = 'fixed';
  alertContainer.style.right = '0';
  alertContainer.style.bottom = '0';
  alertContainer.style.padding = '12px 12px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#FA4949';
  alertContainer.style.borderRadius = '5px';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
});

