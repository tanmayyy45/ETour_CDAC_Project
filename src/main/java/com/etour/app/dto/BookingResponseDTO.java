package com.etour.app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class BookingResponseDTO {

    private Integer bookingId;
    private LocalDate bookingDate;
    private Integer totalPassengers;

    private BigDecimal tourAmount;
    private BigDecimal taxAmount;
    private BigDecimal totalAmount;

    private List<PassengerResponseDTO> passengers;

    // getters setters

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Integer getTotalPassengers() {
        return totalPassengers;
    }

    public void setTotalPassengers(Integer totalPassengers) {
        this.totalPassengers = totalPassengers;
    }

    public BigDecimal getTourAmount() {
        return tourAmount;
    }

    public void setTourAmount(BigDecimal tourAmount) {
        this.tourAmount = tourAmount;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<PassengerResponseDTO> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<PassengerResponseDTO> passengers) {
        this.passengers = passengers;
    }
}
