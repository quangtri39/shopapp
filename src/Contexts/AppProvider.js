import React from "react";
import { AuthProvider } from "./AuthContext";
import AppThemeProvider from "./ThemeContext";

import { BrowserRouter as Router } from "react-router-dom";
export default function AppProvider({ children }) {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
    </AppThemeProvider>
  );
}
