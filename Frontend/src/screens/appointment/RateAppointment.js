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
const styles = {
  card: {
    width: '60%',
    margin:  'auto',
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'left',
    alignItems: 'left',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
  },
};


const RateAppointment = ({ open, handleClose, doctorId, appointmentId }) => {
  const [comments, setComments] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [error, setError] = useState('');

  const handleRateAppointment = () => {
    if (selectedRating === 0) {
      setError('Submit a rating');
    } else {
      const token = localStorage.getItem('token');
      const ratingData = {
        appointmentId: appointmentId,
        doctorId: doctorId,
        rating: selectedRating,
        comments: comments,
      };
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
    setError('');
    setSelectedRating(rating);
  };

  const renderRatingButtons = () => {
    const ratings = [1, 2, 3, 4, 5];

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
      <Card style={styles.card}>
      <CardHeader
        title="Rate an Appointments"
        style={{
          backgroundColor: 'purple',
          height: '70px',
          padding: '11px',
          color: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        
        }}
        
        />
        <div style={{ marginTop: '10px' }}></div>
        <CardContent style={{ paddingTop: 0 }}>
          <FormControl>
            Comments
            <TextField
              label=""
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
          <CardContent style={{ paddingTop: 0 }}>
          <FormControl>
            <div>
              <p>Rating
              {renderRatingButtons()}</p>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </FormControl>
          </CardContent>
          <Button variant="contained" color="primary" onClick={handleRateAppointment}>
            RATE APPOINTMENT
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default RateAppointment;
