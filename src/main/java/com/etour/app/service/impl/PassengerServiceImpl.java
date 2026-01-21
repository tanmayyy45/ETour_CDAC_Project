package com.etour.app.service.impl;

import com.etour.app.entity.PassengerMaster;
import com.etour.app.repository.PassengerRepository;
import com.etour.app.service.PassengerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerServiceImpl(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    @Override
    public PassengerMaster addPassenger(PassengerMaster passenger) {
        return passengerRepository.save(passenger);
    }
    
    @Override
    public PassengerMaster getPassengerById(int passengerId) {
        return passengerRepository.findById(passengerId).orElse(null);
    }

    @Override
    public List<PassengerMaster> getAllPassengers() {
        return passengerRepository.findAll();
    }

    @Override
    public List<PassengerMaster> getPassengersByBookingId(int bookingId) {
    	return passengerRepository.findPassengersByBookingId(bookingId);
    }

   

    @Override
    public void deletePassenger(int passengerId) {
        PassengerMaster p = passengerRepository.findById(passengerId).orElseThrow();
        passengerRepository.delete(p);
    }

    

}
