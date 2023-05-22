import React, { useEffect, useState } from "react";
const log = false;
const getSavedValue = (key: string, initialValue: any) => {
  console.log({ key, initialValue });
  if (typeof window === "undefined") return;
  const storageType = localStorage.getItem(key);
  console.log({ storageType });
  if (storageType) {
    const parsedValue = JSON.parse(storageType);
    return parsedValue;
  }
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  log && console.log("before return ", { value });
  return [value, setValue];
};

export default useLocalStorage;
