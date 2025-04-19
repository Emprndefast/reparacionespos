// src/pages/ThemeContext.js
import React, { createContext, useState } from 'react';

// Creamos el contexto
export const ThemeContext = createContext();

// Proveedor del contexto
export const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Un hook personalizado para acceder al contexto
export const useThemeContext = () => {
  return React.useContext(ThemeContext);
};
