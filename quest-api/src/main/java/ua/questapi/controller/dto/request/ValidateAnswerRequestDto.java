package ua.questapi.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ValidateAnswerRequestDto(
    @NotNull Long taskId, @NotNull Long answerId, @Min(1) Integer nextTaskIndex) {

  @JsonIgnore
  public boolean isLastValidation() {
    return nextTaskIndex == null;
  }
}
