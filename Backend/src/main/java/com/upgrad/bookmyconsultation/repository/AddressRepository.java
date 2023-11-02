package com.upgrad.bookmyconsultation.repository;

import com.upgrad.bookmyconsultation.entity.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AddressRepository extends CrudRepository<Address, String> {
    // DUDE ADD THE METHOD HERE TO GET THE ADDRESS BY USER ID OR SMTH
    List<Address> findByUserId(String userId);
}

//mark it as repository
//create an interface AddressRepository that extends CrudRepository
