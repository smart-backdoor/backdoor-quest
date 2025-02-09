package ua.questapi.model;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;

public record QuizSession(String sessionId, Set<Long> participants) {

  @Getter public static Integer LIMIT = 3;

  public QuizSession(String sessionId) {
    this(sessionId, ConcurrentHashMap.newKeySet());
  }

  public boolean addParticipant(Long userId) {
    if (participants.size() < LIMIT) {
      return participants.add(userId);
    }
    return false;
  }
}
