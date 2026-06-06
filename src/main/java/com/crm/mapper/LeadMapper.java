package com.crm.mapper;

import com.crm.dto.request.LeadCreateRequest;
import com.crm.dto.request.LeadUpdateRequest;
import com.crm.dto.response.LeadResponse;
import com.crm.entity.Lead;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", builder = @org.mapstruct.Builder(disableBuilder = true))
public interface LeadMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "assignedTo", ignore = true)
    Lead toEntity(LeadCreateRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "assignedTo", ignore = true)
    void update(LeadUpdateRequest request, @MappingTarget Lead lead);

    @Mapping(source = "assignedTo.id", target = "assignedToId")
    @Mapping(source = "assignedTo.fullName", target = "assignedToName")
    LeadResponse toResponse(Lead lead);
}
