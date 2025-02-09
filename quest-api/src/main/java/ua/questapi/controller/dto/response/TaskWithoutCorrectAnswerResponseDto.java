package ua.questapi.controller.dto.response;

import java.util.List;

public record TaskWithoutCorrectAnswerResponseDto(
    Long id, String title, String file, List<Answer> answers) {

  public record Answer(Long id, String title) {}
}
