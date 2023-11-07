import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';

const BookAppointment = ({ doctor, open, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);

  const handleAppointmentBooking = () => {
    // Logic for handling appointment booking
    // You can implement the logic to check if the slot is available and handle booking accordingly.
    // For now, let's assume the slot is not available.
    setIsSlotAvailable(false);
  };

  return (
    <Card open={open} onClose={handleClose}>
      <CardContent>
        <h2>Book an Appointment</h2>
        <FormControl fullWidth>
          <TextField label="Doctor's Name" value="Dr. John Doe" disabled />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Select Date"
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="time-slot-label">Select Time Slot</InputLabel>
          <Select
            labelId="time-slot-label"
            id="time-slot"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <MenuItem value="morning">Morning</MenuItem>
            <MenuItem value="afternoon">Afternoon</MenuItem>
            <MenuItem value="evening">Evening</MenuItem>
          </Select>
          {!isSlotAvailable && (
            <div style={{ color: 'red' }}>Either the slot is already booked or not available</div>
          )}
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Medical History"
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAppointmentBooking}>
          BOOK APPOINTMENT
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookAppointment;
