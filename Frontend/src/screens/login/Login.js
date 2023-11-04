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

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    // Implement your login logic here using the '/auth/login' endpoint
    // Validate the email and password
    if (!email) {
      setEmailError('Please fill out this field');
    } else {
      setEmailError('');
    }


    // More validation and login logic
  };

  return (
    <div>
      <Button onClick={openModal}>LOGIN</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login Modal"
      >
        <Card>
          <Tabs value={0} aria-label="login tabs">
            <Tab label="LOGIN" />
            <Tab label="REGISTER" />
          </Tabs>
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
        </Card>
      </Modal>
    </div>
  );
};

export default Login;
