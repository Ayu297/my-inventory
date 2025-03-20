package com.example.backend.repository;

import com.example.backend.model.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, String > {
    Optional<UserAccount> findByUsername(String username);
}

