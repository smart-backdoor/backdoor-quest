package ua.questapi.controller.dto.response;

import java.math.BigDecimal;
import java.util.List;
import lombok.Data;

@Data
public class UserProfileResponseDto {
  private Long id;
  private String email;
  private String firstName;
  private String lastName;
  private String avatar;
  private boolean enabled;
  private List<UserProfileCompletedQuestResponseDto> completed;
  private BigDecimal completedAverageMark;
  private List<UserProfileQuestResponseDto> created;
  private BigDecimal createdAverageRate;
}
