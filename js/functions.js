const lengthStringCheck = (charset, length) => {
  const charsetSpaceless = charset.replaceAll(' ', '');
  return charsetSpaceless.length <= length;
}

const isItPalindrome = (charset) => {
  let newCharset = charset.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = (newCharset.length - 1); i >= 0; i--) {
    let symbol = newCharset[i];
    newString += symbol;
  }
  return newCharset === newString;
};

const getNumder = (charset) => {
  let newString = '';
  if (!isNaN(charset)) {
    charset = charset.toString();
  }
  for (let i = 0; i < charset.length; i++) {
    let digit = parseInt(charset[i], 10);
    if (!Number.isNaN(digit)) {
      newString += digit;
    }
  }
  return newString === '' ? NaN : newString;;
};
