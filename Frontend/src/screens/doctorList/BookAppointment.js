import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Modal,
} from '@material-ui/core';

const BookAppointment = (doctor, open, handleClose) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('07PM-08PM');
    const [medicalHistory, setMedicalHistory] = useState('NA');
    const [symptoms, setSymptoms] = useState('TEST');

    const handleAppointmentBooking = async () => {
        const myHeaders = new Headers();
        const token = localStorage.getItem('token')
        myHeaders.append(
            'Authorization',
            `${token}`
        );
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            doctorId: 'UUID-34',
            doctorName: 'Meghan jordan',
            userId: 'test@gmasil.com',
            userName: 'fname',
            userEmailId: 'test@gmasil.com',
            timeSlot: selectedTimeSlot,
            appointmentDate: selectedDate,
            createdDate: '',
            symptoms: symptoms,
            priorMedicalHistory: medicalHistory,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        try {
            const response = await fetch('/appointments', requestOptions);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Card style={{ margin: '10% auto', width: '50%', padding: '20px' }}>
                <CardContent>
                    <h2>Book an Appointment</h2>
                    <FormControl fullWidth>
                        <TextField label="Doctor's Name" value={`${doctor.firstName} ${doctor.lastName}`} disabled />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label="Select Date"
                            type="date"
                            value={selectedDate}
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
                            <MenuItem value="07AM-08AM">07AM-08AM</MenuItem>
                            <MenuItem value="08AM-09AM">08AM-09AM</MenuItem>
                            <MenuItem value="09AM-10AM">09AM-10AM</MenuItem>
                            <MenuItem value="10AM-11AM">10AM-11AM</MenuItem>
                            <MenuItem value="11AM-12PM">11AM-12PM</MenuItem>
                            <MenuItem value="12PM-01PM">12PM-01PM</MenuItem>
                            <MenuItem value="01PM-02PM">01PM-02PM</MenuItem>
                            <MenuItem value="02PM-03PM">02PM-03PM</MenuItem>
                            <MenuItem value="03PM-04PM">03PM-04PM</MenuItem>
                            <MenuItem value="04PM-05PM">04PM-05PM</MenuItem>
                            <MenuItem value="05PM-06PM">05PM-06PM</MenuItem>
                            <MenuItem value="06PM-07PM">06PM-07PM</MenuItem>
                            <MenuItem value="07PM-08PM">07PM-08PM</MenuItem>
                            <MenuItem value="08PM-09PM">08PM-09PM</MenuItem>
                            <MenuItem value="09PM-10PM">09PM-10PM</MenuItem>
                        </Select>
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
        </Modal>
    );
};

export default BookAppointment;
