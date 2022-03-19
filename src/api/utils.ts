type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchParams {
  url: string;
  initParams?: RequestInit;
}

export function init(method: Method, data?: any): RequestInit {
  interface InitParams {
    method: Method;
    headers: { "Content-type": "application/json" };
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
  return initParams;
}

export const fetchGetData = async (fetchParams: FetchParams) => {
  const { url, initParams } = fetchParams;
  const res = await fetch(url, initParams);
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};

//-----------------------------------------------------------------------
//----------------------------   Validation   ---------------------------
//-----------------------------------------------------------------------

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

//--------------------------------------------------------
class UrlValidationError extends CustomError {}
//--------------------------------------------------------
class QueryStringValidationError extends UrlValidationError {}
class QueryArrayValidationError extends UrlValidationError {}
//--------------------------------------------------------
class NullStringError extends QueryStringValidationError {}
class UndefinedStringError extends QueryStringValidationError {}
class EmptyStringError extends QueryStringValidationError {}
//--------------------------------------------------------

export function validateString(str: string, varName?: string): void {
  if (varName === undefined) {
    varName = "string";
  }
  if (str === null) {
    throw new NullStringError(`${varName} cannot be null`);
  }
  if (str === undefined) {
    throw new UndefinedStringError(`${varName} cannot be undefined`);
  }
  if (str === "") {
    throw new EmptyStringError(`${varName} cannot be an empty string`);
  }
}

export function validateArray(arr: string[], varName?: string): void {
  if (varName === undefined) {
    varName = "array";
  }
  if (arr === null) {
    throw new QueryArrayValidationError(`${varName} array cannot be null`);
  }
  if (arr === undefined) {
    throw new QueryArrayValidationError(`${varName} array cannot be undefined`);
  }
  if (arr.length === 0) {
    throw new QueryArrayValidationError(
      `${varName} array cannot be an empty array`
    );
  }
  try {
    arr.forEach((str) => {
      validateString(str);
    });
  } catch (error) {
    if (error instanceof NullStringError) {
      throw new QueryArrayValidationError(
        `${varName} array cannot contain a null element`
      );
    } else if (error instanceof UndefinedStringError) {
      throw new QueryArrayValidationError(
        `${varName} array cannot contain an undefined element`
      );
    } else if (error instanceof EmptyStringError) {
      throw new QueryArrayValidationError(
        `${varName} array cannot contain an empty string element`
      );
    } else {
      throw error;
    }
  }
}
