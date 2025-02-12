package ua.questapi.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.questapi.controller.dto.request.CompleteQuestRequestDto;
import ua.questapi.database.CompletedQuestsRepository;
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

    var entity = completedQuestMapper.toEntity(user, quest, userMark, userRate);

    var allQuestRates = completedQuestsRepository.findAllRatesByQuest(quest);
    allQuestRates.add(userRate);

    var sumOfRates = allQuestRates.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
    var numberOfUsers = BigDecimal.valueOf(allQuestRates.size());

    var averageRate =
        numberOfUsers.compareTo(BigDecimal.ZERO) > 0
            ? sumOfRates.divide(numberOfUsers, 2, RoundingMode.HALF_UP)
            : userRate;

    quest.setRate(averageRate);
    entity.setQuestEntity(quest);

    completedQuestsRepository.save(entity);
  }
}
