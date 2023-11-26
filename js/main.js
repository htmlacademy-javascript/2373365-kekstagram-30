import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showDataErrorMessage } from './message.js';
import { initFilter } from './filters.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilter(data);
  } catch (error) {
    showDataErrorMessage();
  }
};

bootstrap();
