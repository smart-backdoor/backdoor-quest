package ua.questapi.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.JoinType;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.questapi.controller.dto.request.QuestRequestDto;
import ua.questapi.controller.dto.response.QuestGridResponseDto;
import ua.questapi.controller.dto.response.QuestResponseDto;
import ua.questapi.database.CompletedQuestsRepository;
import ua.questapi.database.QuestRepository;
import ua.questapi.database.entity.CompletedQuestsEntity;
import ua.questapi.database.entity.QuestEntity;
import ua.questapi.database.projection.QuestAverageMarkProjection;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.AnswerMapper;
import ua.questapi.mapper.repository.database.QuestMapper;
import ua.questapi.mapper.repository.database.TaskMapper;
import ua.questapi.utils.SecurityUtils;

@Service
@RequiredArgsConstructor
public class QuestService {

  private final QuestRepository questRepository;
  private final CompletedQuestsRepository completedQuestsRepository;
  private final UserService userService;
  private final QuestMapper questMapper;
  private final TaskMapper taskMapper;
  private final AnswerMapper answerMapper;
  private final EntityManager entityManager;

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

  public List<QuestEntity> findAllByUserId(Long userId) {
    return questRepository.findAllByUserId(userId);
  }

  public List<QuestAverageMarkProjection> findAverageMarks(List<Long> questIds) {
    return completedQuestsRepository.findAverageMarkByQuestIds(questIds);
  }

  public List<CompletedQuestsEntity> findAllCompletedByUserId(Long userId) {
    return completedQuestsRepository.findAllByUserId(userId);
  }

  public Page<QuestGridResponseDto> getAll(Pageable pageable) {
    var cb = entityManager.getCriteriaBuilder();
    var criteriaQuery = cb.createQuery(QuestEntity.class);

    var questRoot = criteriaQuery.from(QuestEntity.class);
    questRoot.fetch("user", JoinType.LEFT);

    criteriaQuery.select(questRoot).distinct(true);

    var query = entityManager.createQuery(criteriaQuery);
    query.setFirstResult((int) pageable.getOffset());
    query.setMaxResults(pageable.getPageSize());

    var result = query.getResultList();

    return new PageImpl<>(
        result.stream().map(questMapper::toDto).toList(), pageable, getTotalCount());
  }

  private long getTotalCount() {
    var cb = entityManager.getCriteriaBuilder();
    var countQuery = cb.createQuery(Long.class);
    var questRoot = countQuery.from(QuestEntity.class);

    questRoot.join("user", JoinType.LEFT);

    countQuery.select(cb.count(questRoot));

    return entityManager.createQuery(countQuery).getSingleResult();
  }
}
