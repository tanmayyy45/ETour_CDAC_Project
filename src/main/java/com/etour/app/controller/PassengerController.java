package com.etour.app.controller;

import com.etour.app.entity.PassengerMaster;
import com.etour.app.service.PassengerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {

    private final PassengerService passengerService;

    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PassengerMaster>> getAllPassengers() {
        return ResponseEntity.ok(passengerService.getAllPassengers());
    }

    @PostMapping("/add")
    public ResponseEntity<PassengerMaster> addPassenger(@RequestBody PassengerMaster passenger) {
        return ResponseEntity.ok(passengerService.addPassenger(passenger));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<PassengerMaster>> getByBookingId(@PathVariable Integer bookingId) {
        return ResponseEntity.ok(passengerService.getPassengersByBookingId(bookingId));
    }
    
    @GetMapping("/{passengerId}")
    public PassengerMaster getPassengerById(@PathVariable int passengerId) {
        return passengerService.getPassengerById(passengerId);
    }


   

    @DeleteMapping("/{passengerId}")
    public ResponseEntity<String> deletePassenger(@PathVariable Integer passengerId) {
        passengerService.deletePassenger(passengerId);
        return ResponseEntity.ok("Passenger deleted");
    }
}
