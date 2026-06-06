package com.crm.service;

import com.crm.dto.request.LeadCreateRequest;
import com.crm.dto.request.LeadUpdateRequest;
import com.crm.dto.response.LeadResponse;
import com.crm.util.PagedResponse;
import org.springframework.data.domain.Pageable;

public interface LeadService {
    LeadResponse create(LeadCreateRequest request);

    LeadResponse update(Long id, LeadUpdateRequest request);

    LeadResponse getById(Long id);

    PagedResponse<LeadResponse> list(Pageable pageable);

    void delete(Long id);

    PagedResponse<LeadResponse> searchByName(String name, Pageable pageable);

    PagedResponse<LeadResponse> searchByEmail(String email, Pageable pageable);

    PagedResponse<LeadResponse> searchByCompany(String company, Pageable pageable);

    LeadResponse assignToUser(Long leadId, Long userId);
}
