package ua.questapi.controller.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class QuestRequestDto {

  @NotNull(message = "Title is required")
  @NotBlank(message = "Title must not be empty")
  private String title;

  @NotNull(message = "Description is required")
  @NotBlank(message = "Description must not be empty")
  private String description;

  private Long timeLimit;
}
