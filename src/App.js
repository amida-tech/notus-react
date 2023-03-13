import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';

import {
  Snackbar,
} from '@mui/material';

import { validateAccessToken } from './components/Common/Controller';
import theme from './assets/styles/AppTheme';
import ProtectedRoutes from './ProtectedRoutes';
import Login from './views/auth/Login';
import Register from './views/auth/Register';

import LoadingPage from './components/Utilities/LoadingPage';

function ProtectedRoute({ loggedIn }) {
  return loggedIn
    ? <ProtectedRoutes authenticated={loggedIn} />
    : <Login />;
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TRY TO GRAB TOKEN FROM BROWSER
    let accessToken;
    accessToken = localStorage.getItem('token');

    // CHECK TOKEN IF VALID OR NOT
    if (accessToken) {
      validateAccessToken(accessToken)
        .then((loggedIn) => {
          setAuthenticated(loggedIn);
          setShowWelcome(true);
          setLoading(false);
        });
    }

    // NO TOKEN IN STORAGE, CHECK URL
    const { hash } = window.location;
    const urlParams = new URLSearchParams(hash);
    accessToken = urlParams.get('access_token');
    // STORE NEW TOKEN FROM URL
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      setAuthenticated(true);
      setShowWelcome(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={showWelcome}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setShowWelcome(false)}
        message="Welcome to Saraswati, where knowledge is power."
        sx={{
          '& .MuiSnackbarContent-root': { backgroundColor: theme.palette?.primary.light, color: theme.palette?.text.primary },
        }}
      />
      <BrowserRouter>
        { loading
          ? <LoadingPage />
          : (
            <Routes>
              <Route exact path="*" element={<ProtectedRoute loggedIn={authenticated} />} />
              <Route path="/welcome" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  loggedIn: false,
};
