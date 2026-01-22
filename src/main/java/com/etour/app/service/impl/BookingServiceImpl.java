package com.etour.app.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.etour.app.dto.BookingRequestDTO;
import com.etour.app.dto.BookingResponseDTO;
import com.etour.app.dto.PassengerDTO;
import com.etour.app.dto.PassengerResponseDTO;
import com.etour.app.entity.BookingHeader;
import com.etour.app.entity.CostMaster;
import com.etour.app.entity.CustomerMaster;
import com.etour.app.entity.DepartureDateMaster;
import com.etour.app.entity.PassengerMaster;
import com.etour.app.entity.TourMaster;
import com.etour.app.repository.BookingRepository;
import com.etour.app.repository.CostRepository;
import com.etour.app.repository.CustomerRepository;
import com.etour.app.repository.DepartureDateRepository;
import com.etour.app.repository.PassengerRepository;
import com.etour.app.repository.TourRepository;
import com.etour.app.service.BookingService;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private DepartureDateRepository departureRepository;

    @Autowired
    private CostRepository costRepository;

    // =================================================
    // CREATE BOOKING (PAY BUTTON)
    // =================================================

    @Override
    public BookingHeader createBooking(BookingRequestDTO dto) {

        CustomerMaster customer =
                customerRepository.findById(dto.getCustomerId())
                        .orElseThrow(() -> new RuntimeException("Customer Not Found"));

        TourMaster tour =
                tourRepository.findById(dto.getTourId())
                        .orElseThrow(() -> new RuntimeException("Tour Not Found"));

        DepartureDateMaster departure =
                departureRepository.findById(dto.getDepartureDateId())
                        .orElseThrow(() -> new RuntimeException("Departure Date Not Found"));

        CostMaster cost =
                costRepository.findCostByTourId(dto.getTourId());

        if (cost == null) {
            throw new RuntimeException("Cost Not Configured");
        }

        // ======================
        // CREATE BOOKING OBJECT
        // ======================

        BookingHeader booking = new BookingHeader();

        booking.setBookingDate(LocalDate.now());
        booking.setCustomer(customer);
        booking.setTour(tour);
        booking.setDepartureDate(departure);

        // TEMP DEFAULT VALUES (VERY IMPORTANT)
        booking.setTourAmount(BigDecimal.ZERO);
        booking.setTaxAmount(BigDecimal.ZERO);
        booking.setTotalAmount(BigDecimal.ZERO);
        booking.setTotalPassengers(0);

        // SAVE HEADER FIRST (to get booking_id)
        booking = bookingRepository.save(booking);

        // DELETE OLD PASSENGERS (Safety)
        passengerRepository.deletePassengersByBookingId(booking.getId());

        // ======================
        // PASSENGER CALCULATION
        // ======================

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (PassengerDTO p : dto.getPassengers()) {

            int age = calculateAge(p.getDateOfBirth(), departure.getDepartureDate());

            String passengerType = getPassengerType(age);

            BigDecimal passengerAmount =
                    calculatePassengerPrice(passengerType, cost);

            PassengerMaster passenger = new PassengerMaster();

            passenger.setBooking(booking);
            passenger.setPassengerName(p.getPassengerName());
            passenger.setDateOfBirth(p.getDateOfBirth());
            passenger.setPassengerType(passengerType);
            passenger.setPassengerAmount(passengerAmount);

            passengerRepository.save(passenger);

            totalAmount = totalAmount.add(passengerAmount);
        }

        // ======================
        // FINAL BILL UPDATE
        // ======================

        BigDecimal tax = totalAmount.multiply(new BigDecimal("0.05"));

        booking.setTotalPassengers(dto.getPassengers().size());
        booking.setTourAmount(totalAmount);
        booking.setTaxAmount(tax);
        booking.setTotalAmount(totalAmount.add(tax));

        return bookingRepository.save(booking);
    }

    // =================================================
    // GET BOOKING WITH PASSENGERS
    // =================================================

    @Override
    public BookingResponseDTO getBookingById(Integer id) {

        BookingHeader booking =
                bookingRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        List<PassengerMaster> passengers =
                passengerRepository.getPassengersByBookingId(id);

        List<PassengerResponseDTO> paxResponseList = new ArrayList<>();

        for (PassengerMaster p : passengers) {

            PassengerResponseDTO dto = new PassengerResponseDTO();

            dto.setPassengerName(p.getPassengerName());
            dto.setPassengerType(p.getPassengerType());
            dto.setPassengerAmount(p.getPassengerAmount());

            paxResponseList.add(dto);
        }

        BookingResponseDTO response = new BookingResponseDTO();

        response.setBookingId(booking.getId());
        response.setBookingDate(booking.getBookingDate());
        response.setTotalPassengers(booking.getTotalPassengers());
        response.setTourAmount(booking.getTourAmount());
        response.setTaxAmount(booking.getTaxAmount());
        response.setTotalAmount(booking.getTotalAmount());
        response.setPassengers(paxResponseList);

        return response;
    }

    // =================================================
    // GET CUSTOMER BOOKINGS ID
    // =================================================

    @Override
    public List<BookingHeader> getBookings(Integer customerId) {

        return bookingRepository.getBookingsByCustomerId(customerId);
    }

    
    // =================================================
    // GET CUSTOMER ALL BOOKINGS 
    // =================================================

    @Override
    public List<BookingHeader> getAllBookings() {

        return bookingRepository.findAll();
    }


    // =================================================
    // CANCEL BOOKING
    // =================================================

    @Override
    public void cancelBooking(Integer bookingId) {

        passengerRepository.deletePassengersByBookingId(bookingId);

        BookingHeader booking =
                bookingRepository.findById(bookingId)
                        .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        bookingRepository.delete(booking);
    }

    // =================================================
    // AGE CALCULATION
    // =================================================

    private int calculateAge(LocalDate dob, LocalDate departureDate) {

        return Period.between(dob, departureDate).getYears();
    }

    // =================================================
    // PASSENGER TYPE
    // =================================================

    private String getPassengerType(int age) {

        if (age >= 12) {
            return "Adult";
        }
        else if (age >= 5) {
            return "Child-Without-Bed";
        }
        else {
            return "Infant";
        }
    }

    // =================================================
    // PRICE ENGINE (MATCHING YOUR CostMaster)
    // =================================================

    private BigDecimal calculatePassengerPrice(String type, CostMaster cost) {

        if ("Adult".equals(type)) {
            return cost.getBaseCost();
        }

        if ("Child-Without-Bed".equals(type)) {
            return cost.getChildWithoutBedCost();
        }

        if ("Infant".equals(type)) {
            return BigDecimal.ZERO;
        }

        return BigDecimal.ZERO;
    }
}
