package com.etour.app.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etour.app.entity.DepartureDateMaster;
import com.etour.app.repository.DepartureDateRepository;
import com.etour.app.service.DepartureService;

@Service
public class DepartureDateImpl implements DepartureService {

    @Autowired
    private DepartureDateRepository repo;

    @Override
    public DepartureDateMaster addDeparture(DepartureDateMaster departure) {
        return repo.save(departure);
    }

    @Override
    public DepartureDateMaster updateDeparture(DepartureDateMaster departure) {
        return repo.save(departure);
    }

    @Override
    public List<DepartureDateMaster> getAllDepartures() {
        return repo.findAll();
    }

    @Override
    public DepartureDateMaster getDepartureById(int departureDateId) {
        return repo.findById(departureDateId).orElse(null);
    }

    @Override
    public void deleteDeparture(int departureDateId) {
        repo.deleteById(departureDateId);
    }

    @Override
    public List<DepartureDateMaster> getDeparturesByCategory(int catmasterId) {
        return repo.findByCatmasterId(catmasterId);
    }

    @Override
    public List<DepartureDateMaster> getUpcomingDepartures() {
        return repo.findByDepartureDateGreaterThanEqual(LocalDate.now());
    }

    @Override
    public List<DepartureDateMaster> getDeparturesBetween(LocalDate startDate, LocalDate endDate) {
        return repo.findByDepartureDateBetween(startDate, endDate);
    }
}
 