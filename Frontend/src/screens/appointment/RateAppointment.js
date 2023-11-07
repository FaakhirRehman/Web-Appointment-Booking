import React, { useState } from 'react';
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RateAppointment = ({ open, handleClose, doctorId, appointmentId }) => {
  const [comments, setComments] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [error, setError] = useState('');

  const handleRateAppointment = () => {
    if (selectedRating === 0) {
      setError('Submit a rating');
    } else {
      const token = localStorage.getItem('token');
      // Create an object to send to the server
      const ratingData = {
        appointmentId: appointmentId,
        doctorId: doctorId,
        rating: selectedRating,
        comments: comments,
      };

      // POST request to send rating data to the server
      fetch('http://localhost:8080/ratings', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Reset state and close the modal after successful submission
          setComments('');
          setSelectedRating(0);
          setError('');
          handleClose();
        })
        .catch((error) => {
          console.error('Error submitting rating:', error);
        });
    }
  };

  const handleRatingSelection = (rating) => {
    setError(''); // Clear the error when a rating is selected
    setSelectedRating(rating);
  };

  const renderRatingButtons = () => {
    const ratings = [1, 2, 3, 4, 5]; // Change this array based on the number of ratings you want to display

    return ratings.map((rating) => (
      <IconButton
        key={rating}
        onClick={() => handleRatingSelection(rating)}
      >
        {rating <= selectedRating ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    ));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card>
        <CardHeader title="Rate an Appointment" />
        <CardContent>
          <FormControl>
            <TextField
              label="Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <div>
              {renderRatingButtons()}
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRateAppointment}>
            RATE APPOINTMENT
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default RateAppointment;
