package ua.questapi.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.questapi.controller.dto.request.CompleteQuestRequestDto;
import ua.questapi.database.CompletedQuestsRepository;
import ua.questapi.database.entity.CompletedQuestsEntity;
import ua.questapi.mapper.repository.database.CompletedQuestMapper;
import ua.questapi.utils.SecurityUtils;

@Service
@RequiredArgsConstructor
public class CompletedQuestService {

  private final QuestService questService;
  private final UserService userService;
  private final CompletedQuestsRepository completedQuestsRepository;
  private final CompletedQuestMapper completedQuestMapper;

  @Transactional
  public void completeQuest(Long questId, CompleteQuestRequestDto completeQuestRequestDto) {
    var email = SecurityUtils.getCurrentUser().getUsername();
    var user = userService.findByEmail(email);
    var quest = questService.getById(questId);

    var countOfCorrectAnswers =
        BigDecimal.valueOf(
            completeQuestRequestDto.getCorrectAnswers().stream()
                .filter(Boolean::booleanValue)
                .count());
    var totalTasksOfQuest = BigDecimal.valueOf(quest.getQuantityOfTasks());
    var userMark =
        countOfCorrectAnswers
            .divide(totalTasksOfQuest, 2, RoundingMode.HALF_UP)
            .multiply(BigDecimal.valueOf(100));

    var userRate = BigDecimal.valueOf(completeQuestRequestDto.getRate());

    var existingRecordOptional =
        completedQuestsRepository.findByUserIdAndQuestId(user.getId(), quest.getId());

    var allQuestRates = completedQuestsRepository.findAllRatesByQuest(quest);

    existingRecordOptional.map(CompletedQuestsEntity::getRate).ifPresent(allQuestRates::remove);

    var completedQuest =
        existingRecordOptional
            .map(
                existingRecord -> {
                  existingRecord.setMark(userMark);
                  existingRecord.setRate(userRate);
                  return existingRecord;
                })
            .orElseGet(() -> completedQuestMapper.toEntity(user, quest, userMark, userRate));

    allQuestRates.add(userRate);

    var sumOfRates = allQuestRates.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
    var numberOfUsers = BigDecimal.valueOf(allQuestRates.size());

    var averageRate =
        numberOfUsers.compareTo(BigDecimal.ZERO) > 0
            ? sumOfRates.divide(numberOfUsers, 2, RoundingMode.HALF_UP)
            : userRate;

    quest.setRate(averageRate);
    completedQuest.setQuestEntity(quest);
    completedQuest.setUser(user);

    completedQuestsRepository.save(completedQuest);
  }
}
