package com.example.backend.service;



import com.example.backend.model.dto.request.CreateCategoryRequest;
import com.example.backend.model.dto.request.UpdateCategoryRequest;
import com.example.backend.model.dto.response.CategoryResponse;
import com.example.backend.model.entity.Category;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAll();
    Category getById(Integer id);
    CategoryResponse getResponseById(Integer id);
    CategoryResponse create(CreateCategoryRequest request);
    CategoryResponse update(UpdateCategoryRequest request);
    void delete(Integer id);
}
