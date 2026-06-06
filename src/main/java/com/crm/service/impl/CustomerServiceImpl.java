package com.crm.service.impl;

import com.crm.dto.request.CustomerCreateRequest;
import com.crm.dto.request.CustomerUpdateRequest;
import com.crm.dto.response.CustomerResponse;
import com.crm.entity.Customer;
import com.crm.exception.BadRequestException;
import com.crm.exception.ResourceNotFoundException;
import com.crm.mapper.CustomerMapper;
import com.crm.repository.CustomerRepository;
import com.crm.service.CustomerService;
import com.crm.util.PagedResponse;
import com.crm.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    public CustomerResponse create(CustomerCreateRequest request) {
        String email = request.getEmail().toLowerCase();
        if (customerRepository.existsByEmail(email)) {
            throw new BadRequestException("Customer email is already in use");
        }
        Customer customer = customerMapper.toEntity(request);
        customer.setEmail(email);
        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    public CustomerResponse update(Long id, CustomerUpdateRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        String email = request.getEmail().toLowerCase();
        if (!customer.getEmail().equalsIgnoreCase(email) && customerRepository.existsByEmail(email)) {
            throw new BadRequestException("Customer email is already in use");
        }
        customerMapper.update(request, customer);
        customer.setEmail(email);
        return customerMapper.toResponse(customerRepository.save(customer));
    }

    @Override
    public CustomerResponse getById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        return customerMapper.toResponse(customer);
    }

    @Override
    public PagedResponse<CustomerResponse> list(Pageable pageable) {
        Page<CustomerResponse> page = customerRepository.findAll(pageable).map(customerMapper::toResponse);
        return PaginationUtil.from(page);
    }

    @Override
    public void delete(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        customerRepository.delete(customer);
    }
}
