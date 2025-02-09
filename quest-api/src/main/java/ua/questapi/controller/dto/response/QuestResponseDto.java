package ua.questapi.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuestResponseDto {
  private Long id;
  private String title;
  private String file;
  private String description;
  private List<TaskResponseDto> tasks;
}
