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
      transparent: '#DFF4FC40',
    },
    tertiary: {
      main: '#546E7A',
      light: '#B0BEC5',
      dark: '#455A64',
      contrastText: '#FFFFFF',
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
    bluegray: {
      main: '#607D8B',
      L5: '#ECEFF1',
      L4: '#CFD8DC',
      L3: '#B0BEC5',
      L2: '#90A4AE',
      L1: '#78909C',
      D1: '#546E7A',
      D2: '#455A64',
      D3: '#37474F',
      D4: '#263238',
    },
  },
  typography: {
    color: '#808080',
  },
  components: {

    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '3px',
    //     },
    //   },
    // },

  },
  shape: {
    borderRadius: '3px',
  },
});

export default theme;
