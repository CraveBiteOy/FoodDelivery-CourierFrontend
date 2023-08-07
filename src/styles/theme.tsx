// ThemeContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

export type ThemeType = {
  backgroundColor: string;
  color: string;
  primary: string;
  secondary: string;
  accent: string;
  buttonLabel: string;
  menuBackground: string;
  menuText: string;
  
};

export const lightTheme: ThemeType = {
  backgroundColor: '#ffffff',
  color: '#000000',
  primary: '#f7691a',
  secondary: '#1a6ef7',
  accent: '#f7a585',
  buttonLabel: '#ffffff',
  menuBackground: '#f2f2f2',    
  menuText: '#333333',
};

export const darkTheme: ThemeType = {
  backgroundColor: '#000000',
  color: '#ffffff',
  primary: '#f7691a',
  secondary: '#1a6ef7',
  accent: '#f79460',
  buttonLabel: '#ffffff',
  menuBackground: '#1a1a1a', 
  menuText: '#e5e5e5',
};

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
