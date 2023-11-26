import { getRandomIndex } from './util.js';

const filtersEl = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');

const MAX_RANDOM_FILTER = 10;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};
const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const min = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < min) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data]
    .sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const repaint = (filter, data) => {
  const filteredData
};

const de
const initFilter = (data) => {
  filtersEl.classList.remove('img-filters--inactive');
  const filtered = filterHandlers[FilterEnum.DISCUSSED](data);
};

export { initFilter };
