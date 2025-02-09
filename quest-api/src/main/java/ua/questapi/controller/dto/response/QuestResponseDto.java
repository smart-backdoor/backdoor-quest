package ua.questapi.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestResponseDto {
  private Long id;
  private String title;
  private String description;
}
