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
    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Card style={{ margin: '10% auto', width: '50%', padding: '20px' }}>
                    <CardHeader title="Doctor Details" style={{ backgroundColor: 'purple', height: '70px', padding: '11px', color: 'white' }} />
                    <CardContent>
                        <Paper style={{ margin: '15px', padding: '20px', cursor: 'pointer' }}>
                            <Typography variant="h6">{`Doctor's Name: ${doctor.firstName} ${doctor.lastName}`}</Typography>
                            <Typography>{`Total Experience: ${doctor.totalYearsOfExp} years`}</Typography>
                            <Typography>{`Speciality: ${doctor.speciality}`}</Typography>
                            <Typography>{`Date of Birth: ${doctor.dob}`}</Typography>
                            <Typography>{`City: ${doctor.city}`}</Typography>
                            <Typography>{`Email: ${doctor.emailId}`}</Typography>
                            <Typography>{`Mobile: ${doctor.mobile}`}</Typography>
                            <Typography>{`Rating: ${'⭐'.repeat(doctor.rating)}`}</Typography>
                        </Paper>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default DoctorDetails;
