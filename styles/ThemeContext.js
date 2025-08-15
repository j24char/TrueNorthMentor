import React, { createContext, useState, useContext } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// Color palette
const primaryGrey = '#566970';
const primaryNavy = '#2f405cff';
const primaryGold = '#cb9c4c';

const lightColors = {
  background: '#fff',
  text: '#000',
  card: '#f0f0f0',
  border: '#ccc',
  iconColor: primaryNavy,
};

const darkColors = {
  background: '#121212',
  text: '#fff',
  card: '#1e1e1e',
  border: '#333',
  iconColor: primaryGold,
};

const MyLightTheme = {
  ...DefaultTheme,
  mode: 'light',
  colors: {
    ...DefaultTheme.colors,
    primary: primaryNavy,
    secondary: primaryGrey,
    background: '#ffffff',
    card: '#fff',
    text: '#111',
    border: '#ccc',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  mode: 'dark',
  colors: {
    ...DarkTheme.colors,
    primary: primaryGold,
    secondary: primaryGrey,
    background: '#1a1a1a',
    card: '#2a2a2a',
    text: '#eee',
    border: '#555',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    console.log("Attempted to toggle theme");
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'dark' ? MyDarkTheme : MyLightTheme;

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
