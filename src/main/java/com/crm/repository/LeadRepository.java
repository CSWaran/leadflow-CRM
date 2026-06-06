package com.crm.repository;

import com.crm.entity.Lead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    boolean existsByEmail(String email);

    @Query("SELECT l FROM Lead l LEFT JOIN FETCH l.assignedTo")
    Page<Lead> findAllWithAssignedTo(Pageable pageable);

    @Query(value = "SELECT l FROM Lead l LEFT JOIN FETCH l.assignedTo WHERE LOWER(l.name) LIKE LOWER(CONCAT('%', :name, '%'))",
           countQuery = "SELECT COUNT(l) FROM Lead l WHERE LOWER(l.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Lead> findByNameContaining(@Param("name") String name, Pageable pageable);

    @Query(value = "SELECT l FROM Lead l LEFT JOIN FETCH l.assignedTo WHERE LOWER(l.email) = LOWER(:email)",
           countQuery = "SELECT COUNT(l) FROM Lead l WHERE LOWER(l.email) = LOWER(:email)")
    Page<Lead> findByEmailContaining(@Param("email") String email, Pageable pageable);

    @Query(value = "SELECT l FROM Lead l LEFT JOIN FETCH l.assignedTo WHERE LOWER(l.company) LIKE LOWER(CONCAT('%', :company, '%'))",
           countQuery = "SELECT COUNT(l) FROM Lead l WHERE LOWER(l.company) LIKE LOWER(CONCAT('%', :company, '%'))")
    Page<Lead> findByCompanyContaining(@Param("company") String company, Pageable pageable);
}
