package ua.questapi.controller.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
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

  private String file;

  @NotNull(message = "Tasks list cannot be null")
  @Size(min = 3, message = "At least 3 tasks is required")
  @Valid
  private List<TaskRequestDto> tasks;
}
