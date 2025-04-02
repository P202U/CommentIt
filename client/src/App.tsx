import { useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import './index.css';

function App() {
  // State to manage the theme (light or dark)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Ensures MUI components use the theme */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* The toggle button with icon */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'transparent',
          }}
        >
          {/* Toggle the icons based on the current theme */}
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <h1 style={{ color: 'text.primary' }}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </h1>

        {/* Additional content */}
        <p style={{ color: 'text.primary' }}>
          The current theme is {isDarkMode ? 'dark' : 'light'} mode.
        </p>
      </div>
    </ThemeProvider>
  );
}

export default App;
