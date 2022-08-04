import {
  Container,
  Paper,
  Button,
  Link,
  Typography,
  Grid,
  TextField,
} from '@mui/material'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { ReactComponent as GoogleSvg } from '../../assets/img/google.svg';
import { ReactComponent as GithubSvg } from '../../assets/img/github.svg';
import env from '../../env';

export default function Login() {
  return (
    <Container maxWidth={false} className="login">
      <Typography
        variant="h4"
      >
        SARASWATI
      </Typography>

      <Paper className="login__header-section">

        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Typography variant="h5">
              Welcome to SARASWATI
            </Typography>
            <Typography variant="h2">
              Sign in
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              textAlignLast: 'right',
            }}
          >
            <Typography variant="body1" color="tertiary">
              No Account?
            </Typography>
            <Link color="primary" underline="none" href="#">
              Sign Up
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ my: '.5rem' }}>
          {/* <Grid item>
            <Button
              variant="contained"
              color="tertiary"
              startIcon={<GithubSvg/>}
              >
              Github
            </Button>
          </Grid> */}

          <Grid item>
            <Button
              variant="contained"
              color="google"
              startIcon={<GoogleSvg />}
              onClick={() => oauthSignIn()}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} direction="column" sx={{ my: '.5rem' }}>
          <Grid item>
            <Typography variant="h6" sx={{ my: '.5rem' }}>
              Enter your username or email address
            </Typography>
            <TextField
              fullWidth
              color="#FFFFFF80"
            >
              ICON | Username or email address
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Enter your password
            </Typography>
            <TextField
              fullWidth
              color="#FFFFFF80"
            >
              ICON | Password
            </TextField>
          </Grid>
          <Link href="#">
            Forgot password
          </Link>
        </Grid>

        <Button variant="contained" color="tertiary">
          Login
        </Button>

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
