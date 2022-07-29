import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const logout = () => {
  localStorage.removeItem('token');
}
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Navbar() {
  return (
    <Box className="navbar" sx={{ flexGrow: 1 }}>
      <AppBar className="navbar__container">
        <Toolbar className="navbar__toolbar">
          <div className="navbar__link-holder-left">
            <Link
              className="navbar__text-nav-dashboard"
              to={{
                pathname: '/',
              }}
            >
              Saraswati
            </Link>
          </div>

          <div className="navbar__link-holder-right">
            <Link
              className="navbar__text"
              to={{ pathname: '/' }}
            >
              Dashboard
            </Link>
            <Link
              className="navbar__text"
              to={{ pathname: '/reports/' }}
            >
              Reports
            </Link>
            <Link
              className="navbar__text-signout"
              to={{ pathname: '/auth/login' }}
              onClick={logout}
            >
              Sign Out
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}
