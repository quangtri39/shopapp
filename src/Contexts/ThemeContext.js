import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material";

import useLocalStorageState from "../utils/useLocalStorageState";

const ThemeContext = React.createContext();
export function useAppTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used in ThemeProvider component");
  }
  return context;
}

const darkTheme = responsiveFontSizes(
  createTheme({ palette: { mode: "dark" } })
);
const lightTheme = responsiveFontSizes(
  createTheme({ palette: { mode: "light" } })
);

export default function AppThemeProvider(props) {
  const [appTheme, setAppTheme] = useLocalStorageState(
    "shop-app-theme",
    "light"
  );

  function toggleTheme() {
    if (appTheme === "light") {
      setAppTheme("dark");
    } else {
      setAppTheme("light");
    }
  }

  const value = { appTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider
        theme={appTheme === "light" ? lightTheme : darkTheme}
        {...props}
      />
    </ThemeContext.Provider>
  );
}
