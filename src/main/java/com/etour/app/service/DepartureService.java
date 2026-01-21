package com.etour.app.service;

import java.time.LocalDate;
import java.util.List;

import com.etour.app.entity.DepartureDateMaster;

public interface DepartureService {

    DepartureDateMaster addDeparture(DepartureDateMaster departure);

    DepartureDateMaster updateDeparture(DepartureDateMaster departure);

    List<DepartureDateMaster> getAllDepartures();

    DepartureDateMaster getDepartureById(int departureDateId);

    void deleteDeparture(int departureDateId);

    List<DepartureDateMaster> getDeparturesByCategory(int catmasterId);

    List<DepartureDateMaster> getUpcomingDepartures();

    List<DepartureDateMaster> getDeparturesBetween(LocalDate startDate, LocalDate endDate);
}
