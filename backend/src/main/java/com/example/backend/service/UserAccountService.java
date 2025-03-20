package com.example.backend.service;

import com.example.backend.model.entity.UserAccount;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserAccountService extends UserDetailsService {
    UserAccount getById(String id);
    UserAccount getByContext();
}

