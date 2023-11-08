import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import DoctorDetails from './DoctorDetails';
import BookAppointment from './BookAppointment';
import "./DoctorList.css";
const DoctorTab = () => {
    const [speciality, setSpeciality] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [detailOpen, setdetailOpen] = useState(false);
    const [bookOpen, setbookOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        fetchSpecialties();
        fetchDoctors(speciality);
    }, [speciality]);

    const fetchDoctors = async (speciality) => {
        try {
            const response = await fetch(`doctors?speciality=${speciality}`);
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors: ', error);
        }
    };

    const handleSpecialityChange = (event) => {
        const selectedSpeciality = event.target.value;
        setSpeciality(selectedSpeciality);
    };

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setbookOpen(true);
    };

    const handleViewDetails = (doctor) => {
        setSelectedDoctor(doctor);
        setdetailOpen(true);
    };

    const handleClose = () => {
        setdetailOpen(false);
        setbookOpen(false);
    };

    let specialties = [
        "CARDIOLOGIST",
        "GENERAL_PHYSICIAN",
        "DENTIST",
        "PULMONOLOGIST",
        "ENT",
        "GASTRO"
    ];

    const fetchSpecialties = async () => {
        try {
            const response = await fetch('/doctors/speciality');
            specialties = await response.text();
            console.log(specialties);
        } catch (error) {
            console.error('Error fetching specialties: ', error);
        }
    };


    const getStars = (rating) => {
        const stars = '⭐️'.repeat(rating);
        return stars;
    };

    return (
        <div>
        <div style={{ marginLeft:'220px', alignItems: 'center' }}>
            <FormControl style={{ minWidth: 120, margin: '20px' }}>
                <InputLabel id="speciality-label">Specialty</InputLabel>
                <Select
                    labelId="speciality-label"
                    id="speciality"
                    value={speciality}
                    onChange={handleSpecialityChange}
                >
                    {specialties.map((specialty, index) => (
                        <MenuItem key={index} value={specialty}>{specialty}</MenuItem>
                    ))}
                </Select>
            </FormControl>
             </div>
        <div>           
            {doctors.map((doctor, index) => (
                <Paper key={index} style={{ width: '600px', padding: '20px', margin: '20px' }}>
                    <Typography>{`Doctor Name: ${doctor.firstName} ${doctor.lastName}`}</Typography>
                    <Typography>{`Speciality: ${doctor.speciality}`}</Typography>
                    <Typography>{`Rating: ${getStars(doctor.rating)}`}</Typography>
                    <Button
                        style={{ width: '40%', margin: '10px' }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleBookAppointment(doctor)}
                    >
                        BOOK APPOINTMENT
                    </Button>
                    <Button 
                        style={{ width: '40%', margin: '10px', backgroundColor: 'green' }}
                        variant="contained" color="primary" 
                        onClick={() => handleViewDetails(doctor)}
                    >
                        VIEW DETAILS
                    </Button>
                </Paper>
            ))}

            <div>
                <DoctorDetails doctor={selectedDoctor} open={detailOpen} handleClose={handleClose} />
            </div>

            <div>
                <BookAppointment doctor={selectedDoctor} open={bookOpen} handleClose={handleClose}/>
            </div>
        </div>
        </div>
    );
};

export default DoctorTab;