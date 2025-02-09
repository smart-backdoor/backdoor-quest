package ua.questapi.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;
import ua.questapi.controller.dto.response.TaskResponseDto;
import ua.questapi.exception.ApplicationException;

@UtilityClass
public class JsonUtils {

  private static final ObjectMapper objectMapper = new ObjectMapper();

  public TaskResponseDto fromJson(String jsonString) {
    try {
      return objectMapper.readValue(jsonString, TaskResponseDto.class);
    } catch (Exception e) {
      throw new ApplicationException("Error parsing JSON to Task");
    }
  }

  public String toJson(TaskResponseDto task) {
    try {
      return objectMapper.writeValueAsString(task);
    } catch (Exception e) {
      throw new ApplicationException("Error converting Task to JSON");
    }
  }
}
