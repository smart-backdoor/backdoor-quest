package ua.questapi.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import ua.questapi.enums.TokenType;

@Data
@AllArgsConstructor
public class ConfirmResponseDto {
  private String email;
  private TokenType type;
}
