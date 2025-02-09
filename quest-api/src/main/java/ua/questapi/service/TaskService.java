package ua.questapi.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ua.questapi.controller.dto.request.TaskRequestDto;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.database.TaskRepository;
import ua.questapi.mapper.repository.database.AnswerMapper;
import ua.questapi.mapper.repository.database.TaskMapper;

@Service
@RequiredArgsConstructor
public class TaskService {

  private final TaskRepository taskRepository;
  private final QuestService questService;
  private final TaskMapper taskMapper;
  private final AnswerMapper answerMapper;

  @Transactional
  public TaskResponseDto create(TaskRequestDto taskRequestDto, MultipartFile file) {
    var questEntity = questService.findById(taskRequestDto.getQuestId());
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
