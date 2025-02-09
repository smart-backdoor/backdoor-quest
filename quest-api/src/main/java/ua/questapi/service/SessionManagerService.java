package ua.questapi.service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.questapi.exception.ApplicationException;
import ua.questapi.model.QuizSession;

@Service
@RequiredArgsConstructor
public class SessionManagerService {
  private final Map<String, QuizSession> sessions = new ConcurrentHashMap<>();

  public QuizSession getSession(String sessionId) {
    QuizSession session = sessions.get(sessionId);
    if (session == null) {
      throw new ApplicationException("Session with id %s not found".formatted(sessionId));
    }
    return session;
  }

  public QuizSession createSession() {
    var sessionId = UUID.randomUUID().toString();
    var session = new QuizSession(sessionId);
    sessions.put(sessionId, session);

    return session;
  }

  public QuizSession joinSession(String sessionId, Long userId) {
    var session = getSession(sessionId);

    if (session.addParticipant(userId)) {
      return session;
    }
    throw new ApplicationException(
        "User %s failed to join session %s, session full".formatted(userId, sessionId));
  }

  public void removeSession(String sessionId) {
    sessions.remove(sessionId);
  }
}
