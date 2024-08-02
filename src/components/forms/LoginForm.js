import React, { useState, useCallback } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../../features/auth/authSlice';

const MAX_LENGTH = 25;

const validate = (username, password) => {
  const errors = {};
  if (!username) {
    errors.username = 'Username is required.';
  } else if (username.length > MAX_LENGTH) {
    errors.username = `Username cannot be more than ${MAX_LENGTH} characters.`;
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length > MAX_LENGTH) {
    errors.password = `Password cannot be more than ${MAX_LENGTH} characters.`;
  }

  return errors;
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const validationErrors = validate(username, password);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    dispatch(login({ username, password }))
      .unwrap() 
      .then(() => {
        navigate('/products'); 
      })
     
  }, [dispatch, username, password, navigate]);

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
