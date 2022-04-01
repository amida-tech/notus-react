import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#505cba',
      light: '#252f78',
      dark: '#5263eb',
    },
    background: {
      main: '#F7F8FC',
      secondary: '#828282',
    },
    success: {
      main: '#94c93d',
      light: '#a2cf6e',
      dark: '#618833',
    },
    text: {
      primary: '#eeeeee',
      secondary: '#000000',
    },
    warning: {
      fontSize: '14pt',
      main: '#3dc1c9',
      light: '#63cdd3',
      dark: '#2a878c',
    },
    white: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#ffffff',
    },
    black: {
      main: '#808080',
      light: '#808080',
      dark: '#808080',
    },
    gray: {
      main: '#616161',
      light: '#666666',
      dark: '#9c9c9c',
    },
    lightGray: {
      main: '#a3a3a3',
      light: '#878787',
      dark: '#bfbfbf',
    },
    blue: {
      main: '#4269f5',
      light: '#162f8a',
      dark: '#5e7ae0',
    },
  },
  typography: {
    color: '#808080',
  },
  shape: {
    borderRadius: {
      xl: '.75em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          // color: '#808080',
        },
      },
    },
  },
});

export default theme;
