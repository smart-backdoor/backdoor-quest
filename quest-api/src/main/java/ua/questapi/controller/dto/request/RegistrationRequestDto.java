package ua.questapi.controller.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegistrationRequestDto {
  @NotNull(message = "Email is required")
  @NotBlank(message = "Email must not be empty")
  @Email(message = "Please provide a valid email address")
  private String email;

  @NotNull(message = "Password is required")
  @NotBlank(message = "Password must not be empty")
  private String password;
}
