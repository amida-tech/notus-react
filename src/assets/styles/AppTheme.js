import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',
      light: '#DFF4FC',
      dark: '#162F8A',
      transparent: '#DFF4FC40',
    },
    secondary: {
      main: '#546E7A',
      light: '#B0BEC5',
      dark: '#455A64',
    },
    background: {
      main: '#F7F8FC',
      secondary: '#1976D2',
    },
    success: {
      main: '#2E7D32',
      light: '#47BB4D',
      dark: '#235F26',
    },
    text: {
      primary: '#263238',
      secondary: '#546E7A',
      disabled: '#90A4AE',
    },
    warning: {
      main: '#FFCA28;',
      light: '#FFD75E',
      dark: '#DEA600',
    },
    error: {
      main: '#C62828',
      light: '#DD5757',
      dark: '#951F1F',
    },
  },
  typography: {
    color: '#263238',
  },
  components: {

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },

  },
  shape: {
    borderRadius: '3px',
    borderColor: '#455A64',
  },
});

export default theme;
