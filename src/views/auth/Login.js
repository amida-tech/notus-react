import { ReactComponent as GoogleSvg } from '../../assets/img/google.svg';
import { ReactComponent as GithubSvg } from '../../assets/img/github.svg';
import env from '../../env';
import image from '../../assets/img/loginbg.jpg'

import { Paper,
        Link,
        Typography,
        Grid,
        Button,
        TextField} from '@mui/material'

export default function Login() {
  return (
    <Paper backgroundimage={image}>
      <Typography variant="h4">
        Saraswati
      </Typography>

      <Paper> {/* Sign in surface, rounded edges, glossy */}

          <Grid container>
            <Grid item>
            <Typography variant="h4">
              Welcome to Saraswati
            </Typography>
            <Typography variant="h1">
              Sign in
            </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                No Account?
              </Typography>
              <Link href="#">
                Sign Up
              </Link>
            </Grid>
          </Grid>

          <Button>
            LOGO | Sign in with Google
          </Button>

          <Grid container>
            <Grid item>
              <Typography variant="h5">
                Enter your username or email address
              </Typography>
              <TextField>
                ICON | Username or email address
              </TextField>
            </Grid>
            <Grid item>
            <Typography variant="h5">
                Enter your password
              </Typography>
              <TextField>
                ICON | Password
              </TextField>
              <Link href="#">
                Forgot password
              </Link>
            </Grid>
          </Grid>

          <Button>
            Login
          </Button>

      </Paper>
    </Paper>
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
