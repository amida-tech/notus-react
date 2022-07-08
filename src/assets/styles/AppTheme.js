import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',
      light: '#DFF4FC',
      dark: '#162F8A',
    },
    secondary: {
      main: '#DFF4FC',
      light: '##E7F6FD',
      dark: '#1976D2',
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
      fontSize: '14pt',
      main: '#3dc1c9',
      light: '#63cdd3',
      dark: '#2a878c',
    },
    error: {
      main: '#C62828',
      light: '#DD5757',
      dark: '#951F1F',
    },
  },
  typography: {
    color: '#808080',
  },
  shape: {
    borderRadius: {
      xl: '3px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '3px',
        },
      },
    },
  },
});

export default theme;
