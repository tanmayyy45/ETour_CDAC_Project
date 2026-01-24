package com.etour.app.service.impl;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etour.app.dto.CostDTO;
import com.etour.app.dto.DepartureDateDTO;
import com.etour.app.dto.ItineraryDTO;
import com.etour.app.dto.TourDTO;
import com.etour.app.entity.CategoryMaster;
import com.etour.app.entity.CostMaster;
import com.etour.app.entity.DepartureDateMaster;
import com.etour.app.entity.ItineraryMaster;
import com.etour.app.entity.TourMaster;
import com.etour.app.repository.CategoryRepository;
import com.etour.app.repository.CostRepository;
import com.etour.app.repository.DepartureDateRepository;
import com.etour.app.repository.ItinerarryRepository;
import com.etour.app.repository.TourRepository;
import com.etour.app.service.TourService;

@Service
public class TourServiceImpl implements TourService
{
	@Autowired
	private  TourRepository tourRepository;

	@Autowired
	private CategoryRepository categoryRepository;
	
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
	
	
	
	@Override
    public TourDTO getTourDetailsByCategoryId(int catmasterId) {
        TourDTO dto = new TourDTO();
        dto.setCatmasterId(catmasterId);

        // tour name
        categoryRepository.findById(catmasterId).map(CategoryMaster::getName).ifPresent(dto::setTourName);

        // description (if present in tour_master)
        tourRepository.findFirstByCatmaster_Id(catmasterId).map(TourMaster::getDescription).ifPresent(dto::setDescription);

        
        List<CostMaster> costs = costRepository.findByCatmaster_Id(catmasterId);
        
        // overview base cost (take first cost row if exists)
        dto.setBaseCost(costs.isEmpty() ? BigDecimal.ZERO : costs.get(0).getBaseCost());

        // full costs list (for cost tab)
        List<CostDTO> costDtos = new ArrayList<>();
        for (CostMaster c : costs) {
        	CostDTO cDto = new CostDTO();
        	cDto.setBaseCost(c.getBaseCost());
        	cDto.setSinglePersonCost(c.getSinglePersonCost());
        	cDto.setExtraPersonCost(c.getExtraPersonCost());
        	cDto.setChildWithBedCost(c.getChildWithBedCost());
        	cDto.setChildWithoutBedCost(c.getChildWithoutBedCost());
        	cDto.setValidFromDate(c.getValidFromDate());
        	cDto.setValidToDate(c.getValidToDate());
        	costDtos.add(cDto);
        }
        dto.setCosts(costDtos);

        List<DepartureDateMaster> dates = departureDateRepository.findByCatmaster_Id(catmasterId);
        List<DepartureDateDTO> dateDtos = new ArrayList<>();
        for (DepartureDateMaster d : dates) {
        	DepartureDateDTO dDto = new DepartureDateDTO();
        	dDto.setId(d.getId());
        	dDto.setDepartureDate(d.getDepartureDate());
        	dDto.setEndDate(d.getEndDate());
        	dDto.setNumberOfDays(d.getNumberOfDays());
        	dateDtos.add(dDto);
        }
        dto.setAvailableDates(dateDtos);

        // overview number of days (from first available date if present)
        if (!dateDtos.isEmpty()) {
        	dto.setNumberOfDays(dateDtos.get(0).getNumberOfDays());
        }

        List<ItineraryMaster> itinerary = itineraryRepository.findByCatmaster_IdOrderByDayNumberAsc(catmasterId);
        List<ItineraryDTO> itinDtos = new ArrayList<>();
        for (ItineraryMaster i : itinerary) {
        	ItineraryDTO iDto = new ItineraryDTO();
        	iDto.setDayNumber(i.getDayNumber());
        	iDto.setItineraryDetails(i.getItineraryDetails());
        	itinDtos.add(iDto);
        }
        dto.setItinerary(itinDtos);

        return dto;
    }


}
