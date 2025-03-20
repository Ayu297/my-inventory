package com.example.backend.controller;


import com.example.backend.model.dto.request.CreateProductRequest;
import com.example.backend.model.dto.request.PagingRequest;
import com.example.backend.model.dto.request.SearchProductRequest;
import com.example.backend.model.dto.request.UpdateProductRequest;
import com.example.backend.model.dto.response.CommonResponse;
import com.example.backend.model.dto.response.PagingResponse;
import com.example.backend.model.dto.response.ProductResponse;
import com.example.backend.service.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.example.backend.model.constant.ApiUrl.*;


@RequiredArgsConstructor
@RestController
@RequestMapping(PRODUCT_URL)
public class ProductController {
    private final ProductService productService;
    private final ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<CommonResponse<List<ProductResponse>>> getProducts(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "size", defaultValue = "24") Integer size,
            @RequestParam(name = "sortBy", defaultValue = "updatedAt") String sortBy,
            @RequestParam(name = "direction", defaultValue = "desc") String direction
    ) {
        PagingRequest pagingRequest = PagingRequest.builder()
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .direction(direction)
                .build();
        Page<ProductResponse> products = productService.getAll(pagingRequest);
        PagingResponse pagingResponse = PagingResponse.builder()
                .totalPages(products.getTotalPages())
                .totalElements(products.getTotalElements())
                .page(products.getPageable().getPageNumber()+1)
                .size(products.getPageable().getPageSize())
                .hasNext(products.hasNext())
                .hasPrevious(products.hasPrevious())
                .build();
        CommonResponse<List<ProductResponse>> response = CommonResponse.<List<ProductResponse>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(products.getContent())
                .paging(pagingResponse)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping(SEARCH_PATH)
    public ResponseEntity<CommonResponse<List<ProductResponse>>> searchProducts(
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "size", defaultValue = "24") Integer size,
            @RequestParam(name = "sortBy", defaultValue = "updatedAt") String sortBy,
            @RequestParam(name = "direction", defaultValue = "desc") String direction,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "type", required = false) String type
    ) {
        SearchProductRequest request = SearchProductRequest.builder()
                .name(name)
                .category(category)
                .build();
        PagingRequest pagingRequest = PagingRequest.builder()
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .direction(direction)
                .build();
        Page<ProductResponse> products = productService.getBySearch(pagingRequest, request);
        PagingResponse pagingResponse = PagingResponse.builder()
                .totalPages(products.getTotalPages())
                .totalElements(products.getTotalElements())
                .page(products.getPageable().getPageNumber() + 1)
                .size(products.getPageable().getPageSize())
                .hasNext(products.hasNext())
                .hasPrevious(products.hasPrevious())
                .build();
        CommonResponse<List<ProductResponse>> response = CommonResponse.<List<ProductResponse>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(products.getContent())
                .paging(pagingResponse)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping(ID_PATH)
    public ResponseEntity<CommonResponse<ProductResponse>> getProductById(@PathVariable("id") Integer id) {
        ProductResponse product = productService.getResponseById(id);
        CommonResponse<ProductResponse> response = CommonResponse.<ProductResponse>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(product)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<CommonResponse<List<ProductResponse>>> getProductsByArtist(
            @PathVariable("id") Integer id,
            @RequestParam(name = "page", defaultValue = "1") Integer page,
            @RequestParam(name = "size", defaultValue = "24") Integer size,
            @RequestParam(name = "sortBy", defaultValue = "updatedAt") String sortBy,
            @RequestParam(name = "direction", defaultValue = "desc") String direction
    ) {
        PagingRequest pagingRequest = PagingRequest.builder()
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .direction(direction)
                .build();
        Page<ProductResponse> products = productService.getByCategory(pagingRequest, id);
        PagingResponse pagingResponse = PagingResponse.builder()
                .totalPages(products.getTotalPages())
                .totalElements(products.getTotalElements())
                .page(products.getPageable().getPageNumber()+1)
                .size(products.getPageable().getPageSize())
                .hasNext(products.hasNext())
                .hasPrevious(products.hasPrevious())
                .build();
        CommonResponse<List<ProductResponse>> response = CommonResponse.<List<ProductResponse>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(products.getContent())
                .paging(pagingResponse)
                .build();
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CommonResponse<?>> createProduct(@RequestPart(name = "product") String product, @RequestPart(name = "image", required = false) MultipartFile image) {

        CommonResponse.CommonResponseBuilder<ProductResponse> responseBuilder = CommonResponse.builder();
        try {
            CreateProductRequest request = objectMapper.readValue(product, new TypeReference<>() {});
            request.setProductImage(image);
            ProductResponse response = productService.create(request);
            responseBuilder.statusCode(HttpStatus.CREATED.value());
            responseBuilder.message("success save data");
            responseBuilder.data(response);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBuilder.build());
        } catch (Exception e) {
            responseBuilder.message("internal server error");
            responseBuilder.statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBuilder.build());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping
    public ResponseEntity<CommonResponse<?>> updateProduct(@RequestPart(name = "product") String product, @RequestPart(name = "image", required = false) MultipartFile image) {
        CommonResponse.CommonResponseBuilder<ProductResponse> responseBuilder = CommonResponse.builder();
        try {
            UpdateProductRequest request = objectMapper.readValue(product, new TypeReference<>() {});
            request.setImage(image);
            ProductResponse response = productService.update(request);
            responseBuilder.statusCode(HttpStatus.CREATED.value());
            responseBuilder.message("success update data");
            responseBuilder.data(response);
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBuilder.build());
        } catch (Exception e) {
            responseBuilder.message("internal server error");
            responseBuilder.statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBuilder.build());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping(value = ID_PATH)
    public ResponseEntity<CommonResponse<String>> deleteProduct(@PathVariable("id") Integer id) {
        productService.delete(id);
        CommonResponse<String> response = CommonResponse.<String>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success delete data")
                .build();
        return ResponseEntity.ok(response);
    }


}
