import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  Snackbar, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';
import Dashboard from './layouts/Dashboard';
import Auth from './layouts/Auth';
import NotFound from './notFound';
import DatastoreProvider from './context/DatastoreProvider';
import Reports from './layouts/Reports'

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
    if (`${process.env.REACT_APP_AUTH}` === 'false') {
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
    <>
      <Snackbar
        open={showWelcome}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setShowWelcome(false)}
        message="Welcome to Saraswati, where knowledge is power."
        action={action(setShowWelcome)}
        sx={{
          '& .MuiSnackbarContent-root': { backgroundColor: '#DFF4FC', color: '#263238' },
        }}
      />
      <BrowserRouter>
        <Switch>
          <DatastoreProvider>
            <Route path="/reports">
              <Reports />
            </Route>
          </DatastoreProvider>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route exact path="/">
            {isLoaded
              && (authenticated ? (
                <DatastoreProvider>
                  <Dashboard loggedIn={authenticated} />
                </DatastoreProvider>
              ) : <Redirect to="/auth" />
              )}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

const validateAccessToken = async (accessToken) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_TOKENINFO}?access_token=${accessToken}`);
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    localStorage.removeItem('token');
  }
  return false;
}
