package com.example.backend.utils.parsing;


import com.example.backend.model.dto.response.CategoryResponse;
import com.example.backend.model.dto.response.ImageResponse;
import com.example.backend.model.dto.response.ProductResponse;
import com.example.backend.model.entity.Category;
import com.example.backend.model.entity.Product;

public class ToResponse {
    public static CategoryResponse parseCategory(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .catName(category.getCategoryName())
                .build();
    }

    public static ProductResponse parseProduct(Product product) {
        ImageResponse image = null;
        String category = null;
        String type = null;

        if (product.getProductImage() != null) {
            image = ImageResponse.builder()
                    .path(product.getProductImage().getPath())
                    .name(product.getProductImage().getName())
                    .build();
        }

        if (product.getCategory() != null) { // Ubah getCategoryId() menjadi getCategory()
            category = product.getCategory().getCategoryName(); // categoryName berasal dari Category
        }



        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getProductName())
//                .category(category) // Menggunakan category yang sudah diperiksa di atas
                .image(image)
                .build();
    }

    }
