import { renderGallery } from './gallery.js';
import { debounce, getRandomIndex } from './util.js';

const filtersEl = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');

const MAX_RANDOM_FILTER = 10;
const RERENDER_DELAY = 500;

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

let currentfilter = FilterEnum.DEFAULT;

const clearGallery = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
};

const reRenderGallery = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  renderGallery(filteredData);
};

const repaint = (evt, filter, data) => {
  if (currentfilter !== filter) {
    const debouncedRender = debounce(() => {
      clearGallery();
      reRenderGallery(filter, data);
    }, RERENDER_DELAY);
    debouncedRender(filter, data);
    const currentActiveEl = filterForm.querySelector('.img-filters__button--active');
    currentActiveEl.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    debouncedRender();
    currentfilter = filter;
  }
};

const initFilter = (data) => {
  filtersEl.classList.remove('img-filters--inactive');
  defaultBtn.addEventListener('click', (evt) => {
    repaint(evt, FilterEnum.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (evt) => {
    repaint(evt, FilterEnum.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (evt) => {
    repaint(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
