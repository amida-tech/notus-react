import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { ThemeProvider } from '@emotion/react';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { validateAccessToken } from './components/Common/Controller';
import theme from './assets/styles/AppTheme';
import Auth from './layouts/Auth';
import ProtectedRoutes from './ProtectedRoutes';
import env from './env';
import { msalInstance } from 'views/auth/AuthService';

const action = (setShowWelcome) => (
  <IconButton
    className='dashboard__snackbar-close'
    size='small'
    aria-label='close'
    color='inherit'
    disableFocusRipple
    disableRipple
    onClick={() => setShowWelcome(false)}
  >
    <CloseIcon fontSize='small' />
  </IconButton>
);

function MainContent() {
  // State for welcome snackbar
  const [showWelcome, setShowWelcome] = useState(false);
  // State for whether user is authenticated or not
  const [authenticated, setAuthenticated] = useState(false);
  // State for whether data is returned from api call or not
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check for .env first.
    if (`${env.REACT_APP_AUTH}` === 'false') {
      setAuthenticated(true);
      setLoaded(true);
      return;
    }
    // Destructures the hash property from URL
    const { hash } = window.location;
    // Creates a URLSearchParams obj to parse the hash string into kv pairs
    const urlParams = new URLSearchParams(hash);
    // Google OAuth token
    let accessToken = urlParams.get('access_token');
    // Azure OAuth token
    let azAccessToken;
    // Check if there is Google OAuth token
    if (accessToken) {
      // Check if redirect from Google OAuth and show welcome
      setShowWelcome(true);
      // Add the token to local storage
      localStorage.setItem('token', accessToken);
      // Set authenticated and loaded to true
      setAuthenticated(true);
      setLoaded(true);
      // Updates the URL without loading
      window.history.replaceState({}, document.title, '/');
      return;
    }
    // Sets the Google accessToken from storage
    accessToken = localStorage.getItem('token');
    // Sets Azure accessToken from storage
    azAccessToken = localStorage.getItem('azToken');
    // Check if Google access token exists
    if (accessToken) {
      // Check the existing token
      validateAccessToken(accessToken).then((loggedIn) => {
        setAuthenticated(loggedIn);
        setLoaded(true);
      });
      // Check if AZ access token exists
    } else if (localStorage.getItem('azToken')) {
      // Set authenticated and loaded to true
      setAuthenticated(true);
      setLoaded(true);
      // Updates the URL without loading
      window.history.replaceState({}, document.title, '/');
    } else {
      // Only sets loaded to true
      setLoaded(true);
    }
  }, [setShowWelcome, setAuthenticated, setLoaded, authenticated]);

  return (
    <ThemeProvider theme={theme}>
      {/* WELCOME SNACKBAR NOTIFICATION */}
      <Snackbar
        open={showWelcome}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setShowWelcome(false)}
        message='Welcome to Saraswati, where knowledge is power.'
        action={action(setShowWelcome)}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#DFF4FC',
            color: '#0E3D73',
          },
        }}
      />
      <BrowserRouter>
        <Switch>
          {/* AUTH PAGE */}
          <Route path='/auth'>
            <Auth />
          </Route>
          {isLoaded &&
            (authenticated ? (
              // PROTECTED ROUTES
              <ProtectedRoutes loggedIn={authenticated} />
            ) : (
              <Redirect to='/auth' />
            ))}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default function App({}) {
  return (
    // AZ AUTH PROVIDER
    <MsalProvider instance={msalInstance}>
      <MainContent />
    </MsalProvider>
  );
}
