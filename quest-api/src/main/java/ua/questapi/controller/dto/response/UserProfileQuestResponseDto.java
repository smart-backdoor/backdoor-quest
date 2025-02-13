package ua.questapi.controller.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UserProfileQuestResponseDto {
  private Long id;
  private String title;
  private String description;
  private BigDecimal rate;
  private String file;
  private Long quantityOfTasks;
}
