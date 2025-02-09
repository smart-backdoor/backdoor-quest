package ua.questapi.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfiguration {

  @Bean
  public OpenAPI openApi() {
    final String securitySchemeName = "Authentication";

    return new OpenAPI()
        .info(new Info().title("API Documentation"))
        .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
        .components(
            new Components()
                .addSecuritySchemes(
                    securitySchemeName,
                    new SecurityScheme()
                        .name(securitySchemeName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("Bearer")
                        .description(
                            "Provide the JWT token. JWT token can be obtained from the Login API.")
                        .bearerFormat("JWT")));
  }
}
