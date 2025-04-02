import { createTheme } from '@mui/material/styles';
import { pink, blue } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#000',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[300],
    },
    secondary: {
      main: pink[300],
    },
    background: {
      default: '#121212', // Dark background color
    },
    text: {
      primary: '#fff', // White text for dark mode
    },
  },
});

export { lightTheme, darkTheme };
