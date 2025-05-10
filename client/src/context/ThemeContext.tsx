import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  colors: {
    primary: string;
    accent: string;
    base: string;
    neutralLight: string;
    neutralDark: string;
    alert: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themeColors = {
  primary: '#5D2E8C', // Primary Purple
  accent: '#2D9B4F',  // Accent Green
  base: '#FFFFFF',    // Base White
  neutralLight: '#F4F4F4', // Light Gray
  neutralDark: '#D1D1D1',  // Dark Gray
  alert: '#FF4B4B'    // Alert Red
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme: ThemeContextType = {
    colors: themeColors
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};