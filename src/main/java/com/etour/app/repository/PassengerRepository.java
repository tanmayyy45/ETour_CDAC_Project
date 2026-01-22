package com.etour.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.etour.app.entity.PassengerMaster;

public interface PassengerRepository extends JpaRepository<PassengerMaster, Integer> {

    // Fetch passengers for booking (Native = avoids Hibernate parser issue)
    @Query(value = "SELECT * FROM passenger_master WHERE booking_id = :bookingId", nativeQuery = true)
    List<PassengerMaster> getPassengersByBookingId(@Param("bookingId") Integer bookingId);

    // Delete old passengers before re-inserting
    @Modifying
    @Query(value = "DELETE FROM passenger_master WHERE booking_id = :bookingId", nativeQuery = true)
    void deletePassengersByBookingId(@Param("bookingId") Integer bookingId);

}
