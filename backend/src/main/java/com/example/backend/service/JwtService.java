package com.example.backend.service;


import com.example.backend.model.dto.response.JwtClaims;
import com.example.backend.model.entity.UserAccount;

public interface JwtService {
    String generateToken(UserAccount userAccount);

    boolean verifyJwtToken(String token);

    JwtClaims getClaimsByToken(String token);
}

