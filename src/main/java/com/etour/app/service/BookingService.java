package com.etour.app.service;

import java.util.List;

import com.etour.app.dto.BookingRequestDTO;
import com.etour.app.entity.BookingHeader;

public interface BookingService {

    BookingHeader createBooking(BookingRequestDTO dto);

    List<BookingHeader> getBookingsByCustomer(Integer customerId);

    BookingHeader getBookingById(Integer bookingId);

    List<BookingHeader> getAllBookings();

    void cancelBooking(Integer bookingId);
}
