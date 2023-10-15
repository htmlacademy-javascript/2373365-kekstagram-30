const lengthStringCheck = (charset, length) => {
  const charsetSpaceless = charset.replaceAll(' ', '');
  return charsetSpaceless.length <= length;
};

const isItPalindrome = (charset) => {
  const newCharset = charset.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = (newCharset.length - 1); i >= 0; i--) {
    const symbol = newCharset[i];
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
    const digit = parseInt(charset[i], 10);
    if (!Number.isNaN(digit)) {
      newString += digit;
    }
  }
  return newString === '' ? NaN : newString;
};

lengthStringCheck('54hrth', 10);
isItPalindrome('tenet');
getNumder('454tgfdfhy6');
