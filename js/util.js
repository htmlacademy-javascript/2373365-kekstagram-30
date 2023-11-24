const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

function showErrorMessage() {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);
}

export { showErrorMessage };
