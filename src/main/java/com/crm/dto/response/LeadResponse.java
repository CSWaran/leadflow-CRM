package com.crm.dto.response;

import com.crm.entity.LeadSource;
import com.crm.entity.LeadStatus;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LeadResponse {

    private final Long id;
    private final String name;
    private final String email;
    private final String phone;
    private final String company;
    private final String description;
    private final LeadStatus status;
    private final LeadSource source;
    private final Long assignedToId;
    private final String assignedToName;
    private final Instant createdAt;
    private final Instant updatedAt;
}
