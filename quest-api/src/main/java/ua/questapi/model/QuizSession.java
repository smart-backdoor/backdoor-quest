package ua.questapi.model;

import java.util.HashSet;
import java.util.Set;

public record QuizSession(String sessionId, Set<String> participants) {

  public QuizSession(String sessionId) {
    this(sessionId, new HashSet<>());
  }

  public void addParticipant(String userId) {
    participants.add(userId);
  }

  public boolean isFull() {
    return participants.size() >= 3;
  }
}
