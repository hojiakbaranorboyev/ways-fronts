import axios from "axios";
import { stringify } from "../utils/qs";
import { parseQueryString } from "../utils/telegram";

const request = axios.create({
  baseURL: "https://ways-api.jprq.site",
  withCredentials: true,
});
const abortTokens: IObj = {};
request.interceptors.request.use(
  (config) => {
    const initData = (window as any)?.Telegram.WebApp.initData;

    if (initData) {
    }
    config.headers.Authorization = initData
      ? btoa(parseQueryString(initData))
      : "";
    return config;
  },
  (error) => Promise.reject(error)
);

type globalGetReturnType<R> = Promise<IResponseStandard<R> & { url: string }>;
function getData<R>(payload: IGetRequest): globalGetReturnType<R> {
  const { url, message = false, query = null } = payload;
  if (url in abortTokens) abortTokens[url]?.cancel();

  abortTokens[url] = axios.CancelToken.source();
  const urls = query ? `?${stringify(query)}` : "";
  return new Promise((resolve, reject) => {
    request
      .get<IResponseStandard<R>>(url + urls, {
        cancelToken: abortTokens[url].token,
      })
      .then((res) => {
        // if (message) responseMessage(res as any);
        resolve({ ...res.data, url });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getData };
