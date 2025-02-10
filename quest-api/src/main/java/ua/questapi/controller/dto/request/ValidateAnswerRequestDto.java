package ua.questapi.controller.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ValidateAnswerRequestDto(
    @NotNull Long taskId, @NotNull Long answerId, @NotNull @Min(1) Integer nextTaskIndex) {}
