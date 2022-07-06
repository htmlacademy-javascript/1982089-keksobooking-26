import {setFilterClick} from './form.js';
import './slider.js';
import {getData} from './api.js';
import {renderOffers} from './render-data.js';
import {updateForm, sendFormDataHandler, resetButtonHandler} from './form-validation.js';
import {debounce} from './util.js';

const ALERT_SHOW_TIME = 6000;
const RERENDER_DELAY = 500;

getData((offers) => {
  renderOffers(offers);
  sendFormDataHandler(() => renderOffers(offers));
  resetButtonHandler(() => renderOffers(offers));
  setFilterClick(debounce(
    () => renderOffers(offers),
    RERENDER_DELAY,
  ));
  updateForm(debounce(
    () => renderOffers(offers),
    RERENDER_DELAY,
  ));
}, (message) => {
  const alertElement = document.createElement('div');
  alertElement.style.zIndex = '10';
  alertElement.style.position = 'fixed';
  alertElement.style.right = '0';
  alertElement.style.bottom = '0';
  alertElement.style.padding = '12px 12px';
  alertElement.style.fontSize = '16px';
  alertElement.style.color = 'white';
  alertElement.style.textAlign = 'center';
  alertElement.style.backgroundColor = '#FA4949';
  alertElement.style.borderRadius = '5px';
  alertElement.textContent = message;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
});

