package ua.questapi.service;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.questapi.database.entity.TaskEntity;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.TaskMapper;
import ua.questapi.model.QuizSession;
import ua.questapi.utils.JsonUtils;

@Service
@RequiredArgsConstructor
public class MultiQuestProgressService {

  private final SessionManagerService sessionManagerService;
  private final MQTTSenderService mqttSenderService;
  private final QuestService questService;
  private final TaskMapper taskMapper;

  // TODO: multi play for 3 users MQTT update every 10 sec
  public void start(String sessionId, Long questId) {
    var session = sessionManagerService.getSession(sessionId);

    var quest = questService.getById(questId);
    sendTasksForAllUsers(quest.getTasks(), session);

    sessionManagerService.removeSession(sessionId);
  }

  private void sendTasksForAllUsers(Set<TaskEntity> tasks, QuizSession session) {
    tasks.forEach(
        task -> {
          session
              .participants()
              .forEach(
                  userId -> {
                    var topic = "quiz/session/%s/user/%s".formatted(session.sessionId(), userId);
                    mqttSenderService.publishMqttMessage(
                        topic, JsonUtils.toJson(taskMapper.toDto(task)));
                  });
          sleep();
        });
  }

  // TODO: migrate sleep time to configuration of task/quest
  private void sleep() {
    try {
      Thread.sleep(10000);
    } catch (InterruptedException e) {
      throw new ApplicationException("Quest pause interrupted");
    }
  }
}
