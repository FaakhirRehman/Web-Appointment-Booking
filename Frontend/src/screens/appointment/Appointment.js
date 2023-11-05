import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments on component mount
  useEffect(() => {
    const encodedAuth = localStorage.getItem('token');
    fetch('/appointments', {
      headers: {
        Authorization: `Basic ${encodedAuth}`, // Include Basic Authentication
      },
    })
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <div>
      {Array.isArray(appointments) && appointments.length === 0 ? (
        <p>Login to see appointments</p>
      ) : (
        appointments.map(appointment => (
          <Paper key={appointment.appointmentId} elevation={3} style={{ margin: '15px', padding: '20px', cursor: 'pointer' }}>
            <p>Doctor's Name: {appointment.doctorName}</p>
            <p>Appointment Date: {appointment.appointmentDate}</p>
            <p>Symptoms: {appointment.symptoms}</p>
            <p>Previous Medical History: {appointment.priorMedicalHistory}</p>
            <button>RATE APPOINTMENT</button>
          </Paper>
        ))
      )}
    </div>
  );
};

export default Appointment;
