import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showDataErrorMessage } from './message.js';
import { initFilter } from './filters.js';
import { initEffect } from './effect.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilter(pictures);
    initEffect();
  } catch (error) {
    showDataErrorMessage();
  }
};

bootstrap();
