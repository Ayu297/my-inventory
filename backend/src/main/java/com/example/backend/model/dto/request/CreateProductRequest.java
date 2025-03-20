package com.example.backend.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@Builder
public class CreateProductRequest {

    @NotBlank(message = "Product name is required")
    private String productName;

    @NotBlank(message = "Product code is required")
    private String productCode;

    @NotNull(message = "Category ID is required")
    private Integer categoryId;

    @NotNull(message = "Register date is required")
    private Date registerDate;

    private MultipartFile productImage;
}
