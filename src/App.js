import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';

import {
  Snackbar, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { validateAccessToken } from './components/Common/Controller'
import theme from './assets/styles/AppTheme';
import Auth from './layouts/Auth';
import ProtectedRoutes from './ProtectedRoutes';
import env from './env';

const action = (setShowWelcome) => (
  <IconButton
    className="dashboard__snackbar-close"
    size="small"
    aria-label="close"
    color="inherit"
    disableFocusRipple
    disableRipple
    onClick={() => setShowWelcome(false)}
  >
    <CloseIcon fontSize="small" />
  </IconButton>
);

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => { // Check for .env first.
    if (`${env.REACT_APP_AUTH}` === 'false') {
      setAuthenticated(true);
      setLoaded(true);
      return;
    }

    const { hash } = window.location;
    const urlParams = new URLSearchParams(hash);
    let accessToken = urlParams.get('access_token');
    if (accessToken) { // Check if redirect.
      setShowWelcome(true);
      localStorage.setItem('token', accessToken);
      setAuthenticated(true);
      setLoaded(true);
      window.history.replaceState({}, document.title, '/');
      return;
    }

    accessToken = localStorage.getItem('token');
    if (accessToken) { // Otherwise check existing token.
      validateAccessToken(accessToken)
        .then((loggedIn) => {
          setAuthenticated(loggedIn);
          setLoaded(true);
        })
    } else {
      setLoaded(true);
    }
  }, [setShowWelcome, setAuthenticated, setLoaded]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={showWelcome}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setShowWelcome(false)}
        message="Welcome to Saraswati, where knowledge is power."
        action={action(setShowWelcome)}
        sx={{
          '& .MuiSnackbarContent-root': { backgroundColor: '#DFF4FC', color: '#0E3D73' },
        }}
      />
      <BrowserRouter>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          {isLoaded
            && (authenticated ? (
              <ProtectedRoutes loggedIn={authenticated} />
            ) : <Redirect to="/auth" />
            )}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}
