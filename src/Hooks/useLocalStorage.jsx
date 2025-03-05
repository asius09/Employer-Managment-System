import React, { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  const clearValue = () => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  };
  return [value, setValue, clearValue];
}
