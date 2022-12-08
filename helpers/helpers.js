// get the initial state from local storage
export const setValFromStorage = (fallBackVal, nameInLocalStorage) => {
  if (localStorage.getItem(nameInLocalStorage)) {
    if (!!JSON.parse(localStorage.getItem(nameInLocalStorage))) {
      return JSON.parse(localStorage.getItem(nameInLocalStorage));
    }
    return fallBackVal;
  }
  return fallBackVal;
};

export const setLocalStorageVal = (data, nameInLocalStorage) => {
  if (data !== undefined && data !== null && data !== "") {
    localStorage.setItem(nameInLocalStorage, JSON.stringify(data));
  }
};

export const setCookieValue = (key, value, expireDate, path, domain) => {
  let cookieValue = `${encodeURIComponent(key)}=`;
  if (value) {
    cookieValue += encodeURIComponent(value);
  }
  if (expireDate) {
    cookieValue = `${cookieValue}; expires=${expireDate.toUTCString()}`;
  }
  if (path) {
    cookieValue = `${cookieValue}; path=${path}`;
  }
  if (domain) {
    cookieValue = `${cookieValue}; domain=${domain}`;
  }

  document.cookie = cookieValue;
};

export const getCookieValue = (key) => {
  const equalities = document?.cookie.split("; ");
  for (let i = 0; i < equalities.length; i++) {
    if (!equalities[i]) {
      continue;
    }
    const splitted = equalities[i].split("=");
    if (splitted.length != 2) {
      continue;
    }
    if (decodeURIComponent(splitted[0]) === key) {
      return decodeURIComponent(splitted[1] || "");
    }
  }
  return null;
};

export const getToken = () => {
  return getCookieValue("AUTH") || null;
};

export const deleteCookie = (key, path) => {
  let cookieValue = `${encodeURIComponent(key)}=`;

  cookieValue = `${cookieValue}; expires=${new Date(
    new Date().getTime() - 86400000
  ).toUTCString()}`;

  if (path) {
    cookieValue = `${cookieValue}; path=${path}`;
  }

  document.cookie = cookieValue;
};

export const setToken = (access_token) => {
  const tokenExpireDate = undefined;
  // const tokenExpireDate = model.rememberMe
  // ? new Date(new Date().getTime() + 1000 * result.expireInSeconds)
  setCookieValue(
    "AUTH",
    access_token,
    tokenExpireDate,
    "/",
    process.env.NEXT_PUBLIC_FRONT_URL || "https://powercard-sa.com"
  );
};

// split array into chunks
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

// format numbers
export const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 1000) {
    return num; // if value < 1000, nothing to do
  }
};
