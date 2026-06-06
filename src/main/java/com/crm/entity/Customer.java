package com.crm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers",
        uniqueConstraints = @UniqueConstraint(columnNames = "email"),
        indexes = {
                @Index(name = "idx_customers_name", columnList = "name"),
                @Index(name = "idx_customers_company", columnList = "company")
        })
@SQLDelete(sql = "UPDATE customers SET deleted = true WHERE id = ?")
@SQLRestriction("deleted = false")
public class Customer extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column
    private String company;
}
