package com.etour.app.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.etour.app.dto.PaymentDTO;
import com.etour.app.entity.BookingHeader;
import com.etour.app.entity.Payment;
import com.etour.app.repository.BookingHeaderRepository;
import com.etour.app.repository.PaymentRepository;
import com.etour.app.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepo;
    private final BookingHeaderRepository bookingRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepo,
                              BookingHeaderRepository bookingRepo) {
        this.paymentRepo = paymentRepo;
        this.bookingRepository = bookingRepo;
    }

    @Override
    public PaymentDTO addPayment(PaymentDTO dto) {

        if (dto.getBookingId() == null) {
            throw new RuntimeException("Booking ID is required");
        }

        BookingHeader booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment p = new Payment();
        p.setBooking(booking);
        p.setTransactionId(dto.getTransactionId());
        p.setPaymentMode(dto.getPaymentMode());
        p.setPaymentStatus(dto.getPaymentStatus());
        p.setPaidAmount(dto.getPaidAmount());

        Payment saved = paymentRepo.save(p);

        dto.setId(saved.getId());
        dto.setPaymentDate(saved.getPaymentDate());

        return dto;
    }

    @Override
    public PaymentDTO getPaymentById(Integer id) {
        return toDTO(paymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found")));
    }

    @Override
    public List<PaymentDTO> getPaymentsByBooking(Integer bookingId) {
        return paymentRepo.findByBookingId(bookingId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public PaymentDTO updatePaymentStatus(Integer id, String status) {
        Payment p = paymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        p.setPaymentStatus(status);
        return toDTO(paymentRepo.save(p));
    }

    @Override
    public PaymentDTO getPaymentByTransactionId(String transactionId) {
        return toDTO(paymentRepo.findByTransactionId(transactionId));
    }

    @Override
    public void deletePayment(Integer id) {
        if (!paymentRepo.existsById(id))
            throw new RuntimeException("Payment not found");
        paymentRepo.deleteById(id);
    }

    // ---------- conversion ----------
    private PaymentDTO toDTO(Payment p) {
        PaymentDTO dto = new PaymentDTO();
        dto.setId(p.getId());
        dto.setBookingId(p.getBooking().getId());
        dto.setTransactionId(p.getTransactionId());
        dto.setPaymentMode(p.getPaymentMode());
        dto.setPaymentStatus(p.getPaymentStatus());
        dto.setPaidAmount(p.getPaidAmount());
        dto.setPaymentDate(p.getPaymentDate());
        return dto;
    }
}


