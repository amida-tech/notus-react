import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';

import image from '../assets/img/loginbg.jpg'

export default function Auth() {
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
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </main>
  );
}
