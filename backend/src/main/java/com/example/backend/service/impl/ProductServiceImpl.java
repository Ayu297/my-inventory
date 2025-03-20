package com.example.backend.service.impl;


import com.example.backend.model.dto.request.CreateProductRequest;
import com.example.backend.model.dto.request.PagingRequest;
import com.example.backend.model.dto.request.SearchProductRequest;
import com.example.backend.model.dto.request.UpdateProductRequest;
import com.example.backend.model.dto.response.ProductResponse;
import com.example.backend.model.entity.Category;
import com.example.backend.model.entity.Image;
import com.example.backend.model.entity.Product;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.service.CategoryService;
import com.example.backend.service.ImageService;
import com.example.backend.service.ProductService;
import com.example.backend.utils.parsing.ToResponse;
import com.example.backend.utils.spesification.ProductSpesification;
import com.example.backend.utils.validation.Validation;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryService categoryService;
    private final ImageService imageService;
    private final Validation validation;

    @Override
    public Page<ProductResponse> getAll(PagingRequest pagingRequest) {
        if (pagingRequest.getPage() <= 0) {
            pagingRequest.setPage(1);
        }
        Sort sort = Sort.by(Sort.Direction.fromString(pagingRequest.getDirection()), pagingRequest.getSortBy());
        Pageable pageable = PageRequest.of(pagingRequest.getPage()-1, pagingRequest.getSize(), sort);
        List<Product> products = productRepository.findAll();
        List<ProductResponse> productResponses = products.stream().map(ToResponse::parseProduct).toList();
        final int start = (int) pageable.getOffset();
        final int end = Math.min(start + pageable.getPageSize(), productResponses.size());
        return new PageImpl<>(productResponses.subList(start, end), pageable, productResponses.size());
    }

    @Transactional(readOnly = true)
    @Override
    public Page<ProductResponse> getBySearch(PagingRequest pagingRequest, SearchProductRequest request) {
        if (pagingRequest.getPage() <= 0) {
            pagingRequest.setPage(1);
        }
        Sort sort = Sort.by(Sort.Direction.fromString(pagingRequest.getDirection()), pagingRequest.getSortBy());
        Pageable pageable = PageRequest.of(pagingRequest.getPage()-1, pagingRequest.getSize(), sort);
        Specification<Product> specification = ProductSpesification.getSpecification(request);
        List<Product> products = productRepository.findAll(specification);
        List<ProductResponse> productResponses = products.stream().map(ToResponse::parseProduct).toList();
        final int start = (int) pageable.getOffset();
        final int end = Math.min(start + pageable.getPageSize(), productResponses.size());
        return new PageImpl<>(productResponses.subList(start, end), pageable, productResponses.size());
    }

    @Override
    public Page<ProductResponse> getByCategory(PagingRequest pagingRequest, Integer categoryId) {
        if (pagingRequest.getPage() <= 0) {
            pagingRequest.setPage(1);
        }
        Sort sort = Sort.by(Sort.Direction.fromString(pagingRequest.getDirection()), pagingRequest.getSortBy());
        Pageable pageable = PageRequest.of(pagingRequest.getPage()-1, pagingRequest.getSize(), sort);
        List<Product> products = productRepository.findAllByCategoryId(categoryId);
        List<ProductResponse> productResponses = products.stream().map(ToResponse::parseProduct).toList();
        final int start = (int) pageable.getOffset();
        final int end = Math.min(start + pageable.getPageSize(), productResponses.size());
        return new PageImpl<>(productResponses.subList(start, end), pageable, productResponses.size());

    }

    @Transactional(readOnly = true)
    @Override
    public ProductResponse getResponseById(Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            return ToResponse.parseProduct(product);
        }
        return null;
    }

    @Transactional(readOnly = true)
    @Override
    public Product getById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }


    @Transactional(readOnly = true)
    @Override
    public ProductResponse create(CreateProductRequest request) {
        validation.validate(request);
        if (request.getProductImage().isEmpty()) {
            throw new ConstraintViolationException("image is required", null);
        }
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Image image = imageService.create(request.getProductImage());

        Product product = Product.builder()
                .productName(request.getProductName())
                .productCode(request.getProductCode())
                .category(category) // Set category yang sudah diambil dari DB
                .productImage((Image) request.getProductImage()) // Simpan sebagai Image entity
                .registerDate(request.getRegisterDate())
                .build();
        productRepository.saveAndFlush(product);
        return ToResponse.parseProduct(product);
    }

    @Transactional
    @Override
    public ProductResponse update(UpdateProductRequest request) {

        validation.validate(request);
        Product product = getById(request.getId());
        if (request.getImage() != null) {
            String oldImageId = product.getProductImage().getId();
            Image newImage = imageService.create(request.getImage());
            product.setProductImage(newImage);
            imageService.deleteById(oldImageId);
        }

        product.setProductName(request.getName());

        product.setProductName(request.getName());

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        // Update kode produk (jika perlu)
        if (request.getProductCode() != null) {
            product.setProductCode(request.getProductCode());
        }

        // Update tanggal update
        product.setRegisterDate(new Date());

        // Simpan perubahan
        productRepository.save(product);

        // Return response
        return ToResponse.parseProduct(product);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void delete(Integer id) {
        String imgId = getById(id).getProductImage().getId();
        productRepository.deleteById(id);
        imageService.deleteById(imgId);
    }
}
