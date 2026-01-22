package com.etour.app.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.etour.app.entity.Payment;
import com.etour.app.repository.PaymentRepository;
import com.etour.app.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentById(Integer id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public List<Payment> getPaymentsByBooking(Integer bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }

    @Override
    public Payment updatePaymentStatus(Integer id, String status) {
        Payment p = getPaymentById(id);
        p.setPaymentStatus(status);
        return paymentRepository.save(p);
    }
    
    @Override
    public Payment getPaymentByTransactionId(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId);
    }

    @Override
    public void deletePayment(Integer id) {
        paymentRepository.deleteById(id);
    }
}

