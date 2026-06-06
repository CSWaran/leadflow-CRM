package com.crm.config;

import com.crm.entity.Role;
import com.crm.entity.User;
import com.crm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
@RequiredArgsConstructor
public class BootstrapAdminRunner implements CommandLineRunner {

    private final BootstrapAdminProperties properties;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!properties.isEnabled()) {
            return;
        }
        if (!StringUtils.hasText(properties.getEmail()) || !StringUtils.hasText(properties.getPassword())) {
            log.warn("Bootstrap admin is enabled but email/password are not set.");
            return;
        }
        if (userRepository.existsByRole(Role.ADMIN)) {
            return;
        }

        User admin = User.builder()
                .email(properties.getEmail().toLowerCase())
                .fullName(properties.getFullName())
                .password(passwordEncoder.encode(properties.getPassword()))
                .role(Role.ADMIN)
                .enabled(true)
                .build();
        userRepository.save(admin);
        log.info("Bootstrap admin user created.");
    }
}
