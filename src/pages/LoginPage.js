import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  return (
    <LoginForm />
  );
};

export default LoginPage;
