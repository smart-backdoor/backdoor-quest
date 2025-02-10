package ua.questapi.controller.dto.response;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class UserProfileCompletedQuestResponseDto {
  private Long id;
  private String title;
  private BigDecimal mark;
  private Long quantityOfTasks;
  private String file;
  private String authorName;
  private String authorAvatar;
}
