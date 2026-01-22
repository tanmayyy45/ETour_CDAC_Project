package com.etour.app.service.impl;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.etour.app.dto.TourDTO;
import com.etour.app.entity.CostMaster;
import com.etour.app.entity.DepartureDateMaster;
import com.etour.app.entity.ItineraryMaster;
import com.etour.app.entity.TourMaster;
import com.etour.app.repository.CostRepository;
import com.etour.app.repository.DepartureDateRepository;
import com.etour.app.repository.ItinerarryRepository;
import com.etour.app.repository.TourRepository;
import com.etour.app.service.TourService;

@Service
@Component
public class TourServiceImpl implements TourService
{
	@Autowired
	private  TourRepository tourRepository;
	
	@Autowired
    private CostRepository costRepository;

    @Autowired
    private ItinerarryRepository itineraryRepository;

    @Autowired
    private DepartureDateRepository departureDateRepository;


	@Override
	public List<TourMaster> getAllTours() 
	{
		return tourRepository.findAll();
		
	}

	@Override
	public TourMaster getTourById(int id) 
	{
		
		return tourRepository.findById(id).orElse(null);
	}

	@Override
	public TourMaster addTour(TourMaster tourMaster) 
	{
		
		return tourRepository.save(tourMaster);
	}

	@Override
	public void deleteTour(int id) 
	{

          tourRepository.deleteById(id);
		
	}
	
	
	
    public TourDTO getTourDetailsByCategoryId(int catmasterId) {
        TourDTO dto = new TourDTO();

        
        List<CostMaster> costs = costRepository.findByCatmasterId(catmasterId);
        
        if (!costs.isEmpty()) {
            CostMaster cost = costs.get(0); 
            dto.setBaseCost(cost.getBaseCost());
            dto.setChildWithBedCost(cost.getChildWithBedCost());
            dto.setChildWithoutBedCost(cost.getChildWithoutBedCost());
        } else {
            dto.setBaseCost(BigDecimal.ZERO);
            dto.setChildWithBedCost(BigDecimal.ZERO);
            dto.setChildWithoutBedCost(BigDecimal.ZERO);
        }

        List<DepartureDateMaster> dates = departureDateRepository.findByCatmasterId(catmasterId);
        dto.setAvailableDates(dates);

        List<ItineraryMaster> itinerary = itineraryRepository.findByCatmasterIdOrderByDayNumberAsc(catmasterId);
        dto.setItinerary(itinerary);

        return dto;
    }


}
