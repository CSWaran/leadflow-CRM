package com.crm.service;

import com.crm.dto.request.RegisterRequest;
import com.crm.dto.request.UserCreateRequest;
import com.crm.dto.response.UserResponse;
import com.crm.util.PagedResponse;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserResponse create(UserCreateRequest request);

    UserResponse register(RegisterRequest request);

    UserResponse getById(Long id);

    PagedResponse<UserResponse> list(Pageable pageable);

    void delete(Long id);
}
