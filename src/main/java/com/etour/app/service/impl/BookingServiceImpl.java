package com.etour.app.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etour.app.dto.BookingRequestDTO;
import com.etour.app.dto.PassengerDTO;
import com.etour.app.entity.*;
import com.etour.app.repository.*;
import com.etour.app.service.BookingService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingHeaderRepository bookingRepo;

    @Autowired
    private PassengerRepository passengerRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private TourRepository tourRepo;

    @Autowired
    private DepartureDateRepository departureRepo;

    @Autowired
    private CostRepository costRepo;

    // =================================================
    // 1️⃣ CREATE BOOKING
    // =================================================

    @Override
    public BookingHeader createBooking(BookingRequestDTO dto) {

        // ---------------- FETCH MASTER DATA ----------------

        CustomerMaster customer =
                customerRepo.findById(dto.getCustomerId()).get();

        TourMaster tour =
                tourRepo.findById(dto.getTourId()).get();

        DepartureDateMaster departure =
                departureRepo.findById(dto.getDepartureDateId()).get();

        // ---------------- FETCH COST ----------------

        List<CostMaster> costList = costRepo.findAll();
        CostMaster cost = null;

        for (CostMaster c : costList) {

            if (c.getCatmaster().getId()
                    .equals(tour.getCatmaster().getId())) {

                cost = c;
                break;
            }
        }

        if (cost == null) {
            throw new RuntimeException("Cost not configured for this tour");
        }

        int totalPassengers = dto.getPassengers().size();

        // ---------------- ROOM PRICE CALCULATION ----------------

        BigDecimal tourAmount =
                calculateRoomAmount(
                        totalPassengers,
                        dto.getRoomPreference(),
                        cost);

        BigDecimal taxAmount =
                tourAmount.multiply(new BigDecimal("0.05"));

        BigDecimal totalAmount =
                tourAmount.add(taxAmount);

        // ---------------- SAVE BOOKING HEADER ----------------

        BookingHeader booking = new BookingHeader();

        booking.setBookingDate(LocalDate.now());
        booking.setCustomer(customer);
        booking.setTour(tour);
        booking.setDepartureDate(departure);

        booking.setTotalPassengers(totalPassengers);
        booking.setTourAmount(tourAmount);
        booking.setTaxAmount(taxAmount);
        booking.setTotalAmount(totalAmount);

        BookingHeader savedBooking =
                bookingRepo.save(booking);

        // ---------------- SAVE PASSENGERS ----------------

        // FIXED BigDecimal Division (NO ERROR NOW)
        BigDecimal perPassengerAmount =
                tourAmount.divide(
                        new BigDecimal(totalPassengers),
                        2,
                        RoundingMode.HALF_UP);

        for (PassengerDTO p : dto.getPassengers()) {

            PassengerMaster passenger = new PassengerMaster();

            passenger.setBooking(savedBooking);
            passenger.setPassengerName(p.getPassengerName());
            passenger.setDateOfBirth(p.getDateOfBirth());

            passenger.setPassengerType("ADULT");
            passenger.setPassengerAmount(perPassengerAmount);

            passengerRepo.save(passenger);
        }

        return savedBooking;
    }

    // =================================================
    // ROOM ALLOCATION LOGIC
    // =================================================

    private BigDecimal calculateRoomAmount(
            int paxCount,
            String preference,
            CostMaster cost) {

        BigDecimal totalAmount = BigDecimal.ZERO;

        // ---------------- EVEN PASSENGERS ----------------
        // ONLY TWIN SHARING

        if (paxCount % 2 == 0) {

            int twinRooms = paxCount / 2;

            totalAmount =
                    cost.getBaseCost()
                            .multiply(new BigDecimal(twinRooms));

            return totalAmount;
        }

        // ---------------- ODD PASSENGERS ----------------

        else {

            // OPTION 1 → 1 SINGLE + REMAINING TWIN

            if (preference.equalsIgnoreCase("AUTO")
                    || preference.equalsIgnoreCase("ODD_SINGLE_TWIN")) {

                int remaining = paxCount - 1;
                int twinRooms = remaining / 2;

                BigDecimal twinAmount =
                        cost.getBaseCost()
                                .multiply(new BigDecimal(twinRooms));

                BigDecimal singleAmount =
                        cost.getSinglePersonCost();

                totalAmount =
                        twinAmount.add(singleAmount);

                return totalAmount;
            }

            // OPTION 2 → ALL TWIN (RANDOM ADJUSTMENT)

            if (preference.equalsIgnoreCase("ALL_TWIN_RANDOM")) {

                int twinRooms =
                        (paxCount + 1) / 2;

                totalAmount =
                        cost.getBaseCost()
                                .multiply(new BigDecimal(twinRooms));

                return totalAmount;
            }

            throw new RuntimeException("Invalid Room Preference");
        }
    }

    // =================================================
    // 2️⃣ GET BOOKINGS BY CUSTOMER
    // =================================================

    @Override
    public List<BookingHeader> getBookingsByCustomer(Integer customerId) {

        return bookingRepo.getBookingsByCustomerId(customerId);
    }

    // =================================================
    // 3️⃣ GET BOOKING BY ID
    // =================================================

    @Override
    public BookingHeader getBookingById(Integer bookingId) {

        return bookingRepo.findById(bookingId).get();
    }

    // =================================================
    // 4️⃣ GET ALL BOOKINGS (ADMIN)
    // =================================================

    @Override
    public List<BookingHeader> getAllBookings() {

        return bookingRepo.findAll();
    }

    // =================================================
    // 5️⃣ CANCEL BOOKING
    // =================================================

    @Override
    public void cancelBooking(Integer bookingId) {

        bookingRepo.deleteById(bookingId);
    }
}
