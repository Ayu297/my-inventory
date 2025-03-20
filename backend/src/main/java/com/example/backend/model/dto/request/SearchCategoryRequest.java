package com.example.backend.model.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchCategoryRequest {
    private String catName;
}
