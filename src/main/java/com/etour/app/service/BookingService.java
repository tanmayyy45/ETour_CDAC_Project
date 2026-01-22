package com.etour.app.service;

import java.util.List;

import com.etour.app.dto.BookingRequestDTO;
import com.etour.app.dto.BookingResponseDTO;
import com.etour.app.entity.BookingHeader;

public interface BookingService {

    BookingHeader createBooking(BookingRequestDTO dto);

    BookingResponseDTO getBookingById(Integer id);

    List<BookingHeader> getBookings(Integer customerId);
    
    public List<BookingHeader> getAllBookings();

    void cancelBooking(Integer bookingId);
}
