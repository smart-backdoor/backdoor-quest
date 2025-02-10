package ua.questapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.questapi.controller.dto.request.ValidateAnswerRequestDto;
import ua.questapi.controller.dto.response.*;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.TaskMapper;
import ua.questapi.utils.SecurityUtils;

@Service
@RequiredArgsConstructor
public class QuestProgressService {

  // TODO: migrate to redis or save user progress to db
  private final Map<Long, List<Boolean>> USER_PROGRESS = new ConcurrentHashMap<>();

  private final UserService userService;
  private final QuestService questService;
  private final TaskService taskService;
  private final TaskMapper taskMapper;

  @Transactional(readOnly = true)
  public StartedQuestResponseDto start(Long questId) {
    var quest = questService.findById(questId);

    var firstTask = taskMapper.toCurrentTask(quest.getTasks().getFirst());

    return new StartedQuestResponseDto(questId, firstTask, quest.getTasks().size());
  }

  @Transactional(readOnly = true)
  public QuestProgressResponseDto validateAnswerAndGetNext(
      Long questId, ValidateAnswerRequestDto answerRequestDto) {
    var task = taskService.getById(answerRequestDto.taskId());
    var isCorrectAnswer = isCorrectAnswer(task.getAnswers(), answerRequestDto.answerId());

    var username = SecurityUtils.getCurrentUser().getUsername();
    var currentUserId = userService.findByEmail(username).getId();

    USER_PROGRESS.computeIfAbsent(currentUserId, k -> new ArrayList<>()).add(isCorrectAnswer);
    var results = USER_PROGRESS.get(currentUserId);
    var quest = questService.findById(questId);

    if (answerRequestDto.isLastValidation()) {
      USER_PROGRESS.remove(currentUserId);
      return QuestProgressResponseDto.lastTask(results);
    }
    var nextTask = getNextTaskByIndex(quest.getTasks(), answerRequestDto.nextTaskIndex());
    return new QuestProgressResponseDto(nextTask, results);
  }

  private TaskWithoutCorrectAnswerResponseDto getNextTaskByIndex(
      List<TaskResponseDto> tasks, Integer index) {
    if (index >= tasks.size())
      throw new ApplicationException(
          "Incorrect index for tasks with size %s".formatted(tasks.size()));

    return taskMapper.toCurrentTask(tasks.get(index));
  }

  private boolean isCorrectAnswer(List<AnswerResponseDto> answers, Long answerId) {
    return answers.stream()
        .filter(AnswerResponseDto::getIsCorrect)
        .findFirst()
        .map(answer -> Objects.equals(answerId, answer.getId()))
        .orElse(false);
  }
}
