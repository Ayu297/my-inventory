package com.example.backend.model.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class JwtClaims {
    private String userAccountId;
    private List<String> roles;
}

