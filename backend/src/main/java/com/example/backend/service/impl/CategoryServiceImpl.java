package com.example.backend.service.impl;


import com.example.backend.model.dto.request.CreateCategoryRequest;
import com.example.backend.model.dto.request.UpdateCategoryRequest;
import com.example.backend.model.dto.response.CategoryResponse;
import com.example.backend.model.entity.Category;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.service.CategoryService;
import com.example.backend.utils.parsing.ToResponse;
import com.example.backend.utils.validation.Validation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final Validation validation;

    @Transactional(readOnly = true)
    @Override
    public List<CategoryResponse> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(ToResponse::parseCategory).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public Category getById(Integer id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    @Override
    public CategoryResponse getResponseById(Integer id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            return ToResponse.parseCategory(category);
        }
        return null;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public CategoryResponse create(CreateCategoryRequest request) {
        validation.validate(request);
        Category category = Category.builder()
                .categoryName(request.getCatName())
                .build();
        categoryRepository.saveAndFlush(category);
        return ToResponse.parseCategory(category);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public CategoryResponse update(UpdateCategoryRequest request) {
        validation.validate(request);
        Category category = getById(request.getId());
        category.setCategoryName(request.getCatName());
        return ToResponse.parseCategory(category);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void delete(Integer id) {
        categoryRepository.deleteById(id);
    }
}
