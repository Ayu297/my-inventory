package com.example.backend.service;

import com.example.backend.model.entity.Image;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    Image create(MultipartFile multipartFile);
    Resource getById(Integer id);
    void deleteById(Integer id);
}
