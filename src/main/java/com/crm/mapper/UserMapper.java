package com.crm.mapper;

import com.crm.dto.response.UserResponse;
import com.crm.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
}
