package com.etour.app.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.etour.app.dto.SearchResultDTO;
import com.etour.app.dto.TourDTO;
import com.etour.app.entity.TourMaster;

public interface TourService 
{
    List<TourMaster> getAllTours();
    TourMaster getTourById(int id);
    TourMaster addTour(TourMaster tourMaster);
    void deleteTour(int id);
    TourDTO getTourDetailsByCatmasterId(int catmasterId);
    public List<SearchResultDTO> searchToursByDate(LocalDate from, LocalDate to);


    public List<SearchResultDTO> searchToursByDuration(Integer min, Integer max);

    public List<SearchResultDTO> searchToursByCost(BigDecimal min, BigDecimal max) ;
}
