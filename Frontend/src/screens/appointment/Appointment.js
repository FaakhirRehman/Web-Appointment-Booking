import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

const Appointment = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInStatus = !!localStorage.getItem('token');
    setIsLoggedIn(loggedInStatus);
    const storedEmail = localStorage.getItem('id');
    const decodedEmail = storedEmail ? storedEmail.replace('_at_', '@') : '';
    const storedId = decodedEmail;
    console.log(storedId);
    if (loggedInStatus && storedId) {
      setUserName(storedId);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && userName) {
      const token = localStorage.getItem('token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
       
        }
      
      };
      console.log(token);
      console.log(userName);
      // Fetch appointments when userName is updated
      fetch(`/users/${userName}/appointments`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setAppointments(data))
        .catch(error => console.error('Error fetching appointments:', error));
    }
    console.log(`/users/${userName}/appointments`);
  }, [isLoggedIn, userName]); // Trigger the fetch when userName changes

  return (
    <div>
      {isLoggedIn ? (
        Array.isArray(appointments) && appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          appointments.map(appointment => (
            <Paper
              key={appointment.appointmentId}
              elevation={3}
              style={{ margin: '15px', padding: '20px', cursor: 'pointer' }}
            >
              <p>Doctor's Name: {appointment.doctorName}</p>
              <p>Appointment Date: {appointment.appointmentDate}</p>
              <p>Symptoms: {appointment.symptoms}</p>
              <p>Previous Medical History: {appointment.priorMedicalHistory}</p>
              <button>RATE APPOINTMENT</button>
            </Paper>
          ))
        )
      ) : (
        <p>Login to see appointments</p>
      )}
    </div>
  );
};

export default Appointment;
