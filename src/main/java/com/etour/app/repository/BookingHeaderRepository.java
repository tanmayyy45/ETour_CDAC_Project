package com.etour.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etour.app.entity.BookingHeader;

public interface BookingHeaderRepository 
extends JpaRepository<BookingHeader, Integer> {
}

