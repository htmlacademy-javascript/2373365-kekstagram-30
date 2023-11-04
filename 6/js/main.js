import {createPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';

const pictures = createPhotos();
renderThumbnails(pictures);
