import { CardContent, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import React, { useState } from 'react';

const Login = ({ closeModal, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalidLoginError, setInvalidLoginError] = useState('');

  const handleLoginSubmit = () => {
    setEmailError('');
    setPasswordError('');
    setInvalidLoginError('');

    if (!email) {
      setEmailError('Enter Valid Email');
    } else if (!password) {
      setPasswordError('Enter Valid Password');
    } else {
      setEmailError('');
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(email + ":" + password).toString('base64'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.accessToken != null) {
            console.log(data.accessToken);
            localStorage.setItem('token', `Bearer ${data.accessToken}`); // Storing the token with 'Bearer ' prefix
            const encodedEmail = email.replace('@', '_at_');
            localStorage.setItem('id', encodedEmail);
            console.log(encodedEmail);
            closeModal();
            handleLogin();
          } else {
            setInvalidLoginError('Invalid Email or Password');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <CardContent>
        {invalidLoginError && <div style={{ color: 'red' }}>{invalidLoginError}</div>}
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
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleLoginSubmit}>
          LOGIN
        </Button>
      </CardContent>
    </div>
  );
};

export default Login;
