package com.crm.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
public class LoggingAuthenticationProvider extends DaoAuthenticationProvider {

    public LoggingAuthenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        setUserDetailsService(userDetailsService);
        setPasswordEncoder(passwordEncoder);
    }

    @Override
    protected void additionalAuthenticationChecks(
            UserDetails userDetails,
            UsernamePasswordAuthenticationToken authentication
    ) throws AuthenticationException {
        String storedHash = userDetails.getPassword();
        Object credentials = authentication.getCredentials();
        String rawPassword = credentials == null ? null : credentials.toString();
        boolean matches = rawPassword != null && getPasswordEncoder().matches(rawPassword, storedHash);
        log.debug("AuthenticationProvider user={} storedHash={} bcryptMatches={}",
                userDetails.getUsername(),
                storedHash,
                matches);
        super.additionalAuthenticationChecks(userDetails, authentication);
    }
}
