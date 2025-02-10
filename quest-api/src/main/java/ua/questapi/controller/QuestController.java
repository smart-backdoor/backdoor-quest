package ua.questapi.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.questapi.controller.dto.request.QuestRequestDto;
import ua.questapi.controller.dto.request.ValidateAnswerRequestDto;
import ua.questapi.controller.dto.response.QuestProgressResponseDto;
import ua.questapi.controller.dto.response.QuestResponseDto;
import ua.questapi.controller.dto.response.StartedQuestResponseDto;
import ua.questapi.service.QuestProgressService;
import ua.questapi.service.QuestService;

@Tag(name = "Quest")
@RestController
@RequestMapping("/quests")
@RequiredArgsConstructor
public class QuestController {

  private final QuestService questService;
  private final QuestProgressService questProgressService;

  @PostMapping
  public QuestResponseDto create(@Valid @RequestBody QuestRequestDto request) {
    return questService.create(request);
  }

  @GetMapping("/{questId}")
  public QuestResponseDto get(@PathVariable Long questId) {
    return questService.findById(questId);
  }

  @PostMapping("/{questId}/start")
  public StartedQuestResponseDto start(@PathVariable Long questId) {
    return questProgressService.start(questId);
  }

  @PostMapping("/{questId}/validate")
  public QuestProgressResponseDto next(
      @PathVariable Long questId, @RequestBody @Valid ValidateAnswerRequestDto answerRequestDto) {
    return questProgressService.validateAnswerAndGetNext(questId, answerRequestDto);
  }
}
