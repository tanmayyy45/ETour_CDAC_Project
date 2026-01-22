package com.etour.app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.etour.app.entity.Payment;
import com.etour.app.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    @GetMapping("/{id}")
    public Payment getPayment(@PathVariable Integer id) {
        return paymentService.getPaymentById(id);
    }

    @GetMapping("/booking/{bookingId}")
    public List<Payment> getByBooking(@PathVariable Integer bookingId) {
        return paymentService.getPaymentsByBooking(bookingId);
    }

    @PutMapping("/{id}/status/{status}")
    public Payment updateStatus(@PathVariable Integer id,
                                @PathVariable String status) {
        return paymentService.updatePaymentStatus(id, status);
    }
    
    @GetMapping("/transaction/{txn}")
    public Payment getByTransaction(@PathVariable String txn) {
        return paymentService.getPaymentByTransactionId(txn);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        paymentService.deletePayment(id);
        return "Payment deleted successfully";
    }
}

