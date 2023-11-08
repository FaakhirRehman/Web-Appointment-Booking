import React from 'react';
import {
    Paper,
    Typography,
    Modal,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core';

const DoctorDetails = ({ doctor, open, handleClose }) => {
    if (!doctor) return null;
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Card style={{ margin: '10% auto', width: '20%' }}>
                    <CardHeader title="Doctor Details" style={{ backgroundColor: 'purple', height: '70px', color: 'white' }} />
                    <CardContent>
                        <Paper style={{ cursor: 'pointer' }}>
                            <Typography variant="h6">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</Typography>
                            <Typography>{`Total Experience: ${doctor.totalYearsOfExp} years`}</Typography>
                            <Typography>{`Speciality: ${doctor.speciality}`}</Typography>
                            <Typography>{`Date of Birth: ${doctor.dob}`}</Typography>
                            <Typography>{`City: ${doctor.city}`}</Typography>
                            <Typography>{`Email: ${doctor.emailId}`}</Typography>
                            <Typography>{`Mobile: ${doctor.mobile}`}</Typography>
                            <Typography>{`Rating: ${'⭐️'.repeat(doctor.rating)}`}</Typography>
                        </Paper>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default DoctorDetails;