import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./Context/ThemeContext";

function App() {
  const { handleThemeToggle, theme } = useTheme();
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
