import './slider.js';
import './form.js';
import {createOffersMarker} from './map.js';
import {getData} from './api.js';
import {renderOffers} from './render-data.js';

const VISIBLE_OFFER_COUNT = 10;
const ALERT_SHOW_TIME = 6000;

getData((offers) => {
  renderOffers(offers.slice(0, VISIBLE_OFFER_COUNT));
  createOffersMarker(offers.slice(0, VISIBLE_OFFER_COUNT));
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

