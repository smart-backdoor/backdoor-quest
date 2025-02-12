package ua.questapi.controller.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CompleteQuestRequestDto {
  @NotNull(message = "Correct answer list cannot be null")
  @Size(min = 3, message = "At least 3 answers is required")
  List<Boolean> correctAnswers;

  @NotNull(message = "Rate is required")
  @Min(1)
  Integer rate;
}
