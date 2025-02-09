package ua.questapi.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.questapi.controller.dto.response.SessionResponseDto;
import ua.questapi.service.QuestProgressService;
import ua.questapi.service.SessionManagerService;

@Tag(name = "Quest Session")
@RestController
@RequestMapping("/session")
@RequiredArgsConstructor
public class QuestSessionController {

  private final SessionManagerService sessionManagerService;
  private final QuestProgressService questProgressService;

  @PostMapping("/{sessionId}/quest/{questId}/start")
  public void getTaskForAllUsersInSession(
      @PathVariable String sessionId, @PathVariable Long questId) {
    questProgressService.start(sessionId, questId);
  }

  @PostMapping("/create")
  public SessionResponseDto createSession() {
    var session = sessionManagerService.createSession();
    return new SessionResponseDto(session.sessionId(), session.participants().size());
  }

  @PostMapping("/{sessionId}/join/{userId}")
  public SessionResponseDto joinSession(@PathVariable String sessionId, @PathVariable Long userId) {
    var session = sessionManagerService.joinSession(sessionId, userId);
    return new SessionResponseDto(session.sessionId(), session.participants().size());
  }
}
