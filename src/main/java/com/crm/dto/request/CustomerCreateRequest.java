package com.crm.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerCreateRequest {

    @NotBlank
    @Size(max = 150)
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(max = 30)
    private String phone;

    @Size(max = 150)
    private String company;
}
