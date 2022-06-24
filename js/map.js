import {switchToEnabledForm} from './form.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const COORDINATE_PRESICION = 5;
const MAP_ZOOM = 13;
const [INITIAL_LAT, INITIAL_LNG] = [35.68172, 139.75392];

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

const resetMap = () => {
  mainMarker.setLatLng({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  });

  map.setView({
    lat: INITIAL_LAT,
    lng: INITIAL_LNG,
  }, MAP_ZOOM);
};

resetButton.addEventListener('click', resetMap);

const createMarkers = (lat, lng, index, popup) => {
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
    .bindPopup(popup);
};

const createOffersMarker = (availableOffers) => {
  const offerList = document.querySelectorAll('.popup');
  availableOffers.forEach((element, index) => {
    createMarkers(element.location.lat, element.location.lng, index, offerList[index]);
  });
};

const markerGroup = L.layerGroup().addTo(map);
markerGroup.clearLayers();

export {createOffersMarker, resetMap};
