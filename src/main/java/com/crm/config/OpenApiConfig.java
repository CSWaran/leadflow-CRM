package com.crm.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT"
)
public class OpenApiConfig {

    @Bean
    public OpenAPI crmOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("CRM Backend API")
                        .description("Production-ready CRM Backend")
                        .version("v1")
                        .license(new License().name("Proprietary")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
