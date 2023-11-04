import { Card, CardContent, FormControl, InputLabel, Input, Button, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
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
    }
    // Implement other login logic
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