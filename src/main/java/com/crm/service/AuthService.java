package com.crm.service;

import com.crm.dto.request.LoginRequest;
import com.crm.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
}
