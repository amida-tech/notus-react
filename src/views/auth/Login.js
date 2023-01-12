import LockIcon from '@mui/icons-material/Lock';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, Grid, Link, Paper, TextField, Typography,
} from '@mui/material';
import { useEffect, useCallback } from 'react'
import theme from '../../assets/styles/AppTheme'
import image from '../../assets/img/loginbg.jpg'
import env from '../../env';

export default function Login() {
  const clientId = env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate()

  const handleCallbackResponse = useCallback((response) => {
    console.log(response)
    // localStorage.setItem('token', response.credential);
    // navigate('/', { replace: true });
    // navigate(0);
  }, [navigate])

  useEffect(() => {
    // global google
    const GOOGLE_INIT = window.google.accounts.id;
    GOOGLE_INIT.renderButton(
      document.getElementById('signInButton'),
      { theme: ' outline', size: 'large' },
    )
    // GOOGLE_INIT.initialize({
    //   client_id: clientId,
    //   scope: 'https://www.googleapis.com/auth/analytics',
    //   callback: (data) => handleCallbackResponse(data),
    // })

    // google.accounts.oauth2.initTokenClient({
    //   client_id: clientId,
    //   redirect_uri: env.REACT_APP_DASHBOARD_URL,
    //   scope: 'openid',
    //   callback: (data) => handleCallbackResponse(data),
    // });
  }, [clientId, handleCallbackResponse])

  return (
    <main
      style={{
        backgroundImage: `url(${image})`,
        height: '100vh',
        padding: '2rem',
        marginBottom: '-1rem',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Container maxWidth={false} sx={{ padding: '1rem' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          SARASWATI
        </Typography>

        <Paper
          sx={{
            backdropFilter: 'blur(1px)',
            backgroundColor: theme.palette?.primary.transparent,
            borderRadius: 10,
            padding: '2rem',
            float: 'right',
            marginRight: '6rem',
            width: '600px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={9}>
              <Typography variant="h5">
                Welcome to
                <Typography
                  component="span"
                  variant="h5"
                  display="inline"
                  sx={{ color: theme.palette.bluegray?.D2, fontWeight: 700 }}
                >
                  {' '}
                  SARASWATI
                </Typography>
              </Typography>

              <Typography variant="h3" sx={{ fontWeight: 500, mb: '1rem' }}>
                Sign in
              </Typography>
            </Grid>
          </Grid>

          { env.REACT_APP_MVP_SETTING === false
            && (
            <Grid
              item
              xs={6}
              md={3}
              sx={{
              }}
            >
              <Typography variant="body1">
                No Account?
              </Typography>
              <Link
                component={RouterLink}
                color="primary"
                underline="none"
                sx={{ fontWeight: 500 }}
                to="/register"
              >
                Sign Up
              </Link>
            </Grid>
            ) }

          <Grid container spacing={2} direction="column" sx={{ my: '.5rem' }}>
            <Grid item>
              <Typography variant="h6" sx={{ my: '.5rem' }}>
                Enter your username or email address
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
                label="Username/Email"
                id="LoginEmailInput"
                type="email"
                margin="dense"
                InputProps={{
                  startAdornment: <PersonRoundedIcon fontSize="small" sx={{ mr: '.5rem' }} />,
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: theme.palette.bluegray?.L5,
                  },
                }}
                placeholder="Username or email address"
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Enter your password
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                required
                label="Password"
                type="password"
                id="LoginPasswordInput"
                margin="dense"
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: theme.palette.bluegray?.L5,
                  },
                }}
                InputProps={{
                  startAdornment: <LockIcon fontSize="small" sx={{ mr: '.5rem' }} />,
                }}
                placeholder="Password"
              />
            </Grid>
            <Link
              component={RouterLink}
              color="primary"
              underline="none"
              to="#pablo"
              disabled
              sx={{
                m: '1rem 0 0 0',
                alignSelf: 'end',
                ':hover': {
                  pointerEvents: 'auto',
                  cursor: 'not-allowed',
                },
              }}
            >
              Forgot password
            </Link>
          </Grid>

          <Grid container spacing={2} direction="column" sx={{ my: '.5rem' }}>
            <Grid item>
              <Button id="signInButton" />
            </Grid>
          </Grid>

          <Box
            sx={{
              width: '100%',
              textAlign: 'end',
              '&:hover': {
                pointerEvents: 'auto',
                cursor: 'not-allowed',
              },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              disabled
              sx={{
                width: '12rem',
                height: '3rem',
              }}
            >
              Login
            </Button>
          </Box>

        </Paper>
      </Container>
    </main>
  );
}
