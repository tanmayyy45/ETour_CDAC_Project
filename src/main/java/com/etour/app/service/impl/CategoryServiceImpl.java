package com.etour.app.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etour.app.entity.CategoryMaster;
import com.etour.app.repository.CategoryRepository;
import com.etour.app.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public List<CategoryMaster> getMainCategories() {
		return categoryRepository.findAllBySubcategoryIdIsNull();
	}

	@Override
	public Object handleCategoryClick(String categoryId) {
		CategoryMaster category = categoryRepository
				.findByCategoryId(categoryId)
				.orElseThrow(() -> new RuntimeException("Category not found"));
		
		
		boolean hasChildren = categoryRepository.existsBySubcategoryId(category.getCategoryId());
		
		// Checking if flag is true
		boolean flag = Boolean.TRUE.equals(category.getFlag());
		
		
		// Category has Subcategories but flag = 1
		if(hasChildren && flag)
		{
			throw new IllegalStateException("Invalid DB state: non-leaf category with flag = 1 : " + category.getCategoryId());
		}
		
		
		if(hasChildren)
		{
			return categoryRepository.findAllBySubcategoryId(category.getCategoryId());
		}
		
		
		if(flag)
		{
			return category;
		}
		
		throw new IllegalStateException("Invalid DB state: leaf category with flag = 0 : " + category.getCategoryId());

	}

}
