package ua.questapi.service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;
import ua.questapi.model.QuizSession;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizSessionService {

  private final MessageChannel mqttOutputChannel;

  private final Map<String, QuizSession> activeSessions = new ConcurrentHashMap<>();

  public String createSession() {
    String sessionId = UUID.randomUUID().toString();
    activeSessions.put(sessionId, new QuizSession(sessionId));
    log.info("New session created: {}", sessionId);
    return sessionId;
  }

  public void joinSession(String sessionId, String userId) {
    QuizSession session = activeSessions.get(sessionId);
    if (session == null) {
      throw new IllegalStateException("Session not found");
    }
    session.addParticipant(userId);
    sendMessage("quiz/session/" + sessionId, "User " + userId + " joined");
  }

  public void sendQuestion(String sessionId, String question) {
    sendMessage("quiz/session/" + sessionId + "/question", question);
  }

  public void submitAnswer(String sessionId, String userId, String answer) {
    log.info("User {} answered: {}", userId, answer);
    sendMessage("quiz/session/" + sessionId + "/answers", userId + ": " + answer);
  }

  public void sendMessage(String topic, String message) {
    mqttOutputChannel.send(
        MessageBuilder.withPayload(message).setHeader("mqtt_topic", topic).build());
  }
}
