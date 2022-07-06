const DEFAULT_PRICE_VALUE = ' ₽/ночь';
const DEFUALT_ROOMS_VALUE = ' комнаты для  гостей';
const DEFAULT_TIMETABLE_VALUE = 'Заезд после , выезд до ';

const checkElementTextContent = (offerElement, offerClasses) => {
  for (const value of offerClasses) {
    const contentElement = offerElement.querySelector(`.popup__${value}`);
    if ((!contentElement.textContent) ||
    (contentElement.textContent === DEFAULT_PRICE_VALUE) ||
    (contentElement.textContent === DEFUALT_ROOMS_VALUE) ||
    (contentElement.textContent === DEFAULT_TIMETABLE_VALUE)) {
      contentElement.classList.add('visually-hidden');
    }
  }
};

const hideTextContent = (firstElement, secondElement) => {
  if (firstElement === '') {
    secondElement = '';
  } else if (secondElement === '') {
    firstElement = '';
  }

  return [firstElement, secondElement];
};

const checkContentExistence = (offerElement, offerKeys) => {
  for (const value of offerKeys) {
    if ((offerElement[value] === null) || (offerElement[value] === undefined)) {
      offerElement[value] = '';
    }
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  checkElementTextContent,
  hideTextContent,
  checkContentExistence,
  isEscapeKey,
  debounce,
};
