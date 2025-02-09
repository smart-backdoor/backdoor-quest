package ua.questapi.service;

import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.questapi.controller.dto.response.AnswerResponseDto;
import ua.questapi.controller.dto.response.ResultResponseDto;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.database.TaskRepository;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.TaskMapper;

@Service
@RequiredArgsConstructor
public class TaskService {

  private final TaskRepository taskRepository;
  private final TaskMapper taskMapper;

  public ResultResponseDto validateAnswer(Long taskId, Long answerId) {
    var task = getById(taskId);
    var correctAnswer =
        task.getAnswers().stream()
            .filter(AnswerResponseDto::getIsCorrect)
            .findFirst()
            .map(answer -> Objects.equals(answerId, answer.getId()))
            .orElse(false);

    return new ResultResponseDto(correctAnswer);
  }

  public TaskResponseDto getById(Long id) {
    return taskRepository
        .findById(id)
        .map(taskMapper::toDto)
        .orElseThrow(() -> new ApplicationException("Task with id %S not found".formatted(id)));
  }
}
