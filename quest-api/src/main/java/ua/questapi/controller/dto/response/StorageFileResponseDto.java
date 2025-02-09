package ua.questapi.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StorageFileResponseDto {
  private String name;
  private String url;
}
