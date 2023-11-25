const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ServerRoute = {
  [HttpMethod.GET]:  '/data',
  [HttpMethod.POST]: '/',
};

const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные',
  [HttpMethod.POST]: 'Ошибка загрузки файла',
};

const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (! response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const loadPictures = async () => request(
  SERVER_URL + ServerRoute[HttpMethod.GET]
);

const sendPictures = async (pictureData) => request(
  SERVER_URL + ServerRoute[HttpMethod.POST],
  HttpMethod.POST,
  pictureData,
);

export { loadPictures, sendPictures };
