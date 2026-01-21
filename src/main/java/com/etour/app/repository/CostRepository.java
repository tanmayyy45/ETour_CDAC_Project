package com.etour.app.repository;

import com.etour.app.entity.CostMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CostRepository extends JpaRepository<CostMaster, Integer> {
    // You can add custom queries here if needed, for example:
    // List<CostMaster> findByCatmaster_Id(Integer catId);
}