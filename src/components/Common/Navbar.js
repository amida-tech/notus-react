import {
  AppBar,
  Box,
  Toolbar,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors'
import theme from '../../assets/styles/AppTheme';

const logout = () => {
  localStorage.removeItem('token');
}
const Offset = styled('div')(theme.mixins.toolbar);

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: blueGrey[900] }}>
        <Toolbar position="fixed">
          <Box sx={{ pl: '.7rem' }}>
            <Link
              sx={{ color: blueGrey[50] }}
              component={RouterLink}
              className="navbar__text"
              to="/"
            >
              Saraswati
            </Link>
          </Box>
          <Box sx={{
            flexGrow: 1, display: 'flex', gap: '2rem', justifyContent: 'flex-end',
          }}
          >
            <Link
              sx={{ color: blueGrey[50] }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/' }}
            >
              Dashboard
            </Link>
            <Link
              sx={{ color: blueGrey[50] }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/reports/' }}
            >
              Reports
            </Link>
            <Link
              sx={{ color: blueGrey[50] }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/auth/login' }}
              onClick={logout}
            >
              Sign Out
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  )
}
