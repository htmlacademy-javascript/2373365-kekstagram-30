const effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectStyles = {
  [effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [effects.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

const isNoUiExists = () => Boolean(modalElement.querySelector('.noUi-target'));

let chosenEffect = effects.DEFAULT;

const isDefault = () => chosenEffect === effects.DEFAULT;

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const setImageStyle = () => {
  if (isDefault()) {
    imageElement.style.filter = null;
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectStyles[chosenEffect];
  imageElement.style.filter = `${ style }(${ value }${ unit })`;
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const resetEffect = () => {
  setEffect(effects.DEFAULT);
  sliderElement.noUiSlider.destroy();
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const initEffect = () => {
  if (!isNoUiExists()) {
    createSlider(effectToSliderOptions[chosenEffect]);
    effectsElement.addEventListener('change', onEffectsChange);
  }
};

export { initEffect, resetEffect };
