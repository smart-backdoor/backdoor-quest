package ua.questapi.controller.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegistrationRequestDto {
  @NotNull(message = "Email is required")
  @NotBlank(message = "Email must not be empty")
  @Email(message = "Please provide a valid email address")
  private String email;

  @NotNull(message = "Password is required")
  @NotBlank(message = "Password must not be empty")
  @Pattern(
      regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,64}$",
      message =
          "Password must be between 8 and 64 characters long and include at least one letter and one number")
  private String password;
}
