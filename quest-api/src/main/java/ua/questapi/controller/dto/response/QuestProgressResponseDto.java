package ua.questapi.controller.dto.response;

import java.util.List;

public record QuestProgressResponseDto(
    TaskWithoutCorrectAnswerResponseDto nextTask, List<Boolean> correctAnswers) {}
