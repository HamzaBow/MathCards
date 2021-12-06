import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: string | Function, storage: Storage): string {
  const savedValue = JSON.parse(storage.getItem(key) as string);
  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export function useLocalStorage(key: string, initialValue: string | Function) {
  return useStorage(key, initialValue, window.localStorage)
}

export function useSessionStorage(key: string, initialValue: string | Function) {
  return useStorage(key, initialValue, window.sessionStorage)
}

function useStorage(key: string, initialValue: string | Function, storage: Storage) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue, storage);
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
