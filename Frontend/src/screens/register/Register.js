import { CardContent, FormControl, InputLabel, Input, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const Register = ({ closeModal }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleRegister = () => {
    if (!firstName) {
      setFirstNameError('Enter First Name');
    } else if (!lastName) {
      setLastNameError('Enter Last Name');
    } else if (!emailId) {
      setEmailError('Enter Valid Email');
    } else if (!password) {
      setPasswordError('Enter Valid Password');
    } else if (!mobile) {
      setContactNumberError('Enter Contact Number');
    } else if (!dob) {
      setDateOfBirthError('Enter Date of Birth');
    } else {
      setFirstNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');
      setContactNumberError('');
      setDateOfBirthError('');

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "firstName":firstName,
        "lastName":lastName,
        "dob":dob,
        "mobile":mobile,
        "password":password,
        "emailId":emailId
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(raw)
      fetch("/users/register", requestOptions)
      .then(response => response.text())
      .then((data) => {
        //console.log(data);
        if (data != null) {
          console.log(data);
          closeModal();
        } else {
          setRegistrationError('Error registering. Please try again...');
        }
      })
      .catch(error => console.log('error', error));

      // fetch('/users/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ firstName, lastName, emailId, password, mobile, dob }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.success) {
      //       console.log('Registration successful');
      //       closeModal();
      //       // Optionally, you can perform additional actions after a successful registration
      //     } else {
      //       setRegistrationError('Error registering the user');
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
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
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
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
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {contactNumberError && <div style={{ color: 'red' }}>{contactNumberError}</div>}
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="date"
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {dateOfBirthError && <div style={{ color: 'red' }}>{dateOfBirthError}</div>}
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          REGISTER
        </Button>
      </CardContent>
    </div>
  );
};

export default Register;
