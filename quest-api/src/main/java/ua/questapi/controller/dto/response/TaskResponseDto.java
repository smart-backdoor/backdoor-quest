package ua.questapi.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskResponseDto {
  private Long questId;
  private Long taskId;
  private String title;
  private String file;
  private List<AnswerResponseDto> answers;
}
