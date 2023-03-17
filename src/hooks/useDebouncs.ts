import React, { useEffect, useState } from "react";

function useDebouncs(value: string | undefined, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebouncs;
