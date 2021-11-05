type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface FetchParams {
  url: string;
  initParams?: RequestInit;
}

export function init(method: Method, data?: any): RequestInit {
  interface InitParams {
    method: Method;
    headers: { "Content-type": "application/json"};
    body?: string;
  }
  const initParams: InitParams = {
    method,
    headers: {
      "Content-type": "application/json",
    },
  };
  if (data !== undefined) {
    initParams.body = JSON.stringify(data);
  }
  return initParams
}

export const fetchGetData = async (fetchParams: FetchParams) => {
  const { url, initParams } = fetchParams;
  const res = await fetch(url, initParams);
  const data = await res.json();
  return data;
}
