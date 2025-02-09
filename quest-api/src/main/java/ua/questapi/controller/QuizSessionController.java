package ua.questapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.questapi.controller.dto.response.SessionResponseDto;
import ua.questapi.service.QuizProgressService;
import ua.questapi.service.SessionManagerService;

@RestController
@RequestMapping("/session")
@RequiredArgsConstructor
public class QuizSessionController {

  private final SessionManagerService sessionManagerService;
  private final QuizProgressService quizProgressService;

  @GetMapping("/{sessionId}/task/{taskId}")
  public void getTaskForAllUsersInSession(
      @PathVariable String sessionId, @PathVariable Long taskId) {
    quizProgressService.getTaskForAllUsers(sessionId, taskId);
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
