package com.crm.service;

import com.crm.dto.request.CustomerCreateRequest;
import com.crm.dto.request.CustomerUpdateRequest;
import com.crm.dto.response.CustomerResponse;
import com.crm.util.PagedResponse;
import org.springframework.data.domain.Pageable;

public interface CustomerService {
    CustomerResponse create(CustomerCreateRequest request);

    CustomerResponse update(Long id, CustomerUpdateRequest request);

    CustomerResponse getById(Long id);

    PagedResponse<CustomerResponse> list(Pageable pageable);

    void delete(Long id);
}
