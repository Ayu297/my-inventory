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
@Table(name = " tbl_stok")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_stok")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_produk")
    @JsonBackReference
    private Product productId;

    @Column(name = "jumlah_barang")
    private Integer quantity;

    @Column(name = "tgl_update_date")
    private Date updateDate;

}
