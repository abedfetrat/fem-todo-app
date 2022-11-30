import { useState, useEffect } from "react";

function useLocalStorageState(key, initialValue, stringify) {
  const [value, setValue] = useState(() => {
    const persistedValue = localStorage.getItem(key);
    return persistedValue !== null ? (stringify ? JSON.parse(persistedValue) : persistedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, (stringify ? JSON.stringify(value) : value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorageState;