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
    setFirstNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');
      setContactNumberError('');
      setDateOfBirthError('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!firstName) {
      setFirstNameError('Enter First Name');
    } else if (!lastName) {
      setLastNameError('Enter Last Name');
    } else if (!emailId || !emailPattern.test(emailId)) {
      setEmailError('Enter Valid Email');
    } else if (!password) {
      setPasswordError('Enter Valid Password');
    } else if (!mobile || !phonePattern.test(mobile)) {
      setContactNumberError('Enter 10-digit Contact Number');
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
        "firstName": firstName,
        "lastName": lastName,
        "dob": dob,
        "mobile": mobile,
        "password": password,
        "emailId": emailId
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
          if (data != null) {
            closeModal();
          } else {
            setRegistrationError('Error registering. Please try again...');
          }
        })
        .catch(error => console.log('error', error));
    }
  };

  return (
    <div>
      <CardContent style={{ paddingLeft: '20%', paddingRight: '20%', paddingBottom: '20%' }}>
        {registrationError && <div style={{ color: 'red' }}>{registrationError}</div>}
        <FormControl fullWidth>
          First Name
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && <div style={{ color: 'red' }}>{firstNameError}</div>}
        </FormControl>
        <FormControl fullWidth>
          Last Name
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <div style={{ color: 'red' }}>{lastNameError}</div>}
        </FormControl>
        <FormControl fullWidth>
          Email
          <Input
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            aria-describedby="email-helper-text"
          />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        </FormControl>
        <FormControl fullWidth>
          Password
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        </FormControl>
        <FormControl fullWidth>
          Contact Number
          <Input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {contactNumberError && <div style={{ color: 'red' }}>{contactNumberError}</div>}
        </FormControl>
        <FormControl fullWidth>
          Date of Birth
          <TextField
            id="date"
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
