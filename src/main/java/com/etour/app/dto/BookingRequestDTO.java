package com.etour.app.dto;

import java.util.List;

public class BookingRequestDTO {

    private Integer customerId;
    private Integer tourId;
    private Integer departureDateId;

    // Primary Passenger Info
    private String primaryName;
    private String primaryAddress;
    private String primaryContact;
    private String primaryEmail;

    private List<PassengerDTO> passengers;

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public Integer getTourId() {
		return tourId;
	}

	public void setTourId(Integer tourId) {
		this.tourId = tourId;
	}

	public Integer getDepartureDateId() {
		return departureDateId;
	}

	public void setDepartureDateId(Integer departureDateId) {
		this.departureDateId = departureDateId;
	}

	public String getPrimaryName() {
		return primaryName;
	}

	public void setPrimaryName(String primaryName) {
		this.primaryName = primaryName;
	}

	public String getPrimaryAddress() {
		return primaryAddress;
	}

	public void setPrimaryAddress(String primaryAddress) {
		this.primaryAddress = primaryAddress;
	}

	public String getPrimaryContact() {
		return primaryContact;
	}

	public void setPrimaryContact(String primaryContact) {
		this.primaryContact = primaryContact;
	}

	public String getPrimaryEmail() {
		return primaryEmail;
	}

	public void setPrimaryEmail(String primaryEmail) {
		this.primaryEmail = primaryEmail;
	}

	public List<PassengerDTO> getPassengers() {
		return passengers;
	}

	public void setPassengers(List<PassengerDTO> passengers) {
		this.passengers = passengers;
	}

    // getters setters
}
