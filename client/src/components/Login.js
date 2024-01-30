import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.js';
import { useUserContext } from '../contexts/UserContext.js';
import { useLoginContext } from '../contexts/LoginContext.js';
import { useRegisterContext } from '../contexts/RegisterContext.js';
import Alert from './Alert.js';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Paper,
  Snackbar,
} from '@mui/material';
import styled from '@emotion/styled';

const LoginBox = styled(Box)(({ theme }) => ({
  bgcolor: 'white',
  display: 'flex',
  flex: 1,
  minHeight: '630px',
  alignItems: 'center',
  padding: '2.5rem',
  maxWidth: '40rem',
}));

/**
 * `LoginForm` component renders the login form interface for the application.
 * 
 * This component is responsible for rendering input fields for user authentication,
 * handling user input changes via `handleChange`, managing form submission through 
 * `handleSubmit`, displaying any login failure messages, and providing options for 
 * user registration or using alternate login methods (e.g., Google Sign In).
 * 
 * Props:
 * - `handleChange` (Function): Callback to handle changes in input fields.
 * - `handleSubmit` (Function): Callback to handle form submission.
 * - `loginData` (Object): Contains the current state of login input fields (email, password).
 * - `loginFailMessage` (String): Message to be displayed in case of a login failure.
 * 
 * Returns a form component structured with email and password fields, login button, 
 * an optional alert for login failure, and navigation for new user registration or alternate login methods.
 */
const LoginForm = ({ handleChange, handleSubmit, loginData, loginFailMessage }) => {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        size="small"
        variant="outlined"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        label="Email address"
        type="email"
        autoComplete="off"
        fullWidth
      />
      <TextField
        margin="normal"
        size="small"
        type="password"
        name="password"
        variant="outlined"
        value={loginData.password}
        onChange={handleChange}
        label="Password"
        autoComplete="off"
        fullWidth
      />

      {loginFailMessage && (
        <Alert variant="outlined" severity="warning">
          {loginFailMessage}
        </Alert>
      )}
      <FormControlLabel
        control={<Checkbox size="small" />}
        label="Keep me signed in for the future"
        sx={{ color: '#7e7e7e', fontSize: 20 }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ color: 'white', width: '100%', margin: '20px auto' }}
      >
        SIGN IN
      </Button>
      <Divider>or</Divider>
      <Paper
        sx={{
          textAlign: 'center',
          padding: '5px',
          fontWeight: '500',
          verticalAlign: 'center',
          margin: '14px 0',
        }}
      >
        {/* Google Sign In Button */}
      </Paper>
      <Typography color="#7e7e7e" component="div">
        <center>
          Are you new here ? <Button /* onClick for Sign Up */>Sign Up</Button>
        </center>
      </Typography>
    </Box>
  );
};

const Login = ({ toggleForm }) => {
  const { setToken } = useUserContext();
  const {
    loginData,
    setLoginData,
    setLoginPending,
    setLoggedIn,
    loginFailMessage,
    setLoginFailMessage,
  } = useLoginContext();
  const { registerSuccessMessageVisible, setRegisterSuccessMessageVisible } = useRegisterContext();

  const navigate = useNavigate();

  const handleChange = useCallback(
    (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    },
    [loginData, setLoginData]
  );

  const clearData = useCallback(() => {
    setLoginData({ ...loginData, password: '' });
  }, [loginData, setLoginData]);

  const handleSnackbarClose = useCallback(
    (event, reason) => {
      if (reason !== 'clickaway') {
        setRegisterSuccessMessageVisible(false);
      }
    },
    [setRegisterSuccessMessageVisible]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginPending(true);
    try {
      const response = await login(loginData);
      const { status, data } = response;

      if (status === 200) {
        setLoggedIn(true);
        setToken(data.token);
        navigate('/');
      } else {
        setLoginFailMessage(status === 403 ? 'User does not exist' : 'Username or password is incorrect');
      }
    } catch (error) {
      console.error(error);
      setLoginFailMessage('An unexpected error occurred - please try again later');
    } finally {
      clearData();
      setLoginPending(false);
    }
  };

  useEffect(() => {
    setLoginFailMessage(null);
  }, []);

  return (
    <LoginBox>
      <Snackbar
        open={registerSuccessMessageVisible}
        autoHideDuration={12000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Success! You have successfully registered. Welcome to EcoHabit!
        </Alert>
      </Snackbar>
      <Typography variant="h5">
        <strong>Welcome back</strong>
      </Typography>
      <Typography>Have you been staying green?</Typography>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loginData={loginData}
        loginFailMessage={loginFailMessage}
      />
    </LoginBox>
  );
};

export default Login;
