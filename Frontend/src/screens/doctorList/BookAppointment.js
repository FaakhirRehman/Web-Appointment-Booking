import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Button,
    Modal,
    CardHeader,
} from '@material-ui/core';

const BookAppointment = ({ doctor, open, handleClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [serverResponse, setServerResponse] = useState('');

    const storedEmail = localStorage.getItem('id');
    const decodedEmail = storedEmail ? storedEmail.replace('_at_', '@') : '';

    let text = decodedEmail;
    const myArray = text.split("@");
    let username = myArray[0];

    
    const handleAppointmentBooking = () => {
        if (!selectedTimeSlot) {
            setServerResponse('Please select a time slot.');
        }
        else {
            setServerResponse('');
            const token = localStorage.getItem('token')
            const raw = JSON.stringify({
                doctorId: doctor.id,
                doctorName: `${doctor.firstName} ${doctor.lastName}`,
                userId: decodedEmail,
                userName: username,
                userEmailId: decodedEmail,
                timeSlot: selectedTimeSlot,
                appointmentDate: selectedDate,
                createdDate: '',
                symptoms: symptoms,
                priorMedicalHistory: medicalHistory,
            });

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
                body: raw,
            };
            setServerResponse('');
            fetch('/appointments', requestOptions)
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    return response;
                })
                .then(data => {
                    window.alert('Appointment booked successfully');
                })
                .catch(error => {
                    console.error('Error:', error);
                    window.alert('Slot Already Booked');
                });
        //     try {

        //         const response = fetch('/appointments', requestOptions);
        //         const statusCode = response.status;
        //         console.log(statusCode);
        //         if (statusCode => 200 && statusCode < 300) {
        //             // setServerResponse('Appointment booked successfully');
        //             window.alert('Appointment booked successfully');
        //         }
        //         else {
        //             // setServerResponse('Slot Already Booked');
        //             window.alert('Slot Already Booked');
        //         }
        //     } catch (error) {
        //         console.log('error', error);
        //         window.alert('Slot Already Booked');
        //     }
        }
    };
    if (!doctor) return null;

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Card style={{ margin: '10% auto', width: '50%', maxHeight: '80vh', overflowY: 'auto'  }}>
                    <CardContent>
                        <CardHeader title="Book an Appointment" style={{ backgroundColor: 'purple', height: '70px', color: 'white' }} />
                        {serverResponse && <div style={{ color: 'red' }}>{serverResponse}</div>}
                        <FormControl style={{ paddingTop: '1%' }} fullWidth>
                            Doctor's Name
                            <TextField style={{ width: '30%', alignItems: 'left' }} value={`${doctor.firstName} ${doctor.lastName}`} disabled />
                        </FormControl>
                        <FormControl fullWidth>
                            Select Date
                            <TextField
                                type="date"
                                style={{ width: '30%', alignItems: 'left' }}
                                value={selectedDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            Select Time Slot
                            <Select
                                style={{ width: '30%', alignItems: 'left' }}
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
                            Medical History
                            <TextField
                                value={medicalHistory}
                                onChange={(e) => setMedicalHistory(e.target.value)}
                                style={{ paddingTop: '10%', width: '30%', alignItems: 'left' }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            Symptoms
                            <TextField
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                style={{ paddingTop: '10%', width: '30%', alignItems: 'left' }}
                            />
                        </FormControl>
                        <Button style={{ marginTop: '5%' }} variant="contained" color="primary" onClick={handleAppointmentBooking}>
                            BOOK APPOINTMENT
                        </Button>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default BookAppointment;
