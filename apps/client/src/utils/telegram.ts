// import CryptoJS from 'crypto-js';

// /**
//  * Parses the initData query string into an object.
//  * @param {string} queryString - The initData query string.
//  * @returns {Record<string, string>} The parsed query parameters.
//  */
export const parseQueryString = (queryString: string): string => {
  const initData = new URLSearchParams(queryString);
  const hash = initData.get("hash");
  const dataToCheck: string[] = [];

  initData.sort();
  initData.forEach(
    (val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`)
  );
  return (
    dataToCheck.join("\n") + "_syaw_" + hash + "_syaw_" + initData.get("user")
  );
};

// export const verifyTelegramWebAppData = (telegramInitData: string, botToken: string): boolean => {
//   const initData = new URLSearchParams(telegramInitData);
//   const hash = initData.get('hash');
//   const dataToCheck: string[] = [];

//   initData.sort();
//   initData.forEach((val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`));

//   const secret = CryptoJS.HmacSHA256(botToken, 'WebAppData');
//   const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(CryptoJS.enc.Hex);

//   return _hash === hash;
// };
