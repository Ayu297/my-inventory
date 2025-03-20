package com.example.backend.model.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchProductRequest {
    private String name;
    private String category;
}
