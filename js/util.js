const onKeyDownEscape = (evt) => evt.key === 'Escape';

const getRandomIndex = (min, max) => Math.floor(Math.random() + (max - min));

export { onKeyDownEscape, getRandomIndex };
