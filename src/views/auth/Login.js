import LockIcon from '@mui/icons-material/Lock';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, Container, Grid, Link, Paper, TextField, Typography,
} from '@mui/material';
import theme from '../../assets/styles/AppTheme'
import { ReactComponent as GoogleSvg } from '../../assets/img/google.svg';
import image from '../../assets/img/loginbg.jpg'
import env from '../../env';

export default function Login() {
  /*
  * Create form to request access token from Google's OAuth 2.0 server.
  */
  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint = env.REACT_APP_GOOGLE_OAUTH_URL;
    const clientId = env.REACT_APP_GOOGLE_CLIENT_ID;
    const dashboardUrl = env.REACT_APP_DASHBOARD_URL;

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    const form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    const params = {
      client_id: clientId,
      redirect_uri: dashboardUrl,
      response_type: 'token',
      scope: 'openid profile email',
      include_granted_scopes: 'true',
      state: 'pass-through-value',
    };

    Object.keys(params).forEach((key) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', params[key]);
      form.appendChild(input);
    });

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

  return (
    <main
      style={{
        backgroundImage:
        `url(${image})`,
        height:
        '100vh',
        padding:
        '2rem',
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
            backgroundColor: theme.palette?.secondary.transparent,
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
                  sx={{ color: theme.palette.bluegray?.main, fontWeight: 700 }}
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

          <Grid container spacing={0} sx={{ mb: '.5rem' }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<GoogleSvg />}
                onClick={() => oauthSignIn()}
                sx={{
                  backgroundColor: '#E9F1FF',
                  color: '#498AF5',

                  '&:hover': {
                    backgroundColor: '#d0e2fb',
                  },
                }}
              >
                Sign in with Google
              </Button>
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
