package ua.questapi.controller.dto.response;

public record StartedQuestResponseDto(
    Long questId, TaskWithoutCorrectAnswerResponseDto currentTask, Integer total) {}
