package ua.questapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.questapi.controller.dto.request.QuestRequestDto;
import ua.questapi.controller.dto.response.QuestResponseDto;
import ua.questapi.service.QuestService;

@RestController
@RequestMapping("/quests")
@RequiredArgsConstructor
public class QuestController {

  private final QuestService questService;

  @PostMapping
  public QuestResponseDto create(@Valid @RequestBody QuestRequestDto request) {
    return questService.create(request);
  }
}
