package com.etour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.etour.app.entity.DepartureDateMaster;

public interface DepartureDateRepository 
        extends JpaRepository<DepartureDateMaster, Integer> {

}
