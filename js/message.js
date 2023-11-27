import { onKeyDownEscape } from './util.js';

const REMOVE_MESSAGE_TIMEOUT = 5000;

const successMessageTemplate = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document
  .querySelector('#error')
  .content
  .querySelector('.error');

const dataErrorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showDataErrorMessage = () => {
  const errorElement = dataErrorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  const isMessageElementExixts = () => Boolean(messageElement);
  if (isMessageElementExixts) {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onCloseButtonClick);
    document.body.removeEventListener('click', onBodyClick);
  }
};

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

function onCloseButtonClick() {
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (onKeyDownEscape(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }

  hideMessage();
}

const showSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

export { showErrorMessage, showSuccessMessage, showDataErrorMessage };
