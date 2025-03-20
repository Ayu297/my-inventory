package com.example.backend.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateCategoryRequest {
    @NotNull(message = "id is required")
    private Integer id;

    @NotBlank(message = "name is required")
    private String catName;
}
