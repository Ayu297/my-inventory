package com.example.backend.controller;

import com.example.backend.model.dto.request.CreateCategoryRequest;
import com.example.backend.model.dto.request.UpdateCategoryRequest;
import com.example.backend.model.dto.response.CategoryResponse;
import com.example.backend.model.dto.response.CommonResponse;
import com.example.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.backend.model.constant.ApiUrl.CATEGORY_URL;
import static com.example.backend.model.constant.ApiUrl.ID_PATH;


@RequiredArgsConstructor
@RestController
@RequestMapping(CATEGORY_URL)
public class CategoryController {
    private final CategoryService categoryService;

//    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping
    public ResponseEntity<CommonResponse<List<CategoryResponse>>> getCategory() {
        List<CategoryResponse> categories = categoryService.getAll();
        CommonResponse<List<CategoryResponse>> response = CommonResponse.<List<CategoryResponse>>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(categories)
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping(ID_PATH)
    public ResponseEntity<CommonResponse<CategoryResponse>> getCategoryById(@PathVariable("id") Integer id) {
        CategoryResponse category = categoryService.getResponseById(id);
        CommonResponse<CategoryResponse> response = CommonResponse.<CategoryResponse>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(category)
                .build();
        return ResponseEntity.ok(response);
    }


    @PostMapping
    public ResponseEntity<CommonResponse<CategoryResponse>> createCategory(@RequestBody CreateCategoryRequest request) {
        CategoryResponse category = categoryService.create(request);
        CommonResponse<CategoryResponse> response = CommonResponse.<CategoryResponse>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(category)
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<CommonResponse<CategoryResponse>> updateCategory(@RequestBody UpdateCategoryRequest request) {
        CategoryResponse category = categoryService.update(request);
        CommonResponse<CategoryResponse> response = CommonResponse.<CategoryResponse>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success fetch data")
                .data(category)
                .build();
        return ResponseEntity.ok(response);
    }

//    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping(ID_PATH)
    public ResponseEntity<CommonResponse<String>> deleteCategory(@PathVariable("id") Integer id) {
        categoryService.delete(id);
        CommonResponse<String> response = CommonResponse.<String>builder()
                .statusCode(HttpStatus.OK.value())
                .message("success delete category")
                .build();
        return ResponseEntity.ok(response);
    }

}
