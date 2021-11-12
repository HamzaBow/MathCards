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

export function validateString(str: string): void {
  if (str === null) {
    throw new Error(`${Object.keys({ str })} cannot be null`)
  }
  if (str === undefined) {
    throw new Error(`${Object.keys({ str })} cannot be undefined`)
  }
  if (str === "") {
    throw new Error(`${Object.keys({ str })} cannot be an empty string`)
  }
}

export function validateArray(arr: string[]): void {
  if (arr === null) {
    throw new Error(`${Object.keys({ arr })} cannot be null`)
  }
  if (arr === undefined) {
    throw new Error(`${Object.keys({ arr })} cannot be undefined`)
  }
  if (arr.length === 0) {
    throw new Error(`${Object.keys({ arr })} cannot be an empty array`)
  }
  arr.forEach((str) => {validateString(str)})
}