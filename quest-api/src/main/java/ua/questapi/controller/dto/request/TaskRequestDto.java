package ua.questapi.controller.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Data;
import ua.questapi.utils.annotation.ValidAnswers;

@Data
public class TaskRequestDto {
  @Min(value = 1, message = "QuestId should be valid number")
  private Long questId;

  @NotNull(message = "Title is required")
  @NotBlank(message = "Title must not be empty")
  private String title;

  @NotNull(message = "Answers list cannot be null")
  @Size(min = 2, message = "At least two answers is required")
  @ValidAnswers
  @Valid
  private List<AnswerRequestDto> answers;
}
