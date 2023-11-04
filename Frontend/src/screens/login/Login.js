import { CardContent, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import React, { useState } from 'react';

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLogin = () => {
    // Implement your login logic here using the '/auth/login' endpoint
    // Validate the email and password
    if (!email) {
      setEmailError('Please fill out this field');
    } else {
      setEmailError('');
      // Make an HTTP POST request to the login endpoint
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Check the response from the server
          if (data.success) {
            // Handle successful login
            // For example, you can store the user's authentication token in localStorage
            // and update the isLoggedIn state in the Header component
            localStorage.setItem('token', data.token);
            //setIsLoggedIn(true);
            closeModal();
          } else {
            // Handle login errors
            // For example, display an error message to the user
            //setLoginError(data.message);
          }
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch request
          console.error('Error:', error);
        });
    }
  };


  return (
    <div>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel>Email</InputLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="email-helper-text"
          />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Password</InputLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            aria-describedby="password-helper-text"
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          LOGIN
        </Button>
      </CardContent>

    </div>
  );
};

export default Login;