package ua.questapi.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestGridResponseDto {
  private Long id;
  private String title;
  private String file;
  private String description;
  private Long quantityOfTasks;
  private Long timeLimit;
  private UserBriefInfoDto user;
}
