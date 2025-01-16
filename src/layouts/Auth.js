import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';

export default function Auth() {
  return (
    <main
      style={{
        height: '100vh',
        padding: '2rem',
        backgroundSize: 'cover',
      }}
    >
      <style>
        {`
      main::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        filter: grayscale(80%); /* Effects for the background image */
        height: 100vh;
        z-index: -1; /* Place the pseudo-element behind the content */
      }
    `}
      </style>
      <Switch>
        <Route path='/auth/login' component={Login} />
        <Route path='/auth/register' component={Register} />
        <Redirect from='/auth' to='/auth/login' />
      </Switch>
    </main>
  );
}
