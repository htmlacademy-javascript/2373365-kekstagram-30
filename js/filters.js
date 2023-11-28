import { renderThumbnails } from './thumbnail.js';
import { debounce, getRandomIndex } from './util.js';

const filtersEl = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');
const container = document.querySelector('.pictures');

const MAX_RANDOM_FILTER = 10;
const REPAINT_DELAY = 500;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    while (randomIndexList.length < MAX_RANDOM_FILTER) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => (item2.comments.length - item1.comments.length)),
};

let activeButton = defaultBtn;

const changeClasses = (button) => {
  activeButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  activeButton = button;
};

const clearThumbnails = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
};

const reRenderThumbnails = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  clearThumbnails();
  renderThumbnails(filteredData, container);
};

const debouncedReRender = debounce(reRenderThumbnails, REPAINT_DELAY);

const initFilter = (data) => {
  filtersEl.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button') || evt.target === activeButton) {
      return;
    }
    changeClasses(evt.target);

    if (evt.target === defaultBtn) {
      debouncedReRender(FilterEnum.DEFAULT, data);
    }
    if (evt.target === randomBtn) {
      debouncedReRender(FilterEnum.RANDOM, data);
    }
    if (evt.target === discussedBtn) {
      debouncedReRender(FilterEnum.DISCUSSED, data);
    }
  });
};

export { initFilter };
