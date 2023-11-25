import { sendPictures } from './api.js';
import {
  init as initEffect,
  destroy as destroyEffect
} from './effect.js';
import { resetScale } from './scale.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const submitButtonDisable = () => {
  if (pristine.validate()) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

const onTextChange = () => {
  submitButtonDisable();
};

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;

  if (isDisabled) {
    submitButton.textContent = SubmitButtonCaption.SUBMITTING;
  } else {
    submitButton.textContent = SubmitButtonCaption.IDLE;
  }
};

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  form.addEventListener('change', onTextChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  form.addEventListener('submit', onFormSubmit);
  initEffect();
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  destroyEffect();
  resetScale();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  form.removeEventListener('change', onTextChange);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormSubmit);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const sendForm = async (formElement) => {
  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    toggleSubmitButton(false);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

function onFormSubmit(evt) {
  evt.preventDefault();
  sendForm(evt.target);
}

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    hideModal();
  }
}

function onCancelButtonClick() {
  hideModal();
}

const onFileInputChange = () => {
  showModal();
};

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

fileField.addEventListener('change', onFileInputChange);

