package ua.questapi.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.questapi.controller.dto.request.UpdateUserRequestDto;
import ua.questapi.controller.dto.response.UserProfileQuestResponseDto;
import ua.questapi.controller.dto.response.UserProfileResponseDto;
import ua.questapi.database.CompletedQuestsRepository;
import ua.questapi.database.QuestRepository;
import ua.questapi.database.UserRepository;
import ua.questapi.database.entity.CompletedQuestsEntity;
import ua.questapi.database.entity.QuestEntity;
import ua.questapi.database.entity.UserEntity;
import ua.questapi.database.projection.QuestAverageMarkProjection;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.UserMapper;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final UserMapper mapper;
  private final QuestRepository questRepository;
  private final CompletedQuestsRepository completedQuestsRepository;

  public UserEntity findByEmail(String email) {
    return repository
        .findByEmail(email)
        .orElseThrow(
            () ->
                new ApplicationException(
                    String.format("User with email '%s' was not found.", email),
                    HttpStatus.NOT_FOUND));
  }

  public UserEntity createUser(String email, String password) {
    if (existsByEmail(email)) {
      throw new ApplicationException(
          String.format("User with email '%s' already exists.", email), HttpStatus.BAD_REQUEST);
    }
    var userEntity = new UserEntity();
    userEntity.setEmail(email);
    userEntity.setPassword(passwordEncoder.encode(password));
    userEntity.setEnabled(true);
    return repository.save(userEntity);
  }

  public UserEntity updateUser(UserEntity user) {
    return repository.save(user);
  }

  public boolean existsByEmail(String email) {
    return repository.existsByEmail(email);
  }

  public UserProfileResponseDto getProfile(Long userId) {
    var user = findUserById(userId);

    var userQuests = findAllByUserId(userId);
    var userQuestDtos = userQuests.stream().map(mapper::toUserProfileQuestResponseDto).toList();
    var createdAverageRate =
        calculateAverageRate(
            userQuestDtos.stream().map(UserProfileQuestResponseDto::getRate).toList());

    var marks = getAverageMarks(userQuestDtos);
    var completedAverageMark = calculateAverageRate(marks);
    var completeQuestsDtos =
        findAllCompletedByUserId(userId).stream()
            .map(mapper::toUserProfileCompletedQuestResponseDto)
            .toList();

    var response = mapper.toUserProfileResponseDto(user, userQuestDtos, completeQuestsDtos);
    response.setCreatedAverageRate(createdAverageRate);
    response.setCompletedAverageMark(completedAverageMark);
    return response;
  }

  private List<BigDecimal> getAverageMarks(List<UserProfileQuestResponseDto> userQuestDtos) {
    return findAverageMarks(userQuestDtos.stream().map(UserProfileQuestResponseDto::getId).toList())
        .stream()
        .map(QuestAverageMarkProjection::getAvgMark)
        .filter(Objects::nonNull)
        .toList();
  }

  private BigDecimal calculateAverageRate(List<BigDecimal> rates) {
    return rates.isEmpty()
        ? null
        : rates.stream()
            .reduce(BigDecimal.ZERO, BigDecimal::add)
            .divide(BigDecimal.valueOf(rates.size()), 2, RoundingMode.HALF_UP);
  }

  private UserEntity findUserById(Long userId) {
    return repository
        .findById(userId)
        .orElseThrow(
            () ->
                new ApplicationException(
                    String.format("User with id '%s' was not found.", userId),
                    HttpStatus.NOT_FOUND));
  }

  public UserProfileResponseDto updateProfile(Long userId, @Valid UpdateUserRequestDto request) {
    var user = findUserById(userId);
    mapper.updateUserFromDto(request, user);
    repository.save(user);
    return mapper.toUserProfileResponseDto(user);
  }

  private List<QuestEntity> findAllByUserId(Long userId) {
    return questRepository.findAllByUserId(userId);
  }

  private List<QuestAverageMarkProjection> findAverageMarks(List<Long> questIds) {
    return completedQuestsRepository.findAverageMarkByQuestIds(questIds);
  }

  private List<CompletedQuestsEntity> findAllCompletedByUserId(Long userId) {
    return completedQuestsRepository.findAllByUserId(userId);
  }
}
