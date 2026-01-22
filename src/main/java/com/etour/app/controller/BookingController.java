package com.etour.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.etour.app.dto.BookingRequestDTO;
import com.etour.app.dto.BookingResponseDTO;
import com.etour.app.entity.BookingHeader;
import com.etour.app.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // CREATE BOOKING

    @PostMapping
    public ResponseEntity<BookingHeader> createBooking(
            @RequestBody BookingRequestDTO dto) {

        return ResponseEntity.ok(
                bookingService.createBooking(dto));
    }

    // GET BOOKING WITH PASSENGERS

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBooking(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                bookingService.getBookingById(id));
    }

    // GET CUSTOMER BOOKINGS

    @GetMapping("/all")
    public ResponseEntity<List<BookingHeader>> getAllBookings() {

        return ResponseEntity.ok(
                bookingService.getAllBookings());
    }

    // CANCEL BOOKING

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelBooking(
            @PathVariable Integer id) {

        bookingService.cancelBooking(id);

        return ResponseEntity.ok("Booking Cancelled Successfully");
    }
}
