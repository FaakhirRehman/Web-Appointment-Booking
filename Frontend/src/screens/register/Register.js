import { CardContent, FormControl, InputLabel, Input, Button } from '@material-ui/core';
import React, { useState } from 'react';

const Register = ({ closeModal }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleRegister = () => {
    if (!firstName) {
      setFirstNameError('Enter First Name');
    } else if (!lastName) {
      setLastNameError('Enter Last Name');
    } else if (!email) {
      setEmailError('Enter Valid Email');
    } else if (!password) {
      setPasswordError('Enter Valid Password');
    } else if (!contactNumber) {
      setContactNumberError('Enter Contact Number');
    } else {
      setFirstNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');
      setContactNumberError('');
      fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password, contactNumber }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('Registration successful');
            closeModal();
            // Optionally, you can perform additional actions after a successful registration
          } else {
            setRegistrationError('Error registering the user');
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
        {registrationError && <div style={{ color: 'red' }}>{registrationError}</div>}
        <FormControl fullWidth>
          <InputLabel>First Name</InputLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <div style={{ color: 'red' }}>{firstNameError}</div>}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Last Name</InputLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <div style={{ color: 'red' }}>{lastNameError}</div>}
        </FormControl>
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
          />
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Contact Number</InputLabel>
          <Input
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          {contactNumberError && <div style={{ color: 'red' }}>{contactNumberError}</div>}
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          REGISTER
        </Button>
      </CardContent>
    </div>
  );
};

export default Register;
