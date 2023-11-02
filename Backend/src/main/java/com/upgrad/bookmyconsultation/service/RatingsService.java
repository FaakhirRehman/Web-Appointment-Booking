package com.upgrad.bookmyconsultation.service;

import com.upgrad.bookmyconsultation.entity.Doctor;
import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.repository.DoctorRepository;
import com.upgrad.bookmyconsultation.repository.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class RatingsService {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private RatingsRepository ratingsRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	public void submitRatings(Rating rating) {
        // Setting a UUID for the rating
        rating.setId(UUID.randomUUID().toString());

        // Save the rating to the database
        ratingsRepository.save(rating);

        // Get the doctor ID from the rating object
        String doctorId = rating.getDoctorId();

        // Find the specific doctor using the doctor ID
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor != null) {
            // Get all ratings for the specific doctor
            List<Rating> doctorRatings = ratingsRepository.findByDoctorId(doctorId);

            // Calculate new average rating
            double newRating = calculateNewAverageRating(doctorRatings);

            // Update the doctor's average rating
            doctor.setRating(newRating);

            // Save the updated doctor object to the database
            doctorRepository.save(doctor);
        }
    }

	// Helper method to calculate the new average rating
    private double calculateNewAverageRating(List<Rating> doctorRatings) {
        double totalRatings = doctorRatings.stream()
                .mapToDouble(Rating::getRating)
                .sum();
        return totalRatings / doctorRatings.size();
    }

	//create a method name submitRatings with void return type and parameter of type Rating
		//set a UUID for the rating
		//save the rating to the database
		//get the doctor id from the rating object
		//find that specific doctor with the using doctor id
		//modify the average rating for that specific doctor by including the new rating
		//save the doctor object to the database
	
	

	}
//}
