package com.upgrad.bookmyconsultation.controller;
import org.springframework.http.HttpStatus;
import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.service.RatingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RatingsController {

    @Autowired
    private RatingsService ratingsService;

    @PostMapping("/ratings")
    public ResponseEntity<String> submitRatings(@RequestBody Rating rating) {
        boolean isRatingSubmitted = ratingsService.submitRating(rating);

        if (isRatingSubmitted) {
            return new ResponseEntity<>("Rating submitted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to submit rating", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}




	//create a post method named submitRatings with return type as ResponseEntity
		//define the method parameter rating of type Rating, use @RequestBody for mapping
		
		//submit the ratings
	
		//return http response with status set to OK
	

