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
    tertiary: {
      main: '#78909C',
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
      fontSize: '14pt',
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
