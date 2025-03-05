import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./Context/ThemeContext";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
