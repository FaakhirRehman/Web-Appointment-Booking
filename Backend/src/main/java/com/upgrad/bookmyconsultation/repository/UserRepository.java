package com.upgrad.bookmyconsultation.repository;

import com.upgrad.bookmyconsultation.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
	//ALL OF THEM
	@Override
	List<User> findAll();

	//specify a method that returns User by finding it by email id
	
	// Find user by email id
	User findByEmailId(String emailId);
}
