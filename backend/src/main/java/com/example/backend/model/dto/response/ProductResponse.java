package com.example.backend.model.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ProductResponse {
    private Integer id;
    private String name;
    private Integer category;
    private String type;
    private Date createdAt;
    private Date updatedAt;
    private ImageResponse image;
}
