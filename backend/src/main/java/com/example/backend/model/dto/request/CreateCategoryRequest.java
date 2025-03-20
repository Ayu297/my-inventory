package com.example.backend.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateCategoryRequest {
    @NotBlank(message = "name is required")
    private String catName;
}
