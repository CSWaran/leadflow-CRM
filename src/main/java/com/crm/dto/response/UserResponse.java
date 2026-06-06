package com.crm.dto.response;

import com.crm.entity.Role;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserResponse {

    private final Long id;
    private final String email;
    private final String fullName;
    private final Role role;
    private final boolean enabled;
    private final Instant createdAt;
    private final Instant updatedAt;
}
