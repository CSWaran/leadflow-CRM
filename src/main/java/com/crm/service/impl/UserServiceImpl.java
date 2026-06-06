package com.crm.service.impl;

import com.crm.dto.request.RegisterRequest;
import com.crm.dto.request.UserCreateRequest;
import com.crm.dto.response.UserResponse;
import com.crm.entity.Role;
import com.crm.entity.User;
import com.crm.exception.BadRequestException;
import com.crm.exception.ResourceNotFoundException;
import com.crm.mapper.UserMapper;
import com.crm.repository.UserRepository;
import com.crm.service.UserService;
import com.crm.util.PagedResponse;
import com.crm.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse create(UserCreateRequest request) {
        String email = request.getEmail().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already in use");
        }
        User user = User.builder()
                .email(email)
                .fullName(request.getFullName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .enabled(true)
                .build();
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already in use");
        }
        User user = User.builder()
                .email(email)
                .fullName(request.getFullName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.SALES_EXECUTIVE)
                .enabled(true)
                .build();
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toResponse(user);
    }

    @Override
    public PagedResponse<UserResponse> list(Pageable pageable) {
        Page<UserResponse> page = userRepository.findAll(pageable).map(userMapper::toResponse);
        return PaginationUtil.from(page);
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }
}
