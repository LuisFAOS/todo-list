import React from 'react';

export const themes = {
    light: {
        background: 'white',
        color: '#000000',
        border:'black',
    },
    dark: {
        background: '#222222',
        color: 'white',
        border:'white',
    },
  };
  
export const ThemeContext = React.createContext(
  themes.light // default value
);