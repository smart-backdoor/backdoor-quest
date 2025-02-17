package ua.questapi.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
  private String token;
  private String email;
  private Long userId;
  private String avatar;
  private String firstName;
}
