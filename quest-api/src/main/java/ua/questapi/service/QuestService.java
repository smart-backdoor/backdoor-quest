package ua.questapi.service;

import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.questapi.controller.dto.request.QuestRequestDto;
import ua.questapi.controller.dto.response.QuestResponseDto;
import ua.questapi.database.QuestRepository;
import ua.questapi.database.entity.QuestEntity;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.AnswerMapper;
import ua.questapi.mapper.repository.database.QuestMapper;
import ua.questapi.mapper.repository.database.TaskMapper;
import ua.questapi.utils.SecurityUtils;

@Service
@RequiredArgsConstructor
public class QuestService {

  private final QuestRepository questRepository;
  private final UserService userService;
  private final QuestMapper questMapper;
  private final TaskMapper taskMapper;
  private final AnswerMapper answerMapper;

  @Transactional
  public QuestResponseDto create(QuestRequestDto questRequestDto) {
    var email = SecurityUtils.getCurrentUser().getUsername();
    var user = userService.findByEmail(email);
    var questEntity = questMapper.toCreateEntity(questRequestDto, user);
    var tasks =
        questRequestDto.getTasks().stream()
            .map(
                taskRequestDto -> {
                  var taskEntity = taskMapper.toCreateEntity(taskRequestDto);
                  taskEntity.setQuestEntity(questEntity);
                  questEntity.incrementTaskCount();

                  var answers = answerMapper.toEntityList(taskRequestDto.getAnswers());
                  answers.forEach(answer -> answer.setTaskEntity(taskEntity));
                  taskEntity.setAnswers(answers);

                  return taskEntity;
                })
            .collect(Collectors.toSet());
    questEntity.setTasks(tasks);
    var savedEntity = questRepository.save(questEntity);
    return questMapper.toResponseDto(savedEntity);
  }

  public QuestResponseDto findById(Long id) {
    return questMapper.toResponseDto(getById(id));
  }

  public QuestEntity getById(Long id) {
    return questRepository
        .findById(id)
        .orElseThrow(
            () ->
                new ApplicationException(
                    String.format("Quest with id '%s' was not found.", id), HttpStatus.NOT_FOUND));
  }
}
