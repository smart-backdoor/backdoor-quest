package ua.questapi.controller.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestResponseDto {
  private Long id;
  private String title;
  private String description;
  private List<Long> taskIds;
}
