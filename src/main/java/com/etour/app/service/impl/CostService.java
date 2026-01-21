package com.etour.app.service.impl;

import com.etour.app.entity.CostMaster;
import java.util.List;
import java.util.Optional;

public interface CostService {
    List<CostMaster> getAllCosts();
    Optional<CostMaster> getCostById(int id);
    void deleteCost(int id);
}