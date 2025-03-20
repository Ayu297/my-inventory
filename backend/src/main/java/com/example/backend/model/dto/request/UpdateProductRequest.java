package com.example.backend.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProductRequest {

    @NotNull(message = "id is required")
    private Integer id;

    @NotBlank(message = "name is required")
    private String name;

    @NotNull(message = "category is required")
    private Integer categoryId;

    @NotBlank(message = "product code is required")
    private String productCode;

    @NotNull(message = "stock is required")
    private Integer stock;

    private MultipartFile image;
}
