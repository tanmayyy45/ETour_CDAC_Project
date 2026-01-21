package com.etour.app.service;

import java.util.List;

import com.etour.app.entity.PassengerMaster;

public interface PassengerService {
	
	 PassengerMaster addPassenger(PassengerMaster passenger);

	    List<PassengerMaster> getAllPassengers();

	    List<PassengerMaster> getPassengersByBookingId(int bookingId);


	    void deletePassenger(int passengerId);
	    
	    PassengerMaster getPassengerById(int passengerId);


}
