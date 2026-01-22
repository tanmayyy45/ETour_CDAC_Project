package com.etour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.etour.app.entity.CostMaster;

public interface CostRepository extends JpaRepository<CostMaster, Integer> {

    @Query(value = """
        SELECT c.*
        FROM cost_master c
        JOIN tour_master t ON t.catmaster_id = c.catmaster_id
        WHERE t.tour_id = :tourId
        """, nativeQuery = true)
    CostMaster findCostByTourId(@Param("tourId") Integer tourId);
}
