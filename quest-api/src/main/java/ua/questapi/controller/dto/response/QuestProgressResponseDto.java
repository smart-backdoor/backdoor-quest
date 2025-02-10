package ua.questapi.controller.dto.response;

import java.util.List;

public record QuestProgressResponseDto(
    TaskWithoutCorrectAnswerResponseDto nextTask, List<Boolean> correctAnswers) {

  public static QuestProgressResponseDto lastTask(List<Boolean> correctAnswers) {
    return new QuestProgressResponseDto(null, correctAnswers);
  }
}
