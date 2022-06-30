const checkElementTextContent = (offerElement, offerClasses) => {
  for (let i = 0; i < offerClasses.length; i++) {
    const contentElement = offerElement.querySelector(`.popup__${offerClasses[i]}`);
    if ((!contentElement.textContent) ||
    (contentElement.textContent === ' ₽/ночь') ||
    (contentElement.textContent === ' комнаты для  гостей') ||
    (contentElement.textContent === 'Заезд после , выезд до ')) {
      contentElement.classList.add('visually-hidden');
    }
  }
};

const hideTextContent = (firstString, secondString) => {
  if (firstString === '') {
    secondString = '';
  } else if (secondString === '') {
    firstString = '';
  }

  return [firstString, secondString];
};

const checkContentExistence = (offerElement, offerKeys) => {
  for (let i = 0; i < offerKeys.length; i++) {
    if ((offerElement[offerKeys[i]] === null) || (offerElement[offerKeys[i]] === undefined)) {
      offerElement[offerKeys[i]] = '';
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
