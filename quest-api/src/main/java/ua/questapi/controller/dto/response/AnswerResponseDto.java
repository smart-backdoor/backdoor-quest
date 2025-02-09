package ua.questapi.controller.dto.response;

import lombok.Data;

@Data
public class AnswerResponseDto {
  private Long id;
  private String title;
  private Boolean isCorrect;
}
