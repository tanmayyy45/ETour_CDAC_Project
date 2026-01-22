package com.etour.app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.etour.app.entity.DepartureDateMaster;
import com.etour.app.entity.ItineraryMaster;

public class TourDTO 
{
	public BigDecimal getBaseCost() {
		return baseCost;
	}
	public void setBaseCost(BigDecimal baseCost) {
		this.baseCost = baseCost;
	}
	public BigDecimal getChildWithBedCost() {
		return childWithBedCost;
	}
	public void setChildWithBedCost(BigDecimal childWithBedCost) {
		this.childWithBedCost = childWithBedCost;
	}
	public BigDecimal getChildWithoutBedCost() {
		return childWithoutBedCost;
	}
	public void setChildWithoutBedCost(BigDecimal childWithoutBedCost) {
		this.childWithoutBedCost = childWithoutBedCost;
	}
	public List<DepartureDateMaster> getAvailableDates() {
		return availableDates;
	}
	public void setAvailableDates(List<DepartureDateMaster> availableDates) {
		this.availableDates = availableDates;
	}
	public List<ItineraryMaster> getItinerary() {
		return itinerary;
	}
	public void setItinerary(List<ItineraryMaster> itinerary) {
		this.itinerary = itinerary;
	}
	 private  BigDecimal baseCost;
     private  BigDecimal childWithBedCost;
     private  BigDecimal childWithoutBedCost;
     private List<DepartureDateMaster> availableDates;
     private List<ItineraryMaster>itinerary;
	

   
}
