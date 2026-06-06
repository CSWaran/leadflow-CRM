package com.crm.controller;

import com.crm.dto.request.LeadCreateRequest;
import com.crm.dto.request.LeadUpdateRequest;
import com.crm.dto.response.LeadResponse;
import com.crm.service.LeadService;
import com.crm.util.ApiResponse;
import com.crm.util.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/leads")
@RequiredArgsConstructor
@Tag(name = "Lead Management", description = "APIs for managing leads")
public class LeadController {

    private final LeadService leadService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Create a new lead", description = "Creates a new lead with the provided details")
    public ResponseEntity<ApiResponse<LeadResponse>> create(@Valid @RequestBody LeadCreateRequest request) {
        LeadResponse response = leadService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Lead created", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Update an existing lead", description = "Updates an existing lead with the provided details")
    public ResponseEntity<ApiResponse<LeadResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody LeadUpdateRequest request
    ) {
        LeadResponse response = leadService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Lead updated", response));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Get lead by ID", description = "Retrieves a lead by its unique identifier")
    public ResponseEntity<ApiResponse<LeadResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Lead fetched", leadService.getById(id)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Get all leads", description = "Retrieves all leads with pagination support")
    public ResponseEntity<ApiResponse<PagedResponse<LeadResponse>>> list(
            @PageableDefault(sort = "createdAt") Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.success("Leads fetched", leadService.list(pageable)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a lead", description = "Deletes a lead by its unique identifier (Admin only)")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        leadService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Lead deleted"));
    }

    @GetMapping("/search/name")
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Search leads by name", description = "Searches leads by name with partial matching")
    public ResponseEntity<ApiResponse<PagedResponse<LeadResponse>>> searchByName(
            @RequestParam String name,
            @PageableDefault(sort = "createdAt") Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.success("Leads searched by name", leadService.searchByName(name, pageable)));
    }

    @GetMapping("/search/email")
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Search leads by email", description = "Searches leads by email")
    public ResponseEntity<ApiResponse<PagedResponse<LeadResponse>>> searchByEmail(
            @RequestParam String email,
            @PageableDefault(sort = "createdAt") Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.success("Leads searched by email", leadService.searchByEmail(email, pageable)));
    }

    @GetMapping("/search/company")
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Search leads by company", description = "Searches leads by company name with partial matching")
    public ResponseEntity<ApiResponse<PagedResponse<LeadResponse>>> searchByCompany(
            @RequestParam String company,
            @PageableDefault(sort = "createdAt") Pageable pageable
    ) {
        return ResponseEntity.ok(ApiResponse.success("Leads searched by company", leadService.searchByCompany(company, pageable)));
    }

    @PutMapping("/{leadId}/assign/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN','SALES_EXECUTIVE')")
    @Operation(summary = "Assign lead to user", description = "Assigns a lead to a specific user")
    public ResponseEntity<ApiResponse<LeadResponse>> assignToUser(
            @PathVariable Long leadId,
            @PathVariable Long userId
    ) {
        LeadResponse response = leadService.assignToUser(leadId, userId);
        return ResponseEntity.ok(ApiResponse.success("Lead assigned to user", response));
    }
}
