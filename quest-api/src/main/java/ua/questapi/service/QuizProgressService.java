package ua.questapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.questapi.utils.JsonUtils;

@Service
@RequiredArgsConstructor
public class QuizProgressService {

  private final SessionManagerService sessionManagerService;
  private final MQTTSenderService mqttSenderService;
  private final TaskService taskService;

  // TODO: multi play for 3 users MQTT handler on FE side
  public void getTaskForAllUsers(String sessionId, Long taskId) {
    var session = sessionManagerService.getSession(sessionId);
    var userIds = session.participants();

    var task = taskService.getById(taskId);
    userIds.forEach(
        userId -> {
          var topic = "quiz/session/%s/user/%s".formatted(sessionId, userId);
          mqttSenderService.publishMqttMessage(topic, JsonUtils.toJson(task));
        });
  }
}
