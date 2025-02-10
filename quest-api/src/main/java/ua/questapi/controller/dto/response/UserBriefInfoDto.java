package ua.questapi.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserBriefInfoDto {
  private String firstName;
  private String lastName;
  private String avatar;
}
