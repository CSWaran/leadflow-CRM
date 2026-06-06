package com.crm.service.impl;

import com.crm.dto.request.LeadCreateRequest;
import com.crm.dto.request.LeadUpdateRequest;
import com.crm.dto.response.LeadResponse;
import com.crm.entity.Lead;
import com.crm.entity.User;
import com.crm.exception.BadRequestException;
import com.crm.exception.ResourceNotFoundException;
import com.crm.mapper.LeadMapper;
import com.crm.repository.LeadRepository;
import com.crm.repository.UserRepository;
import com.crm.service.LeadService;
import com.crm.util.PagedResponse;
import com.crm.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;
    private final LeadMapper leadMapper;
    private final UserRepository userRepository;

    @Override
    public LeadResponse create(LeadCreateRequest request) {
        String email = request.getEmail().toLowerCase();
        if (leadRepository.existsByEmail(email)) {
            throw new BadRequestException("Lead email is already in use");
        }
        Lead lead = leadMapper.toEntity(request);
        lead.setEmail(email);

        if (request.getAssignedToId() != null) {
            User assignedUser = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            lead.setAssignedTo(assignedUser);
        }

        return leadMapper.toResponse(leadRepository.save(lead));
    }

    @Override
    public LeadResponse update(Long id, LeadUpdateRequest request) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found"));
        String email = request.getEmail().toLowerCase();
        if (!lead.getEmail().equalsIgnoreCase(email) && leadRepository.existsByEmail(email)) {
            throw new BadRequestException("Lead email is already in use");
        }
        leadMapper.update(request, lead);
        lead.setEmail(email);

        if (request.getAssignedToId() != null) {
            User assignedUser = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            lead.setAssignedTo(assignedUser);
        } else {
            lead.setAssignedTo(null);
        }

        return leadMapper.toResponse(leadRepository.save(lead));
    }

    @Override
    @Transactional(readOnly = true)
    public LeadResponse getById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found"));
        return leadMapper.toResponse(lead);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<LeadResponse> list(Pageable pageable) {
        Page<LeadResponse> page = leadRepository.findAllWithAssignedTo(pageable).map(leadMapper::toResponse);
        return PaginationUtil.from(page);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found"));
        leadRepository.delete(lead);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<LeadResponse> searchByName(String name, Pageable pageable) {
        Page<LeadResponse> page = leadRepository.findByNameContaining(name, pageable)
                .map(leadMapper::toResponse);
        return PaginationUtil.from(page);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<LeadResponse> searchByEmail(String email, Pageable pageable) {
        Page<LeadResponse> page = leadRepository.findByEmailContaining(email, pageable)
                .map(leadMapper::toResponse);
        return PaginationUtil.from(page);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<LeadResponse> searchByCompany(String company, Pageable pageable) {
        Page<LeadResponse> page = leadRepository.findByCompanyContaining(company, pageable)
                .map(leadMapper::toResponse);
        return PaginationUtil.from(page);
    }

    @Override
    public LeadResponse assignToUser(Long leadId, Long userId) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        lead.setAssignedTo(user);
        return leadMapper.toResponse(leadRepository.save(lead));
    }
}
