package com.etour.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.etour.app.dto.TourDTO;
import com.etour.app.service.TourService;

/**
 * Alias endpoint to support frontend calls like /details/{catmasterId}.
 * Internally delegates to TourService.
 */
@RestController
public class DetailsController {
	@Autowired
	private TourService tourService;

	@GetMapping("/details/{catmasterId}")
	public ResponseEntity<TourDTO> getDetails(@PathVariable int catmasterId) {
		TourDTO tourDetails = tourService.getTourDetailsByCategoryId(catmasterId);
		return (tourDetails != null) ? ResponseEntity.ok(tourDetails) : ResponseEntity.notFound().build();
	}
}
