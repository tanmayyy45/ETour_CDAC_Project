package com.etour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etour.app.entity.TourMaster;

public interface TourRepository extends JpaRepository<TourMaster, Integer> {

}
