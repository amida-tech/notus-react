import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';

import {
  Snackbar, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { validateAccessToken } from './components/Common/Controller'
import theme from './assets/styles/AppTheme';
import Login from './views/auth/Login'
import Register from './views/auth/Register'
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

  function ProtectedRoute({ loggedIn }) {
    return loggedIn
      ? <ProtectedRoutes authenticated={loggedIn} />
      : <Login />
  }

  useEffect(() => {
    let accessToken;
    accessToken = localStorage.getItem('token')

    if (accessToken) {
      validateAccessToken(accessToken)
        .then((loggedIn) => {
          setAuthenticated(loggedIn);
        })
      return;
    }

    // NO TOKEN IN STORAGE
    const { hash } = window.location;
    const urlParams = new URLSearchParams(hash);
    accessToken = urlParams.get('access_token')

    // check for access token, proceed
    // check if on local storage, validate
    // check for null

    // WE GOT TOKEN
    if (accessToken) {
      setShowWelcome(true);
      localStorage.setItem('token', accessToken);
      setAuthenticated(true);

      // NO TOKEN IN URL? CHECK LOCALLY
    } else {
      const { hash } = window.location;
      const urlParams = new URLSearchParams(hash);
      accessToken = urlParams.get('access_token')

      // if (accessToken) { // Check if redirect
      //   setShowWelcome(true);
      //   localStorage.setItem('token', accessToken);
      //   setAuthenticated(true);
      //   return;
      // }
    }
  }, []);

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
          '& .MuiSnackbarContent-root': { backgroundColor: '#DFF4FC', color: '#263238' },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={<ProtectedRoute loggedIn={authenticated} />} />
          <Route path="/welcome" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
