package com.etour.app.service;

import com.etour.app.entity.CostMaster;
import com.etour.app.repository.CostRepository;

import com.etour.app.service.impl.CostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CostServiceImpl implements CostService {
	@Autowired
    private CostRepository costRepository;

	@Override
	public List<CostMaster> getAllCosts() {
		// TODO Auto-generated method stub
		return costRepository.findAll();
	}

	@Override
	public Optional<CostMaster> getCostById(int id) {
		// TODO Auto-generated method stub
		return costRepository.findById(id);
	}

	@Override
	public void deleteCost(int id) {
		// TODO Auto-generated method stub
		costRepository.deleteById(id);
		
	}

		
	
	
   
    }
