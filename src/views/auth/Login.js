import {
  Container,
  Paper,
  Box,
  Button,
  Link,
  Typography,
  Grid,
  TextField,
} from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockIcon from '@mui/icons-material/Lock';
import { ReactComponent as GoogleSvg } from '../../assets/img/google.svg';
import env from '../../env';

export default function Login() {
  return (
    <Container maxWidth={false} sx={{ padding: '1rem' }} className="login">
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        SARASWATI
      </Typography>

      <Paper className="login__header-section">

        <Grid container spacing={2}>
          <Grid item xs={6} md={9}>
            <Typography variant="h5">
              Welcome to
              <span style={{ color: '#546E7A', fontWeight: 700 }}> SARASWATI</span>
            </Typography>

            <Typography variant="h3" sx={{ fontWeight: 500, mb: '1rem' }}>
              Sign in
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            sx={{
            }}
          >
            <Typography variant="body1" color="bluegray.L1">
              No Account?
            </Typography>
            <Link
              color="primary"
              underline="none"
              sx={{ fontWeight: 500 }}
              href="/auth/register"
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ my: '.5rem' }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GoogleSvg />}
              onClick={() => oauthSignIn()}
              sx={{
                boxShadow: 'unset',
                backgroundColor: '#E9F1FF',
                color: '#498AF5',

                '&:hover': {
                  backgroundColor: '#bbcbe2',
                  boxShadow: 'unset'
                }
              }}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>

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
                  backgroundColor: '#e8f1fe',
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
                  backgroundColor: '#e8f1fe',
                },
              }}
              InputProps={{
                startAdornment: <LockIcon fontSize="small" sx={{ mr: '.5rem' }} />,
              }}
              placeholder="Password"
            />
          </Grid>
          <Link
            color="primary"
            underline="none"
            href="#pablo"
            sx={{
              m: '1rem 0 2rem 0',
              alignSelf: 'end',
            }}
          >
            Forgot password
          </Link>
        </Grid>

        <Box
          sx={{
            width: '100%',
            textAlign: 'end',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '12rem',
              height: '7ch',
              boxShadow: 'unset',
              backgroundColor: 'gray',
              color: 'black',
              '&:hover': {
                backgroundColor: 'darkgray',
                boxShadow: 'unset'
              }
            }}
          >
            Login
          </Button>
        </Box>

      </Paper>
    </Container>
  );
}

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
