package com.etour.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.etour.app.entity.DepartureDateMaster;
import com.etour.app.service.DepartureService;

@RestController
@RequestMapping("/departure")
public class DepartureController {

    @Autowired
    private DepartureService service;

    // ✅ 1) Add Departure Date
    @PostMapping("/add")
    public DepartureDateMaster addDeparture(@RequestBody DepartureDateMaster departure) {
        return service.addDeparture(departure);
    }

    // ✅ 2) Update Departure Date
    @PutMapping("/update")
    public DepartureDateMaster updateDeparture(@RequestBody DepartureDateMaster departure) {
        return service.updateDeparture(departure);
    }

    // ✅ 3) Get All Departure Dates
    @GetMapping("/all")
    public List<DepartureDateMaster> getAllDepartures() {
        return service.getAllDepartures();
    }

    // ✅ 4) Get Departure By ID
    @GetMapping("/{id}")
    public DepartureDateMaster getDepartureById(@PathVariable int id) {
        return service.getDepartureById(id);
    }

    // ✅ 5) Delete Departure By ID
    @DeleteMapping("/delete/{id}")
    public String deleteDeparture(@PathVariable int id) {
        service.deleteDeparture(id);
        return "Departure deleted successfully!";
    }

    // ✅ 6) Get Departures By Category (catmaster_id)
    @GetMapping("/category/{catmasterId}")
    public List<DepartureDateMaster> getDeparturesByCategory(@PathVariable int catmasterId) {
        return service.getDeparturesByCategory(catmasterId);
    }

    // ✅ 7) Get Upcoming Departures (today onwards)
    @GetMapping("/upcoming")
    public List<DepartureDateMaster> getUpcomingDepartures() {
        return service.getUpcomingDepartures();
    }

    // ✅ 8) Get Departures Between Dates
    // Example:
    // /departure/between?start=2026-01-01&end=2026-12-31
    @GetMapping("/between")
    public List<DepartureDateMaster> getDeparturesBetween(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        return service.getDeparturesBetween(start, end);
    }
}
