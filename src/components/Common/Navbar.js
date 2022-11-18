import {
  AppBar,
  Box,
  Toolbar,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const logout = () => {
  localStorage.removeItem('token');
  console.log('local storage', localStorage)
}
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: (theme) => theme.palette.bluegray?.D4 }}>
        <Toolbar position="fixed">
          <Box sx={{ pl: '.7rem' }}>
            <Link
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
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
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/' }}
            >
              Dashboard
            </Link>
            <Link
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/reports' }}
            >
              Reports
            </Link>
            <Link
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/welcome' }}
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
