package com.etour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etour.app.entity.TourMaster;

@Repository
public interface TourRepository 
        extends JpaRepository<TourMaster, Integer> {

}
