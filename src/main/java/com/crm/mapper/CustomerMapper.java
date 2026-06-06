package com.crm.mapper;

import com.crm.dto.request.CustomerCreateRequest;
import com.crm.dto.request.CustomerUpdateRequest;
import com.crm.dto.response.CustomerResponse;
import com.crm.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", builder = @org.mapstruct.Builder(disableBuilder = true))
public interface CustomerMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Customer toEntity(CustomerCreateRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    void update(CustomerUpdateRequest request, @MappingTarget Customer customer);

    CustomerResponse toResponse(Customer customer);
}
