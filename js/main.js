import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();
