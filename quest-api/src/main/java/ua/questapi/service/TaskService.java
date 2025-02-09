package ua.questapi.service;

import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ua.questapi.controller.dto.request.TaskRequestDto;
import ua.questapi.controller.dto.response.AnswerResponseDto;
import ua.questapi.controller.dto.response.ResultResponseDto;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.database.TaskRepository;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.AnswerMapper;
import ua.questapi.mapper.repository.database.TaskMapper;

@Service
@RequiredArgsConstructor
public class TaskService {

  private final TaskRepository taskRepository;
  private final QuestService questService;
  private final TaskMapper taskMapper;
  private final AnswerMapper answerMapper;

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

  @Transactional
  public TaskResponseDto create(TaskRequestDto taskRequestDto, MultipartFile file) {
    var questEntity = questService.getById(taskRequestDto.getQuestId());
    questEntity.incrementTaskCount();
    // TODO impl save file to storage
    var pathToFile =
        Optional.ofNullable(file).map(MultipartFile::getOriginalFilename).orElse("path-to-file");
    var taskEntity = taskMapper.toCreateEntity(taskRequestDto, pathToFile);
    taskEntity.setQuestEntity(questEntity);
    var answers = answerMapper.toEntityList(taskRequestDto.getAnswers());
    answers.forEach(answer -> answer.setTaskEntity(taskEntity));
    taskEntity.setAnswers(answers);
    var savedTask = taskRepository.save(taskEntity);
    return taskMapper.toDto(savedTask);
  }
}
