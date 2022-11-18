import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
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

import LoadingPage from './components/Utilities/LoadingPage'

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  
  // WE SHOULD ADD AN ACCESS TOKEN CHECK AND CONDITIONALLY RENDER LOGIN AND PROTECTED ROUTES FROM THERE

  function ProtectedRoute({ loggedIn }) {
    return loggedIn
      ? <ProtectedRoutes authenticated={loggedIn} />
      : <Login />
  }

  // TODO CLEAN UP

  useEffect(() => {

    // TRY TO GRAB TOKEN FROM BROWSER
    let accessToken;
    accessToken = localStorage.getItem('token')

    // CHECK TOKEN IF VALID OR NOT
    if (accessToken) {
      validateAccessToken(accessToken)
        .then((loggedIn) => {
          setAuthenticated(loggedIn);
          setLoading(false)
        })
      return;
    }

    // NO TOKEN IN STORAGE, CHECK URL
    const { hash } = window.location;
    const urlParams = new URLSearchParams(hash);
    accessToken = urlParams.get('access_token')

    // STORE NEW TOKEN FROM URL
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      setShowWelcome(true);
      setAuthenticated(true);
      setLoading(false)

    } else {
      setLoading(false)
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
          '& .MuiSnackbarContent-root': { backgroundColor: '#DFF4FC', color: '#263238' },
        }}
      />
      <BrowserRouter>
        { loading ?
          <LoadingPage />
          :
          <Routes>
            <Route exact path="*" element={<ProtectedRoute loggedIn={authenticated} />} />
            <Route path="/welcome" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        }
      </BrowserRouter>
    </ThemeProvider>
  )
}
