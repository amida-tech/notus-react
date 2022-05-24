import * as React from 'react';
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: '#263238' }}>
        <Toolbar>
          <div className="width-75 mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
            <Link
              className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
              to={{
                pathname: '/measures/',
              }}
            >
              Saraswati
            </Link>
          </div>

          <div className="mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
            <div className="mx-4">
              <Link
                className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                to={{ pathname: '/' }}
              >
                Dashboard
              </Link>
            </div>
            <div className="mx-4">
              <Link
                className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                to={{ pathname: '/reports/' }}
              >
                Reports
              </Link>
            </div>
            <div className="mx-2">
              <Link
                className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                to={{ pathname: '/auth/login' }}
                onClick={logout}
              >
                Sign Out
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}
