package ua.questapi.service;

import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.questapi.controller.dto.response.UserProfileQuestResponseDto;
import ua.questapi.controller.dto.response.UserProfileResponseDto;
import ua.questapi.database.UserRepository;
import ua.questapi.database.entity.UserEntity;
import ua.questapi.database.projection.QuestAverageMarkProjection;
import ua.questapi.exception.ApplicationException;
import ua.questapi.mapper.repository.database.UserMapper;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final UserMapper mapper;
  private final QuestService questService;

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

    var userQuests = questService.findAllByUserId(userId);
    var userQuestDtos = userQuests.stream().map(mapper::toUserProfileQuestResponseDto).toList();
    var createdAverageRate =
        calculateAverageRate(
            userQuestDtos.stream().map(UserProfileQuestResponseDto::getRate).toList());

    var marks = findAverageMarks(userQuestDtos);
    var completedAverageMark = calculateAverageRate(marks);
    var completeQuestsDtos =
        questService.findAllCompletedByUserId(userId).stream()
            .map(mapper::toUserProfileCompletedQuestResponseDto)
            .toList();

    var response = mapper.toUserProfileResponseDto(user, userQuestDtos, completeQuestsDtos);
    response.setCreatedAverageRate(createdAverageRate);
    response.setCompletedAverageMark(completedAverageMark);
    return response;
  }

  private List<BigDecimal> findAverageMarks(List<UserProfileQuestResponseDto> userQuestDtos) {
    return questService
        .findAverageMarks(userQuestDtos.stream().map(UserProfileQuestResponseDto::getId).toList())
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

  public UserProfileResponseDto updateProfile(Long userId, @Valid UserProfileResponseDto request) {
    var user = findUserById(userId);
    mapper.updateUserFromDto(request, user);
    repository.save(user);
    return mapper.toUserProfileResponseDto(user);
  }
}
