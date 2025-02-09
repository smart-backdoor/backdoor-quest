package ua.questapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ua.questapi.controller.dto.request.QuestRequestDto;
import ua.questapi.controller.dto.response.QuestResponseDto;
import ua.questapi.database.QuestRepository;
import ua.questapi.database.entity.QuestEntity;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.QuestMapper;
import ua.questapi.utils.SecurityUtils;

@Service
@RequiredArgsConstructor
public class QuestService {

  private final QuestRepository questRepository;
  private final UserService userService;
  private final QuestMapper questMapper;

  public QuestResponseDto create(QuestRequestDto questRequestDto) {
    var email = SecurityUtils.getCurrentUser().getUsername();
    var user = userService.findByEmail(email);
    var questEntity = questMapper.toCreateEntity(questRequestDto, user);
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
