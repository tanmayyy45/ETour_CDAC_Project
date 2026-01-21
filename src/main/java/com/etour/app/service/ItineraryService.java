package com.etour.app.service;

import java.util.List;

import com.etour.app.entity.ItineraryMaster;

public interface ItineraryService {

    ItineraryMaster saveItinerary(ItineraryMaster itinerary);

    List<ItineraryMaster> getAllItineraries();

   

    ItineraryMaster getItineraryById(Integer id);
}
