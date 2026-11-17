import { useEffect, useState } from "react";
export function useLocalStorage(key, fallback, validate) {
  const [value, setValue] = useState(() => {
    try {
      return validate(JSON.parse(localStorage.getItem(key)) ?? fallback);
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Storage may be blocked; shopping still works in memory. */
    }
  }, [key, value]);
  return [value, setValue];
}
