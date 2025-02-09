package ua.questapi.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerRequestDto {
  @NotNull(message = "Title is required")
  @NotBlank(message = "Title must not be empty")
  private String title;

  @NotNull private Boolean isCorrect;
}
