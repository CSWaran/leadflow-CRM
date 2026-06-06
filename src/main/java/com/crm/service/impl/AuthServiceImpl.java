package com.crm.service.impl;

import com.crm.dto.request.LoginRequest;
import com.crm.dto.response.AuthResponse;
import com.crm.dto.response.UserResponse;
import com.crm.entity.User;
import com.crm.exception.BadRequestException;
import com.crm.mapper.UserMapper;
import com.crm.repository.UserRepository;
import com.crm.security.JwtTokenProvider;
import com.crm.security.UserPrincipal;
import com.crm.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().toLowerCase();
        log.debug("Login attempt for email={}", email);
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            log.warn("Authentication exception {}: {}", ex.getClass().getSimpleName(), ex.getMessage());
            throw ex;
        }
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = tokenProvider.generateToken(principal);
        User user = userRepository.findByEmail(principal.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        UserResponse userResponse = userMapper.toResponse(user);
        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(userResponse)
                .build();
    }
}
