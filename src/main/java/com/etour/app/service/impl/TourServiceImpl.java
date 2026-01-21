package com.etour.app.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.etour.app.entity.TourMaster;
import com.etour.app.repository.TourRepository;
import com.etour.app.service.TourService;

@Service
@Component
public class TourServiceImpl implements TourService
{
	@Autowired
	private  TourRepository tourRepository;

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

}
