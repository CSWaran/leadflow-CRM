package com.crm.dto.response;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CustomerResponse {

    private final Long id;
    private final String name;
    private final String email;
    private final String phone;
    private final String company;
    private final Instant createdAt;
    private final Instant updatedAt;
}
