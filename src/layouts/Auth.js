import { Routes, Route, Navigate } from 'react-router-dom';
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
      <Routes>
        <Route path="/auth" component={Login} />

        {/* <Route
          path="/auth"
          element={
            authenticated ?
            <Navigate to="/auth/login" :
            <Auth />
          }
        /> */}

        {/* <Navigate from="/auth" to="/auth/login" /> */}
      </Routes>
    </main>
  );
}
