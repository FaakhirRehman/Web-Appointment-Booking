package com.upgrad.bookmyconsultation.repository;

import com.upgrad.bookmyconsultation.entity.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AddressRepository extends CrudRepository<Address, String> {
    // DUDE ADD THE METHOD HERE TO GET THE ADDRESS BY USER ID OR SMTH
}

//mark it as repository
//create an interface AddressRepository that extends CrudRepository
