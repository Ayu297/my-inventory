package com.example.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = " tbl_produk")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produk")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_kategori", nullable = false)
    @JsonBackReference
    private Category category;

    @Column(name = "nama_produk", length = 200, nullable = false)
    private String productName;

    @Column(name = "kode_produk", length = 50, nullable = false)
    private String productCode;

    @ManyToOne
    @JoinColumn(name = "foto_produk")
    private Image productImage;

    @Column(name = "tgl_register_date", nullable = false)
    private Date registerDate;


}
