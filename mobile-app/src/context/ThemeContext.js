import React, {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = {
    light: {
      primary: '#ff6b35',
      secondary: '#f7931e',
      background: '#f8f9fa',
      surface: '#ffffff',
      text: '#2c3e50',
      textSecondary: '#6c757d',
      border: '#e1e5e9',
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
    },
    dark: {
      primary: '#ff6b35',
      secondary: '#f7931e',
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      textSecondary: '#b0b0b0',
      border: '#404040',
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
    },
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    isDarkMode,
    colors: currentColors,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
