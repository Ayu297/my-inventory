package com.example.backend.service;


import com.example.backend.model.dto.request.CreateProductRequest;
import com.example.backend.model.dto.request.PagingRequest;
import com.example.backend.model.dto.request.SearchProductRequest;
import com.example.backend.model.dto.request.UpdateProductRequest;
import com.example.backend.model.dto.response.ProductResponse;
import com.example.backend.model.entity.Product;
import org.springframework.data.domain.Page;

public interface ProductService  {

    Page<ProductResponse> getAll(PagingRequest pagingRequest);
    Page<ProductResponse> getBySearch(PagingRequest pagingRequest, SearchProductRequest request);
    Page<ProductResponse> getByCategory(PagingRequest pagingRequest, Integer categoryId);
    ProductResponse getResponseById(Integer id);
    Product getById(Integer id);
    ProductResponse create(CreateProductRequest request);
    ProductResponse update(UpdateProductRequest request);
    void delete(Integer id);
}
