package com.etour.app.service;

import java.util.List;

import com.etour.app.entity.Payment;

public interface PaymentService {

    Payment addPayment(Payment payment);

    Payment getPaymentById(Integer id);

    List<Payment> getPaymentsByBooking(Integer bookingId);

    Payment updatePaymentStatus(Integer id, String status);
    
    Payment getPaymentByTransactionId(String transactionId);

    void deletePayment(Integer id);
}

