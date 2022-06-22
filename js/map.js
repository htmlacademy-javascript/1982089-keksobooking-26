import {switchToEnabledForm} from './form.js';
import {availableOffers} from './render-data.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const COORDINATE_PRESICION = 6;
const MAP_ZOOM = 13;
const [INITIAL_LAT, INITIAL_LNG] = [35.681729, 139.753927];

const map = L.map('map-canvas')
  .on('load', () => {
    switchToEnabledForm();
  })
  .setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mapIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  },
  {
    draggable: true,
    icon: L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    }),
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const actualCoordinate = evt.target.getLatLng();
  addressField.value = `${actualCoordinate.lat.toFixed(COORDINATE_PRESICION)}, ${actualCoordinate.lng.toFixed(COORDINATE_PRESICION)}`;
});

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  });

  map.setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, MAP_ZOOM);
});

const offerList = document.querySelectorAll('.popup');

const createMarkers = (lat, lng, index) => {
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      mapIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(offerList[index]);
};

availableOffers.slice(0, 10).forEach((element, index) => {
  createMarkers(element.location.lat, element.location.lng, index);
});

const markerGroup = L.layerGroup().addTo(map);
markerGroup.clearLayers();
