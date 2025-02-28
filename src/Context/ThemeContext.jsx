import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../Hooks";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  const handleThemeToggle = () =>
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
