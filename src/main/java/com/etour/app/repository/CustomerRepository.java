package com.etour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.etour.app.entity.CustomerMaster;

public interface CustomerRepository 
        extends JpaRepository<CustomerMaster, Integer> {

}
