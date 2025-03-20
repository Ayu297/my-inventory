package com.example.backend.utils.spesification;


import com.example.backend.model.dto.request.SearchProductRequest;
import com.example.backend.model.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpesification {
    public static Specification<Product> getSpecification(SearchProductRequest request) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (request.getName() != null) {
                if (!request.getName().isEmpty() || !request.getName().isBlank()) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + request.getName().toLowerCase() + "%"));
                }
            }
            if (request.getCategory() != null) {
                if (!request.getCategory().isEmpty() || !request.getCategory().isBlank()) {
                    predicates.add(criteriaBuilder.equal(root.get("category").get("category"), request.getCategory()));
                }
            }

            return query.where(criteriaBuilder.and(predicates.toArray(Predicate[]::new))).getRestriction();
        };
    }
}
