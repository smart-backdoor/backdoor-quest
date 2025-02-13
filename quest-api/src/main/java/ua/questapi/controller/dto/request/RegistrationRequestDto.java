package ua.questapi.controller.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationRequestDto {
  @NotNull(message = "Email is required")
  @NotBlank(message = "Email must not be empty")
  @Email(message = "Please provide a valid email address")
  private String email;

  @NotNull(message = "Password is required")
  @NotBlank(message = "Password must not be empty")
  @Min(value = 8, message = "Password must be between 8 and 64 characters long and include at least one letter and one number")
  @Max(value = 64, message = "Password must be between 8 and 64 characters long and include at least one letter and one number")
  private String password;
}
