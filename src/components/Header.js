import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        {token ? (
          <>
            <Typography>Welcome, {user.username}</Typography>
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          </>
        ) : (

          <Button color="inherit" startIcon={<LoginIcon />} onClick={handleLoginClick}>
            Login
          </Button>
        )}
        <Button color="inherit" startIcon={<ShoppingCartIcon />}>
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
