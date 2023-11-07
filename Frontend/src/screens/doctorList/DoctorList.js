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
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
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

            {doctors.map((doctor, index) => (
                <Paper key={index} style={{ width: '40%', padding: '20px', margin: '20px' }}>
                    <Typography variant="h5">{`Doctor Name: ${doctor.firstName} ${doctor.lastName}`}</Typography>
                    <Typography>{`Speciality: ${doctor.speciality}`}</Typography>
                    <Typography>{`Rating: ${getStars(doctor.rating)}`}</Typography>
                    
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
        </div>
    );
};

export default DoctorTab;