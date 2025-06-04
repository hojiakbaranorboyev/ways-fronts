import { useEffect, useState } from "react";
import { getData } from "../services/request";
import { stringify } from "../utils/qs";

interface IDataFetch {
  url: string | null;
  query?: IObj;
  source?: "go" | "php";
  retryCount?: number;
}

export function useDataFetch<IData extends any>({
  url = "",
  query = {},
  retryCount = 1,
}: IDataFetch) {
  const [data, setData] = useState<IData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [lastUrl, setLastUrl] = useState<string | null>(null);
  useEffect(() => {
    if (url) fetcher(url, query);
  }, [url]);
  function fetcher(
    url: string,
    query?: IObj,
    count: number = 1,
    callback?: (res: any) => any | void
  ) {
    if (count > retryCount) return;
    setLoading(true);
    const queryStr = stringify(query || {});
    setLastUrl(`${url}${queryStr ? `?${queryStr}` : ""}`);
    getData<IData>({
      url: `${url}${queryStr ? `?${queryStr}` : ""}`,
    })
      .then((res) => {
        res.data;
        if (callback) {
          const data = callback(res);
          if (data) setData(data);
          else setData(res?.data);
        } else setData(res?.data);
      })
      .catch(() => {
        if (retryCount > 1) fetcher(url, query, count + 1, callback);
        setError(true);
      })
      .finally(() => setLoading(false));
  }

  return {
    data,
    isLoading,
    isError,
    refetch: ({
      anotherUrl,
      query,
      cancelToken,
      callback,
    }: {
      anotherUrl?: string;
      query?: IObj;
      cancelToken?: any;
      callback?: (res: any) => any;
    }) =>
      anotherUrl
        ? fetcher(anotherUrl, query, cancelToken, callback)
        : url
        ? fetcher(url, query, cancelToken, callback)
        : lastUrl
        ? fetcher(lastUrl, query, cancelToken, callback)
        : () => {},
    setData,
  };
}
