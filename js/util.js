const onKeyDownEscape = (evt) => evt.key === 'Escape';

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { onKeyDownEscape, getRandomIndex, debounce };
