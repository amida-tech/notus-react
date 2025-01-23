import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { StandardButton } from './CommonStandardButton';
import { azLogout } from 'views/auth/AuthService';

export default function Navbar() {
  // Remove the auth token
  const logout = () => {
    // Remove token (set by Google OAuth)
    localStorage.removeItem('token');
    // Only perform AZ AD logout if azToken is set
    if (localStorage.getItem('azToken')) {
      azLogout();
    }
    // Remove azToken (set by Azure OAuth)
    localStorage.removeItem('azToken');
    
  };
  // Styled div for menu
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  // Anchor element for menu (pop-over)
  const [anchorEl, setAnchorEl] = useState(null);
  // Opens the menu
  const open = Boolean(anchorEl);
  // Handles click to open for menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Handles click to close for menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Handles logout & closing menu
  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Box className='navbar' sx={{ height: '60px', flexGrow: 1 }}>
      <AppBar className='navbar__container' elevation={0}>
        <Toolbar
          sx={{ minHeight: '60px !important' }}
          className='navbar__toolbar'
        >
          <div className='navbar__link-holder-left'>
            <Link
              className='navbar__text-nav-dashboard'
              to={{
                pathname: '/',
              }}
            >
              Saraswati
            </Link>
          </div>

          <div className='navbar__link-holder-right'>
            <Link className='navbar__text' to={{ pathname: '/' }}>
              Dashboard
            </Link>
            <Link className='navbar__text' to={{ pathname: '/reports/' }}>
              Reports
            </Link>
            {/* Logout Circle-Icon */}
            <div className='navbar__icon'>
              <AccountCircleOutlinedIcon
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              {/* Menu (pop-over) */}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <Link to={{ pathname: '/auth/login' }} onClick={logout}>
                    <StandardButton variant='text'>Logout</StandardButton>
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}
